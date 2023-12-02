/* eslint-disable react/prop-types */
/* eslint-disable react/function-component-definition */

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDBadge from "components/MDBadge";

import Icon from '@mui/material/Icon';

// Images

import { statusColors } from "constants/DummyCompetitions";
import { competitions } from "constants/DummyCompetitions";

export default function userReportsData() {
    return {
        columns: [
            { Header: "Message", accessor: "message", width: "30%", align: "left" },
            { Header: "User", accessor: "user", align: "left" },
            { Header: "date", accessor: "date", align: "left" },
            // { Header: "action", accessor: "action", align: "center" },
        ],

        rows: [
            {
                message: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed risus dolor, vehicula placerat tincidunt vitae, porttitor eget lectus. ",
                user: "User 1",
                date: (
                    <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
                        12.02.2022
                    </MDTypography>
                ),
            },
            {
                message: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed risus dolor, vehicula placerat tincidunt vitae, porttitor eget lectus. ",
                user: "User 2",
                date: (
                    <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
                        01.01.2022
                    </MDTypography>
                ),
            }
        ]
    };
}
