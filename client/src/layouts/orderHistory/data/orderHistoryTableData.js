/* eslint-disable react/prop-types */
/* eslint-disable react/function-component-definition */

// Material Dashboard 2 React components
import MDBox from 'components/MDBox';
import MDTypography from 'components/MDTypography';
import { useForm } from 'react-hook-form';
import useAuth from "hooks/useAuth";

import Icon from '@mui/material/Icon';
import { IconButton } from '@mui/material';
import MDSnackbar from 'components/MDSnackbar';
import React, { useState } from 'react';

import ReviewModal from 'layouts/orderHistory/data/addReviewModal';
import { addProductReviews } from 'layouts/ProductDetails/services/productReviewsServices.service';
import { downloadMedia } from 'helpers';

// Images

const initSb = {
    open: false,
    color: '',
    icon: '',
    title: '',
    message: '',
};

const DownloadBtn = ({ productId, media }) => {
    const [sb, setSb] = useState({ ...initSb });
    const closeSb = () => {
        setSb({ ...initSb });
    };

    const handleDownloadMedia = () => {
        try {
            downloadMedia(productId, media)
        } catch (error) {
            setSb({
                open: true,
                color: 'error',
                icon: 'error',
                title: error.message,
                message: '',
            });
        }
    };

    return (
        <MDBox display="flex">
            <IconButton color="info" onClick={handleDownloadMedia}>
                <Icon fontSize="small">download</Icon>
            </IconButton>
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
        </MDBox>
    );
};

const ReviewBtn = ({ productId, productTitle }) => {
    const { auth } = useAuth();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const { register, handleSubmit, reset } = useForm();

    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    const onSubmit = async (data) => {

        const formData = new FormData();
        formData.append('description', data.review);
        formData.append('rating', data.rating);
        formData.append('product_id', productId);
        formData.append('reviewed_by', auth.user_id);

        try {
            await addProductReviews(formData);

            reset();
            setIsModalOpen(false);
        } catch (error) {
            console.error('Error adding product reviews:', error);
        }
    };

    return (
        <MDBox display="flex">
            <IconButton color="info" onClick={openModal}>
                <Icon fontSize="small">rate_review</Icon>
            </IconButton>
            <ReviewModal isOpen={isModalOpen} handleClose={closeModal} productId={productId} productTitle={productTitle} handleSubmit={handleSubmit} onSubmit={onSubmit} register={register} reset={reset} />
        </MDBox>
    );
};


export default function orderHistoryTableData(orders) {
    return {
        columns: [
            { Header: 'Sr. no', accessor: 'srNo', align: 'left' },
            { Header: 'Name', accessor: 'name', align: 'left' },
            { Header: 'File type', accessor: 'fileType', align: 'left' },
            { Header: 'Date', accessor: 'date', align: 'left' },
            { Header: 'Actions', accessor: 'action', align: 'center' },
        ],

        rows: orders.map((order, i) => {
            // console.log(order);
            return {
                srNo: i + 1,
                fileType: order.product.file_format,
                name: order.product.title,
                date: (
                    <MDTypography
                        component="a"
                        href="#"
                        variant="caption"
                        color="text"
                        fontWeight="medium"
                    >
                        {order.order_date}
                    </MDTypography>
                ),
                action: (
                    <MDBox display="flex" justifyContent="space-evenly" gap={2}>
                        <DownloadBtn
                            productId={order.product_id}
                            media={order.product.media}
                        />
                        <ReviewBtn
                            productId={order.product_id}
                            productTitle={order.product.title}
                        />
                    </MDBox>
                ),
            };
        }),
    };
}
