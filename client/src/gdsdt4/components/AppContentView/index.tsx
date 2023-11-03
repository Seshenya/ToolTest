import React from 'react';
import AppSuspense from '../AppSuspense';
import AppErrorBoundary from '../AppErrorBoundary';

type AppContentViewProps = {
    routes: React.ReactElement | null;
};

const AppContentView: React.FC<AppContentViewProps> = ({ routes }) => {
    return (
        <>
            <AppSuspense>
                <AppErrorBoundary>{routes}</AppErrorBoundary>
            </AppSuspense>
        </>
    );
};

export default AppContentView;