
// @mui material components
import Card from "@mui/material/Card";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";


// Material Dashboard 2 React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import DataTable from "examples/Tables/DataTable";

// Data
import { useEffect, useRef, useState } from "react";
import { useSnackbar } from "context/SnackbarContext";
import useAxiosPrivate from "hooks/useAxiosPrivate";
import { CircularProgress, Dialog, DialogActions, DialogContent, DialogTitle, FormControl, Icon, InputLabel, MenuItem, Pagination, Select } from "@mui/material";
import { useNavigate } from "react-router-dom";
import ThreeDModelsData from "./data/3dModelsData";
import MDButton from "components/MDButton";
import MDInput from "components/MDInput";

function ThreeDModels() {

  const [models, setModels] = useState([])
  const [totalCount, setTotalCount] = useState(0)

  const [addModalOpen, setAddModalOpen] = useState(false);
  const curModel = useRef(null)
  const curName = useRef(null)


  const { showSnackbar } = useSnackbar();
  const [loading, setLoading] = useState(false)
  const axiosPrivate = useAxiosPrivate()
  const [page, setPage] = useState(1)
  const navigate = useNavigate()


  const get3DModels = () => {
    setLoading(true)
    axiosPrivate
      .get(`/3d-models`)
      .then((res) => {
        setLoading(false)
        setModels(res.data.models)
        setTotalCount(res.data.totalCount)
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



  useEffect(() => {
    get3DModels()
  }, [page])

  const handleFileInputChange = (e) => {
    const files = Array.from(e.target.files);
    if (files?.[0]?.name?.split('.')?.pop()?.toLowerCase() === 'glb') {
      curModel.current = files[0]
      console.log(curModel.current.name)
    } else {
      showSnackbar({
        color: 'error',
        title: 'Only GLB Models Allowed',
        message: '',
        icon: 'error',
      })
    }
  }

  const handleSubmit = (e) => {

    const formData = new FormData()
    if (curModel?.current && curName.current) {
      formData.append('model', curModel.current);
      formData.append('name', curName.current)
    } else {
      showSnackbar({
        color: 'error',
        title: 'Data is missing',
        message: '',
        icon: 'error',
      })
    }

    axiosPrivate
      .post(`/3d-models`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      .then(response => {
        showSnackbar({
          color: 'success',
          icon: 'success',
          title: 'Model Updated',
          message: '',
        })
        setAddModalOpen(false);
        get3DModels()
        curModel.current = null
        curName.current = null
      })
      .catch((error) => {
        showSnackbar({
          color: 'error',
          icon: 'error',
          title: error.message,
          message: '',
        })
      })
  }


  return (
    <DashboardLayout>
      <DashboardNavbar />
      {loading ? (
        <MDBox style={{ textAlign: 'center' }}>
          <CircularProgress />
        </MDBox>
      ) : (<MDBox pt={6} pb={3}>
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
            display='flex'
            justifyContent='space-between'

          >
            <MDTypography variant="h6" color="white">
              3D Models
            </MDTypography>
            <MDButton
              variant="gradient"
              size="small"
              color={'primary'}
              onClick={() => setAddModalOpen(true)}
            >
              <Icon>add</Icon>
              Add New
            </MDButton>
          </MDBox>
          <MDBox pt={3}>
            <DataTable
              table={ThreeDModelsData(models, navigate, showSnackbar)}
              isSorted={false}
              entriesPerPage={false}
              showTotalEntries={false}
              noEndBorder
            />
          </MDBox>
        </Card>
      </MDBox>)}
      <Footer />

      <Dialog
        open={addModalOpen}
        onClose={() => setAddModalOpen(false)}
      >
        <DialogTitle>
          Add New Model
        </DialogTitle>
        <DialogContent>
          <MDInput
            defaultValue={curName.current}
            rows={3}
            sx={{ width: '100%', marginTop: 2 }}
            onChange={(e) => { curName.current = e.target.value }}
            label={'Name'} />


          <MDButton variant="outlined" component="label" color="primary"
            sx={{ width: '100%', marginTop: 2 }}
          >
            Upload File
            <input
              type="file"
              onChange={handleFileInputChange}
              hidden
            />
          </MDButton>
          {curModel?.current && (
            <MDBox marginTop="10px" padding="5px" border="1px solid #ccc">
              <MDTypography variant="body1" color="secondary">
                {curModel?.current?.name}
              </MDTypography>
            </MDBox>
          )}
        </DialogContent>
        <DialogActions>
          <MDButton sx={{ width: '100%' }} color='primary' variant='gradient' onClick={() => handleSubmit()}>submit</MDButton>
        </DialogActions>
      </Dialog>
    </DashboardLayout>
  );
}

export default ThreeDModels;
