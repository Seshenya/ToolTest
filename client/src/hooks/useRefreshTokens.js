import axios from '../api/axios';
import useAuth from './useAuth';

const useRefreshToken = () => {
    const { updateAuth, auth } = useAuth();

    const refresh = async () => {
        const response = await axios.post('/token', {
            token: auth?.refreshToken
        });
        updateAuth({ ...auth, accessToken: response?.data?.accessToken });
        return response?.data?.accessToken;
    }
    return refresh;
};

export default useRefreshToken;