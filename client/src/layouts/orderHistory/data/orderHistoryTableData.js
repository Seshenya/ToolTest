/* eslint-disable react/prop-types */
/* eslint-disable react/function-component-definition */

// Material Dashboard 2 React components
import MDBox from 'components/MDBox';
import MDTypography from 'components/MDTypography';

import Icon from '@mui/material/Icon';
import { IconButton } from '@mui/material';
import { getProductDetails } from 'layouts/ProductDetails/services/productDetailsServices.service';
import MDSnackbar from 'components/MDSnackbar';
import { useState } from 'react';

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

    const downloadMedia = async () => {
        try {
            const resp = await getProductDetails(productId);
            console.log(resp);

            // const link = document.createElement('a');
            // link.href = resp.media;
            // link.download = media || 'downloaded-media';
            // link.target = '_blank';
            // document.body.appendChild(link);
            // link.click();
            // document.body.removeChild(link);
            resp.media.forEach((url, index) => {
                // Use fetch to download the file
                fetch(url)
                    .then((response) => response.blob())
                    .then((blob) => {
                        // Create a link element
                        const link = document.createElement('a');

                        // Create a unique filename for each file (you can customize this logic)
                        const fileName = `file_${index + 1}.${url
                            .split('.')
                            .pop()}`;

                        // Create a Blob URL for the file
                        const blobUrl = URL.createObjectURL(blob);

                        // Set the link attributes
                        link.href = blobUrl;
                        link.download = fileName;

                        // Append the link to the document
                        document.body.appendChild(link);

                        // Trigger a click on the link to start the download
                        link.click();

                        // Remove the link from the document
                        document.body.removeChild(link);
                    })
                    .catch((error) => {
                        console.error(`Error downloading file ${url}:`, error);
                    });
            });
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
            <IconButton color="info" onClick={downloadMedia}>
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
                    <DownloadBtn
                        productId={order.product_id}
                        media={order.product.media}
                    />
                ),
            };
        }),
    };
}
