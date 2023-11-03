import {
    unAuthorizedStructure,
} from '../AppRoutes';
import { useRoutes } from 'react-router-dom';
import Layout from '@gdsdt4/components/AppLayout';
import generateRoutes from '@gdsdt4/helpers/RouteGenerators';
import { useAuthUser } from '@gdsdt4/hooks/AuthHooks';

const AppLayout = () => {
    const { user, isAuthenticated } = useAuthUser();
    const generatedRoutes = generateRoutes({
        isAuthenticated: isAuthenticated,
        userRole: user?.role,
        unAuthorizedStructure,
        // authorizedStructure,
        // anonymousStructure,
    });
    const routes = useRoutes(generatedRoutes);

    return (
        <>
            <Layout routes={routes} />
        </>
    );
};

export default AppLayout;