import { axiosPrivate } from 'api/axios';

const getProductDetails = (productId) => {
    return new Promise(async (resolve, reject) => {
        try {
            const resp = await axiosPrivate.get(`/media/${productId}`);
            console.log('service');
            resolve(resp.data);
        } catch (error) {
            reject(error);
        }
    });
};

export { getProductDetails };
