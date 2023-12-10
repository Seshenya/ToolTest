import axios from 'axios';
import { baseUrl } from 'baseUrl';

const getProductDetails = productId => {
  return new Promise(async (resolve, reject) => {
    try {
      const resp = await axios.get(`${baseUrl}/media/${productId}`);
      console.log('service');
      resolve(resp.data);
    } catch (error) {
      reject(error);
    }
  });
};

export { getProductDetails };
