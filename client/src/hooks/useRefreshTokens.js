import axios from '../api/axios';
import useAuth from './useAuth';

const useRefreshToken = () => {
    const { updateAuth } = useAuth();

    const refresh = async () => {
        const response = await axios.get('/refresh', {
            withCredentials: true
        });
        updateAuth(prev => {
            return { ...prev, token: response.data.token }
        });
        return response.data.token;
    }
    return refresh;
};

export default useRefreshToken;