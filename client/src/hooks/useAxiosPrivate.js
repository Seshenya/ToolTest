import { axiosPrivate } from "api/axios";
import { useEffect } from "react";
import useRefreshToken from "./useRefreshTokens";
import useAuth from "./useAuth";

const useAxiosPrivate = () => {
    const refresh = useRefreshToken();
    const { auth } = useAuth();
    console.log(auth.token)

    useEffect(() => {

        const requestIntercept = axiosPrivate.interceptors.request.use(
            config => {
                if (!config.headers['Authorization']) {
                    config.headers['Authorization'] = `Bearer ${auth?.token}`
                }
                return config
            }, (error) => Promise.reject(error)
        )

        const responseIntercept = axiosPrivate.interceptors.response.use(
            response => response,
            async (error) => {
                const prevRequest = error?.config;
                if (error?.response?.status === 401 && !prevRequest?.sent) {
                    prevRequest.sent = true;
                    // TODO: replace with refresh() after the api is implemented
                    const newtoken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjI3LCJlbWFpbCI6ImRpcGVzaC5rZXdhbHJhbWFuaUBpbmZvcm1hdGlrLmhzLWZ1bGRhLmRlIiwiaWF0IjoxNzAyMDc0MzM0LCJleHAiOjE3MDIwNzc5MzR9.zGx5rCV5xWKKKSuOUM7LqyT2VZXqPxUeX2-eErnWUaE';
                    prevRequest.headers['Authorization'] = `Bearer ${newtoken}`
                    return axiosPrivate(prevRequest);
                }
                return Promise.reject(error)
            }
        )

        return () => {
            axiosPrivate.interceptors.response.eject(responseIntercept);
            axiosPrivate.interceptors.request.eject(requestIntercept);
        }
    }, [auth, refresh])

    return axiosPrivate;
}

export default useAxiosPrivate;