import { initialUrl } from '@gdsdt4/constants/AppConst';
import { aboutRouteConfig } from './AboutPageRoutes'

//TODO: Create a Authorized Structure and a Fallback Structure

const unAuthorizedStructure = {
    fallbackPath: initialUrl,
    routes: aboutRouteConfig,
};

export { unAuthorizedStructure };