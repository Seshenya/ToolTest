import React from 'react';
import AppContentView from '../AppContentView';
import { Layout } from 'antd';

const { Footer } = Layout;

type Props = {
    routes: React.ReactElement | null;
};
const AppLayout: React.FC<Props> = ({ routes }) => {

    return (
        <Layout>
            {/* <AppSidebar  /> */}
            <div>
                <AppContentView routes={routes} />
            </div>
            <Footer>Fulda University of Applied Sciences Software Engineering Project, Fall 2023 For
                Demonstration Only</Footer>
        </Layout>
    );
};

export default React.memo(AppLayout);