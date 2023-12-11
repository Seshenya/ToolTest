import { axiosPrivate } from 'api/axios'
import { baseUrl } from 'baseUrl'

const getProductDetails = (productId) => {
    return new Promise(async (resolve, reject) => {
        try {
            const resp = await axiosPrivate.get(`${baseUrl}/media/${productId}`)
            console.log('service')
            resolve(resp.data)
        } catch (error) {
            reject(error)
        }
    })
}

export { getProductDetails }
