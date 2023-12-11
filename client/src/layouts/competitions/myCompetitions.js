// react-router-dom components
import { Link } from 'react-router-dom';

// @mui material components
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import Icon from '@mui/material/Icon';

// Material Dashboard 2 React components
import MDBox from 'components/MDBox';
import MDTypography from 'components/MDTypography';
import MDButton from 'components/MDButton';

// Material Dashboard 2 React example components
import DashboardLayout from 'examples/LayoutContainers/DashboardLayout';
import DashboardNavbar from 'examples/Navbars/DashboardNavbar';
import Footer from 'examples/Footer';

// Data

// Dashboard components

import ProductCard from 'examples/Cards/ProductCard';

import { competitions } from 'constants/DummyCompetitions';
import CompetitionCard from 'examples/Cards/CompetitionCard';

function MyCompetitions() {
  return (
    <DashboardLayout>
      <DashboardNavbar filters />
      <MDBox py={3}>
        <Card sx={{ margin: 3 }}>
          <MDBox
            mx={2}
            mt={-3}
            py={3}
            px={2}
            variant='gradient'
            bgColor='info'
            borderRadius='lg'
            coloredShadow='info'
            display='flex'
            justifyContent='space-between'
          >
            <MDTypography variant='h6' color='white'>
              My Competitions
            </MDTypography>
            <MDButton component={Link} to={'product/new'} variant='gradient' size='small' color={'primary'}>
              <Icon>add</Icon>
              Host
            </MDButton>
          </MDBox>
          <MDBox p={3}>
            <Grid container spacing={6}>
              {competitions.slice(2).map((competition, idx) => {
                return (
                  <Grid item xs={12} md={6} xl={4} key={idx}>
                    <CompetitionCard
                      image={competition.image}
                      label={competition.title}
                      title={competition.title}
                      description={competition.description}
                      deleteBtn
                      editBtn
                      status={competition.status}
                    />
                  </Grid>
                );
              })}
            </Grid>
          </MDBox>
        </Card>
      </MDBox>
      <Footer />
    </DashboardLayout>
  );
}

export default MyCompetitions;
