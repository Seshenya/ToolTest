import useAxiosPrivate from 'hooks/useAxiosPrivate'
import { useCallback, useEffect, useState } from 'react'

const initSb = {
    open: false,
    color: '',
    icon: '',
    title: '',
    message: '',
}

const useUserDetails = (userId) => {
    const [userDetails, setUserDetails] = useState(null)
    const [sb, setSb] = useState({ ...initSb })
    const axiosPrivate = useAxiosPrivate()

    const fetchUserDetails = useCallback(async () => {
        axiosPrivate
            .get(`/users/${userId}`)
            .then((resp) => {
              setUserDetails(resp.data)
            })
            .catch((error) => {
                setSb({
                    open: true,
                    color: 'error',
                    icon: 'error',
                    title: error.message,
                    message: '',
                })
            })
    }, [axiosPrivate, userId])

    useEffect(() => {
      fetchUserDetails()
    }, [fetchUserDetails])

    const closeSb = () => {
        setSb({ ...initSb })
    }

    return { userDetails, sb, closeSb }
}

export default useUserDetails
