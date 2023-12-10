import useAxiosPrivate from 'hooks/useAxiosPrivate'
import { useCallback, useEffect, useState } from 'react'

const initSb = {
    open: false,
    color: '',
    icon: '',
    title: '',
    message: '',
}

const useProductDetails = (productId) => {
    const [productDetails, setProductDetails] = useState(null)
    const [sb, setSb] = useState({ ...initSb })
    const axiosPrivate = useAxiosPrivate()

    const fetchProductDetails = useCallback(async () => {
        axiosPrivate
            .get(`/media/${productId}`)
            .then((resp) => {
                setProductDetails(resp.data)
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
    }, [axiosPrivate, productId])

    useEffect(() => {
        fetchProductDetails()
    }, [fetchProductDetails])

    const closeSb = () => {
        setSb({ ...initSb })
    }

    return { productDetails, sb, closeSb }
}

export default useProductDetails
