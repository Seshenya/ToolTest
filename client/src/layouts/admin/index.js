
// @mui material components
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDInput from "components/MDInput";
import MDButton from "components/MDButton";


// Material Dashboard 2 React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import DataTable from "examples/Tables/DataTable";
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

// Data
import productsTableData from "./data/productsData";
import { useState } from "react";
import competitionsTableData from "./data/cometitionsData";
import userReportsData from "./data/userReports";

function AdminDashboard() {

  const [updateStatusOpen, setUpdateStatusOpen] = useState(false);
  const { columns, rows } = productsTableData(setUpdateStatusOpen);
  const { columns: competitionCols, rows: competitionRows } = competitionsTableData(setUpdateStatusOpen);
  const { columns: userCols, rows: userRows } = userReportsData();
  console.log(competitionCols)

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox pt={6} pb={3}>
        <Grid container spacing={6}>
          <Grid item xs={12}>
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
                  Products
                </MDTypography>
              </MDBox>
              <MDBox pt={3}>
                <DataTable
                  table={{ columns, rows }}
                  isSorted={false}
                  entriesPerPage={false}
                  showTotalEntries={false}
                  noEndBorder
                />
              </MDBox>
            </Card>
          </Grid>
          <Grid item xs={12}>
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
                  Competitions
                </MDTypography>
              </MDBox>
              <MDBox pt={3}>
                <DataTable
                  table={{ columns: competitionCols, rows: competitionRows }}
                  isSorted={false}
                  entriesPerPage={false}
                  showTotalEntries={false}
                  noEndBorder
                />
              </MDBox>
            </Card>
          </Grid>
          <Grid item xs={12}>
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
                  table={{ columns: userCols, rows: userRows }}
                  isSorted={false}
                  entriesPerPage={false}
                  showTotalEntries={false}
                  noEndBorder
                />
              </MDBox>
            </Card>
          </Grid>
        </Grid>
      </MDBox>
      <Footer />

      <Dialog
        open={updateStatusOpen}
        onClose={() => setUpdateStatusOpen(false)}
        aria-labelledby="update-status-title"
        aria-describedby="update-status-description"
      >
        <DialogTitle id="update-status-title">
          Update Status
        </DialogTitle>
        <DialogContent>
          <MDInput multiline rows={3} sx={{ width: '100%', marginTop: 2 }} label={'Comments'} />
          <FormControl sx={{ width: '100%', marginTop: 2 }}>
            <InputLabel id="status">Status</InputLabel>
            <Select
              sx={{ padding: 1.5 }}
              fullWidth
              labelId="status"
              id="status"
              defaultValue={'Approved'}
              label="Status"
            >
              <MenuItem value={'Approved'}>Approved</MenuItem>
              <MenuItem value={'Pending'}>Pending</MenuItem>
              <MenuItem value={'Modifications Required'}>Modifications Required</MenuItem>
              <MenuItem value={'Rejected'}>Rejected</MenuItem>
            </Select>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <MDButton sx={{ width: '100%' }} color='primary' variant='gradient' onClick={() => setUpdateStatusOpen(false)}>Update</MDButton>
        </DialogActions>
      </Dialog>
    </DashboardLayout>
  );
}

export default AdminDashboard;
