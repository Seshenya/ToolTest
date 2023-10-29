import React from 'react';

const About = React.lazy(
    () => import('../../../modules/about'),
);

const Developer = React.lazy(
    () => import('../../../modules/about/developer'),
);

export const aboutRouteConfig = [
    {
        path: '/about/',
        element: <About />,
        exact: true
    },
    {
        path: '/about/:developer',
        element: <Developer />,
        exact: true
    }
];