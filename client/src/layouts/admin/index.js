
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
import { useEffect, useRef, useState } from "react";
import competitionsTableData from "./data/cometitionsData";
import userReportsData from "./data/userReports";
import { useSnackbar } from "context/SnackbarContext";
import useAxiosPrivate from "hooks/useAxiosPrivate";
import { CircularProgress, Pagination } from "@mui/material";
import { statusTypes } from "helpers";
import { useNavigate } from "react-router-dom";

function AdminDashboard() {

  const [products, setProducts] = useState([])
  const [totalProducts, setTotalProducts] = useState(0)

  const [competitions, setCompetitions] = useState([])
  const [totalCompetitions, setTotalCompetitions] = useState(0)

  const [reports, setReports] = useState([])
  const [totalReports, seTotalReports] = useState(0)

  const [updateStatusOpen, setUpdateStatusOpen] = useState(false);
  const curItem = useRef(null)
  const curStatus = useRef(null)
  const curComment = useRef(null)


  const { showSnackbar } = useSnackbar();
  const [loading, setLoading] = useState(false)
  const axiosPrivate = useAxiosPrivate()
  const [page, setPage] = useState(1)
  const navigate = useNavigate()


  const getMedia = () => {
    setLoading(true)
    axiosPrivate
      .get(`/media`, {
        params: {
          page: page,
          size: 10,
        },
      })
      .then((res) => {
        setLoading(false)
        setProducts(res.data.media)
        setTotalProducts(res.data.totalCount)
      })
      .catch((error) => {
        setLoading(false)
        showSnackbar({
          color: 'error',
          title: error.message,
          message: '',
          icon: 'error',
        });
      })
  }

  const getCompetitions = () => {
    setLoading(true)
    axiosPrivate
      .get(`/competitions`, {
        params: {
          page: page,
          size: 10,
        },
      })
      .then((res) => {
        setLoading(false)
        setProducts(res.data.media)
        setTotalProducts(res.data.totalCount)
      })
      .catch((error) => {
        setLoading(false)
        showSnackbar({
          color: 'error',
          title: error.message,
          message: '',
          icon: 'error',
        });
      })
  }

  const getUserReports = () => {
    setLoading(true)
    axiosPrivate
      .get(`/user-reports`, {
        params: {
          page: page,
          size: 10,
        },
      })
      .then((res) => {
        setLoading(false)
        setProducts(res.data.media)
        setTotalProducts(res.data.totalCount)
      })
      .catch((error) => {
        setLoading(false)
        showSnackbar({
          color: 'error',
          title: error.message,
          message: '',
          icon: 'error',
        });
      })
  }

  const updateMedia = () => {
    if (curItem?.current?.product_id) {
      axiosPrivate.put(`/media/${curItem?.current?.product_id}`, {
        status: curStatus.current,
        comment: curComment.current
      }, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }).then(res => {
        setUpdateStatusOpen(false)
        getMedia()
      }).catch((error) => {
        setLoading(false)
        showSnackbar({
          color: 'error',
          title: error.message,
          message: '',
          icon: 'error',
        });
      })
    }
  }

  const updateStatus = () => {
    switch (curItem.current.type) {
      case "media":
        updateMedia()
        break
      case "competition":
        break
      default:
        console.log("Invalid Type")
        break
    }
  }

  const openUpdateStatus = (item) => {
    setUpdateStatusOpen(true)
    curItem.current = {
      ...item,
      type: 'media'
    }
    curStatus.current = item.status
    curComment.current = item.comment
  }

  useEffect(() => {
    getMedia()
    // getCompetitions()
    // getUserReports()
  }, [page])

  console.log(Object.values(statusTypes))


  return (
    <DashboardLayout>
      <DashboardNavbar />
      {loading ? (
        <MDBox style={{ textAlign: 'center' }}>
          <CircularProgress />
        </MDBox>
      ) : (<MDBox pt={6} pb={3}>
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
                  table={productsTableData(products, openUpdateStatus, navigate, showSnackbar)}
                  isSorted={false}
                  entriesPerPage={false}
                  showTotalEntries={false}
                  noEndBorder
                />
              </MDBox>
              {products.length ? <Pagination
                sx={{
                  padding: 2,
                  width: '100%',
                  display: 'flex',
                  justifyContent: 'flex-end',
                }}
                count={Math.ceil(totalProducts / 10)}
                page={page}
                onChange={(e, value) => { setPage(value) }}
              /> : null}
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
                  table={competitionsTableData(competitions, openUpdateStatus)}
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
                  table={userReportsData(reports)}
                  isSorted={false}
                  entriesPerPage={false}
                  showTotalEntries={false}
                  noEndBorder
                />
              </MDBox>
            </Card>
          </Grid>
        </Grid>
      </MDBox>)}
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
          <MDInput
            defaultValue={curComment.current}
            multiline
            rows={3}
            sx={{ width: '100%', marginTop: 2 }}
            onChange={(e) => { curComment.current = e.target.value }}
            label={'Comments'} />
          <FormControl sx={{ width: '100%', marginTop: 2 }}>
            <InputLabel id="status">Status</InputLabel>
            <Select
              sx={{ padding: 1.5 }}
              fullWidth
              labelId="status"
              id="status"
              defaultValue={curStatus.current}
              label="Status"
              onChange={(e) => {
                curStatus.current = e.target.value
              }}
            >
              {Object.values(statusTypes).map((type) => {
                return <MenuItem value={type.value}>{type.label}</MenuItem>
              })}
            </Select>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <MDButton sx={{ width: '100%' }} color='primary' variant='gradient' onClick={() => updateStatus()}>Update</MDButton>
        </DialogActions>
      </Dialog>
    </DashboardLayout>
  );
}

export default AdminDashboard;
