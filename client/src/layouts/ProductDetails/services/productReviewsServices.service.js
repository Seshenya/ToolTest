import { axiosPrivate } from 'api/axios';

const addProductReviews = (formData) => {
    return new Promise(async (resolve, reject) => {
        try {
            const formDataObject = {};
            formData.forEach((value, key) => {
              formDataObject[key] = value;
            });
            
            const response = await axiosPrivate.post('/reviews/', JSON.stringify(formDataObject), {
                headers: {
                  'Content-Type': 'application/json',
                },
              });
            resolve(response.data);
        } catch (error) {
            reject(error);
        }
    });
};

export { addProductReviews };
