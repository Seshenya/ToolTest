/* eslint-disable react/prop-types */
/* eslint-disable react/function-component-definition */

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDBadge from "components/MDBadge";

import Icon from '@mui/material/Icon';

import { statusColors } from "constants/DummyProducts";
import { getFormattedDate } from "helpers";
import { getStatus } from "helpers";

export default function productsTableData(products, openUpdateStatus) {

    return {
        columns: [
            { Header: "Product", accessor: "product", align: "left" },
            { Header: "Creator", accessor: "creator", align: "left" },
            { Header: "date", accessor: "date", align: "left" },
            { Header: "status", accessor: "status", align: "center" },
            { Header: "action", accessor: "action", align: "center" },
        ],

        rows: products.map((product) => {

            const formattedDate = getFormattedDate(product?.date)
            const status = getStatus(product?.status)

            return (
                {
                    product: product?.title,
                    creator: `${product?.owner?.firstname} ${product?.owner?.lastname}`,
                    status: (
                        <MDBox ml={-1}>
                            <MDBadge badgeContent={status.label} color={status.color} variant="gradient" size="sm" />
                        </MDBox>
                    ),
                    date: (
                        <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
                            {formattedDate}
                        </MDTypography>
                    ),
                    action: (
                        <MDBox display='flex'>
                            <MDBox>
                                <Icon fontSize='small' onClick={() => openUpdateStatus(product)}>edit</Icon>
                            </MDBox>
                            <MDBox ml={1}>
                                <Icon fontSize='small'>download</Icon>
                            </MDBox>
                        </MDBox>

                    ),
                }
            )
        })
    };
}
