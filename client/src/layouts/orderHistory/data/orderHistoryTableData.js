/* eslint-disable react/prop-types */
/* eslint-disable react/function-component-definition */

// Material Dashboard 2 React components
import MDBox from 'components/MDBox';
import MDTypography from 'components/MDTypography';
import MDBadge from 'components/MDBadge';

import Icon from '@mui/material/Icon';

// Images

import { statusColors } from 'constants/DummyCompetitions';
import { orderHistory } from 'constants/DummyOrderHistory';

export default function orderHistoryTableData() {
    return {
        columns: [
            { Header: 'Sr. no', accessor: 'srno', align: 'left' },
            { Header: 'Name', accessor: 'name', align: 'left' },
            { Header: 'Creator', accessor: 'creator', align: 'left' },
            { Header: 'Date', accessor: 'date', align: 'left' },
            { Header: 'Actions', accessor: 'action', align: 'center' },
        ],

        rows: orderHistory.map((competition) => {
            return {
                srno: competition.srNo,
                creator: competition.creator,
                name: competition.name,
                status: (
                    <MDBox ml={-1}>
                        <MDBadge
                            badgeContent={competition.status}
                            color={statusColors[competition.status]}
                            variant="gradient"
                            size="sm"
                        />
                    </MDBox>
                ),
                date: (
                    <MDTypography
                        component="a"
                        href="#"
                        variant="caption"
                        color="text"
                        fontWeight="medium"
                    >
                        {competition.date}
                    </MDTypography>
                ),
                action: (
                    <MDBox display="flex">
                        <MDBox ml={1}>
                            <Icon fontSize="small">download</Icon>
                        </MDBox>
                    </MDBox>
                ),
            };
        }),
    };
}
