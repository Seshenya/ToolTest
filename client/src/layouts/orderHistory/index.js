import { Card, CircularProgress } from '@mui/material';
import MDBox from 'components/MDBox';
import MDTypography from 'components/MDTypography';
import DashboardLayout from 'examples/LayoutContainers/DashboardLayout';
import DashboardNavbar from 'examples/Navbars/DashboardNavbar';
import DataTable from 'examples/Tables/DataTable';
import React, { useContext, useEffect, useState } from 'react';
import orderHistoryTableData from './data/orderHistoryTableData';
import AuthContext from 'context/AuthProvider';
import useAxiosPrivate from 'hooks/useAxiosPrivate';
import MDSnackbar from 'components/MDSnackbar';

const OrderHistory = () => {
    const [loading, setLoading] = useState(false);
    const [orders, setOrders] = useState([]);
    const { columns: orderHistoryCols, rows: orderHistoryRows } =
        orderHistoryTableData(orders);
    const [sb, setSb] = useState({
        open: false,
        color: '',
        icon: '',
        title: '',
        message: '',
    });

    const axiosPrivate = useAxiosPrivate();

    const { auth } = useContext(AuthContext);

    const getOrders = () => {
        setLoading(true);
        axiosPrivate
            .get(`/order-history/${auth.user_id}`, {
                // params: {
                //     page: pageNo,
                //     size: 10,
                //     ...filters,
                // },
            })
            .then((res) => {
                setLoading(false);
                setOrders(res.data);
                console.log(res.data);

                // if (res.data.totalCount !== totalCount) {
                //     setTotalCount(res.data.totalCount);
                // }
            })
            .catch((error) => {
                setLoading(false);
                setSb({
                    open: true,
                    color: 'error',
                    icon: 'error',
                    title: error.message,
                    message: '',
                });
            });
    };

    useEffect(() => {
        getOrders();
    }, []);

    const closeSb = () => {
        setSb({
            open: false,
            color: '',
            icon: '',
            title: '',
            message: '',
        });
    };

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
                    {loading ? (
                        <MDBox style={{ textAlign: 'center' }}>
                            <CircularProgress />
                        </MDBox>
                    ) : orders.length ? (
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
                    ) : (
                        <MDTypography
                            textAlign={'center'}
                            fontSize={'1rem'}
                            sx={{ opacity: 0.5 }}
                            paddingY={4}
                        >
                            Nothing to show here!
                        </MDTypography>
                    )}
                </MDBox>
            </Card>
            <MDSnackbar
                color={sb.color}
                icon={sb.icon}
                title={sb.title}
                content={sb.message}
                open={sb.open}
                onClose={closeSb}
                close={closeSb}
                bgWhite
            />
        </DashboardLayout>
    );
};

export default OrderHistory;
