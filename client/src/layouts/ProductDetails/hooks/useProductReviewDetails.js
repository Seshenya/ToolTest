import useAxiosPrivate from 'hooks/useAxiosPrivate'
import { useCallback, useEffect, useState } from 'react'

const initSbar = {
    open: false,
    color: '',
    icon: '',
    title: '',
    message: '',
}

const useProductReviewDetails = (productId) => {
    const [productReviewDetails, setProductReviewDetails] = useState(null)
    const [sbar, setSbar] = useState({ ...initSbar })
    const axiosPrivate = useAxiosPrivate()

    const fetchProductReviewDetails = useCallback(async () => {
        axiosPrivate
            .get(`/reviews/${productId}`)
            .then((resp) => {
                setProductReviewDetails(resp.data)
            })
            .catch((error) => {
                setSbar({
                    open: true,
                    color: 'error',
                    icon: 'error',
                    title: error.message,
                    message: '',
                })
            })
    }, [axiosPrivate, productId])

    useEffect(() => {
        fetchProductReviewDetails()
    }, [fetchProductReviewDetails])

    const closeSbar = () => {
        setSbar({ ...initSbar })
    }

    return { productReviewDetails, sbar, closeSbar }
}

export default useProductReviewDetails
