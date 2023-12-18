import { Card } from '@mui/material';
import MDBox from 'components/MDBox';
import MDTypography from 'components/MDTypography';
import DashboardLayout from 'examples/LayoutContainers/DashboardLayout';
import DashboardNavbar from 'examples/Navbars/DashboardNavbar';
import DataTable from 'examples/Tables/DataTable';
import React from 'react';
import orderHistoryTableData from './data/orderHistoryTableData';

const OrderHistory = () => {
    const { columns: orderHistoryCols, rows: orderHistoryRows } =
        orderHistoryTableData();
    return (
        <DashboardLayout>
            <DashboardNavbar />
            <Card>
                <MDBox
                    mx={2}
                    mt={-3}
                    py={3}
                    px={2}
                    variant="gradient"
                    bgColor="info"
                    borderRadius="lg"
                    coloredShadow="info"
                >
                    <MDTypography variant="h6" color="white">
                        User Reports
                    </MDTypography>
                </MDBox>
                <MDBox pt={3}>
                    <DataTable
                        table={{
                            columns: orderHistoryCols,
                            rows: orderHistoryRows,
                        }}
                        isSorted={false}
                        entriesPerPage={false}
                        showTotalEntries={false}
                        noEndBorder
                    />
                </MDBox>
            </Card>
        </DashboardLayout>
    );
};

export default OrderHistory;
