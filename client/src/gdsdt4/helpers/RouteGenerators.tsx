import { Navigate } from 'react-router-dom';
import { RouteObject } from 'react-router';
import { authRole } from '@gdsdt4/constants/AppConst';
import { checkPermission } from './RouterHelper';

const generateRoutes = (structure: any) => {
    const {
        isAuthenticated = false,
        anonymousStructure = {},
        authorizedStructure = {},
        unAuthorizedStructure = {},
        userRole = authRole.User,
    } = structure || {};

    const dynamicRoutes: RouteObject[] = [];

    if (anonymousStructure) {
        dynamicRoutes.push(
            ...routesGenerator(isAuthenticated, anonymousStructure, 'anonymous'),
        );
    }

    if (authorizedStructure) {
        dynamicRoutes.push(
            ...routesGenerator(
                isAuthenticated,
                authorizedStructure,
                'authorized',
                isAuthenticated ? userRole : null,
            ),
        );
    }

    if (unAuthorizedStructure) {
        dynamicRoutes.push(
            ...routesGenerator(
                isAuthenticated,
                unAuthorizedStructure,
                'unAuthorized',
            ),
        );
    }
    return dynamicRoutes;
};


const routesGenerator = (
    isAuthenticated = false,
    routeSet: any = {},
    type = 'anonymous',
    userRole?: any,
): any => {
    const generatedRoutes: any[] = [];
    const { fallbackPath = '' } = routeSet || {};

    const isAnonymous = type === 'anonymous';
    const isAuthorized = type === 'authorized';

    if (routeSet?.routes) {
        const routes = routeSet.routes;
        if (Array.isArray(routes) && routes.length) {
            routes.forEach((route) => {
                const {
                    path = '',
                    permittedRole = 'user',
                    redirectPath = '',
                } = route || {};
                if (!path) {
                    console.log(
                        `A [route] is skipped because one of the following, No valid [path] prop provided for the route`,
                        isAuthenticated,
                    );
                } else {
                    if (isAnonymous) {
                        return generatedRoutes.push(route);
                    }
                    if (isAuthorized) {
                        const renderCondition = isAuthorized
                            ? isAuthenticated
                            : !isAuthenticated;

                        if (Array.isArray(route.path)) {
                            route.path.map((path: string) => {
                                generatedRoutes.push(
                                    renderCondition
                                        ? checkPermission(permittedRole, userRole)
                                            ? {
                                                element: route.element,
                                                path: path,
                                                permittedRole: route.permittedRole,
                                            }
                                            : {
                                                path: path,
                                                element: routeSet.unAuthorizedComponent,
                                            }
                                        : {
                                            path: path,
                                            element: (
                                                <Navigate
                                                    to={redirectPath || fallbackPath}
                                                    replace
                                                />
                                            ),
                                        },
                                );
                            });
                        } else {
                            generatedRoutes.push(
                                renderCondition
                                    ? checkPermission(permittedRole, userRole)
                                        ? route
                                        : {
                                            path: route.path,
                                            element: routeSet.unAuthorizedComponent,
                                        }
                                    : {
                                        path: route.path,
                                        element: (
                                            <Navigate to={redirectPath || fallbackPath} replace />
                                        ),
                                    },
                            );
                        }
                        return generatedRoutes;
                    }
                    const renderCondition = isAuthorized
                        ? isAuthenticated
                        : !isAuthenticated;
                    if (Array.isArray(route.path)) {
                        route.path.map((path: string) => {
                            generatedRoutes.push(
                                renderCondition
                                    ? {
                                        element: route.element,
                                        path: path,
                                        permittedRole: route.permittedRole,
                                    }
                                    : {
                                        path: path,
                                        element: (
                                            <Navigate to={redirectPath || fallbackPath} replace />
                                        ),
                                    },
                            );
                        });
                    } else {
                        generatedRoutes.push(
                            renderCondition
                                ? route
                                : {
                                    path: route.path,
                                    element: (
                                        <Navigate to={redirectPath || fallbackPath} replace />
                                    ),
                                },
                        );
                    }
                    return generatedRoutes;
                }
            });
        }
    } else {
        console.log(`[routes] prop can't be found in ${type}Structure Object`);
    }
    return generatedRoutes;
};

export default generateRoutes;