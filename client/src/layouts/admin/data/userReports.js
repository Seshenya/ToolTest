/* eslint-disable react/prop-types */
/* eslint-disable react/function-component-definition */

import MDTypography from "components/MDTypography";




export default function userReportsData(reports) {
    return {
        columns: [
            { Header: "Message", accessor: "message", width: "30%", align: "left" },
            { Header: "User", accessor: "user", align: "left" },
            { Header: "date", accessor: "date", align: "left" },
            // { Header: "action", accessor: "action", align: "center" },
        ],

        rows: reports.map((report) => {
            return {
                message: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed risus dolor, vehicula placerat tincidunt vitae, porttitor eget lectus. ",
                user: "User 1",
                date: (
                    <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
                        12.02.2022
                    </MDTypography>
                ),
            }
        })
    };
}
