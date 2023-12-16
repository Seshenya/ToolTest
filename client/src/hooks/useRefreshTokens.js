import { useNavigate } from 'react-router-dom';
import axios from '../api/axios';
import useAuth from './useAuth';

const useRefreshToken = () => {
    const { updateAuth, auth } = useAuth();
    const navigate = useNavigate();

    const refresh = async () => {
        try {
            const response = await axios.post('/token', {
                token: auth?.refreshToken
            });
            updateAuth({ ...auth, accessToken: response?.data?.accessToken });
            return response?.data?.accessToken;
        } catch (error) {
            console.log(error)
            updateAuth({})
            localStorage.removeItem("user")
            navigate('/authentication/sign-in')
        }

    }
    return refresh;
};

export default useRefreshToken;