
// @mui material components
import Card from "@mui/material/Card";
import Icon from "@mui/material/Icon";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";

// Material Dashboard 2 React example components
import TimelineItem from "examples/Timeline/TimelineItem";

function Annoucements() {
  return (
    <Card >
      <MDBox pt={3} px={3}>
        <MDTypography variant="h6" fontWeight="medium">
          Annoucements
        </MDTypography>
      </MDBox>
      <MDBox p={2}>
        <TimelineItem
          color="success"
          icon="mood"
          title="Challenge #1 Winners Annoucend"
          dateTime="22 DEC 7:20 PM"
        />
        <TimelineItem
          color="info"
          icon="person"
          title="New Art Challenge, Exciting Prizes!!"
          dateTime="21 DEC 9:34 PM"
        />
        <TimelineItem
          color="warning"
          icon="payment"
          title="Lorem Ipsum"
          dateTime="20 DEC 2:20 AM"
        />
        <TimelineItem
          color="primary"
          icon="vpn_key"
          title="Lorem Ipsum"
          dateTime="18 DEC 4:54 AM"
          lastItem
        />
      </MDBox>
    </Card>
  );
}

export default Annoucements;
