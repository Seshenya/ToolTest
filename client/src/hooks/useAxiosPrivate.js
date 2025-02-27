import { axiosPrivate } from "api/axios";
import { useEffect } from "react";
import useRefreshToken from "./useRefreshTokens";
import useAuth from "./useAuth";

const useAxiosPrivate = () => {
    const refresh = useRefreshToken();
    const { auth } = useAuth();

    useEffect(() => {

        const requestIntercept = axiosPrivate.interceptors.request.use(
            config => {
                if (!config.headers['Authorization']) {
                    config.headers['Authorization'] = `Bearer ${auth?.accessToken}`
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
                    const newtoken = await refresh()
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