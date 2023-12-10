const { useState, useEffect, useCallback } = require('react');
const { getProductDetails } = require('../services/productDetailsServices.service');

const initSb = {
  open: false,
  color: '',
  icon: '',
  title: '',
  message: '',
};

const useProductDetails = productId => {
  const [productDetails, setProductDetails] = useState(null);
  const [sb, setSb] = useState({ ...initSb });
  const fetchProductDetails = useCallback(async () => {
    try {
      const resp = await getProductDetails(productId);
      setProductDetails(resp);
    } catch (error) {
      setSb({
        open: true,
        color: 'error',
        icon: 'error',
        title: error.message,
        message: '',
      });
    }
  }, [productId]);

  useEffect(() => {
    fetchProductDetails();
  }, [fetchProductDetails]);

  const closeSb = () => {
    setSb({ ...initSb });
  };

  return { productDetails, sb, closeSb };
};

export default useProductDetails;
