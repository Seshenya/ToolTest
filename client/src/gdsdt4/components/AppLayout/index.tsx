import React from 'react';
import AppContentView from '../AppContentView';


type Props = {
    routes: React.ReactElement | null;
};
const Layout: React.FC<Props> = ({ routes }) => {

    return (
        <>
            {/* <AppSidebar  /> */}
            <div>
                {/* <AppHeader /> */}
                <div>
                    <AppContentView routes={routes} />
                    {/* <AppFooter /> */}
                </div>
            </div>
        </>
    );
};

export default React.memo(Layout);