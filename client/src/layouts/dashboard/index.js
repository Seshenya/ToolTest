// @mui material components
import Grid from '@mui/material/Grid';
import Slide from '@mui/material/Slide';

// Material Dashboard 2 React components
import MDBox from 'components/MDBox';

// Material Dashboard 2 React example components
import DashboardLayout from 'examples/LayoutContainers/DashboardLayout';
import DashboardNavbar from 'examples/Navbars/DashboardNavbar';
import Footer from 'examples/Footer';
import ReportsBarChart from 'examples/Charts/BarCharts/ReportsBarChart';
import ReportsLineChart from 'examples/Charts/LineCharts/ReportsLineChart';
import ComplexStatisticsCard from 'examples/Cards/StatisticsCards/ComplexStatisticsCard';

// Data
import reportsBarChartData from 'layouts/dashboard/data/reportsBarChartData';
import reportsLineChartData from 'layouts/dashboard/data/reportsLineChartData';

// Dashboard components
import Projects from 'layouts/dashboard/components/Projects';
import OrdersOverview from 'layouts/dashboard/components/OrdersOverview';

import banner1 from 'assets/images/banners/banner1.png';
import banner2 from 'assets/images/banners/banner2.png';
import { useEffect, useState } from 'react';

import Carousel from 'react-material-ui-carousel';

function Dashboard() {
  const { sales, tasks } = reportsLineChartData;

  const bannersEvents = [banner1, banner2];

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <Carousel indicators={false}>
        {bannersEvents.map((banner, idx) => (
          <MDBox
            key={idx}
            display='flex'
            alignItems='center'
            position='relative'
            minHeight='18.75rem'
            borderRadius='xl'
            sx={{
              backgroundImage: ({ functions: { rgba, linearGradient }, palette: { gradients } }) =>
                `${linearGradient(
                  rgba(gradients.info.main, 0.2),
                  rgba(gradients.info.state, 0.2)
                )}, url(${banner})`,
              backgroundSize: 'cover',
              backgroundPosition: '100%',
              overflow: 'hidden',
            }}
          />
        ))}
      </Carousel>

      <MDBox py={3}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6} lg={3}>
            <MDBox mb={1.5}>
              <ComplexStatisticsCard
                color='dark'
                icon='weekend'
                title='Bookings'
                count={281}
                percentage={{
                  color: 'success',
                  amount: '+55%',
                  label: 'than lask week',
                }}
              />
            </MDBox>
          </Grid>
          <Grid item xs={12} md={6} lg={3}>
            <MDBox mb={1.5}>
              <ComplexStatisticsCard
                icon='leaderboard'
                title="Today's Users"
                count='2,300'
                percentage={{
                  color: 'success',
                  amount: '+3%',
                  label: 'than last month',
                }}
              />
            </MDBox>
          </Grid>
          <Grid item xs={12} md={6} lg={3}>
            <MDBox mb={1.5}>
              <ComplexStatisticsCard
                color='success'
                icon='store'
                title='Revenue'
                count='34k'
                percentage={{
                  color: 'success',
                  amount: '+1%',
                  label: 'than yesterday',
                }}
              />
            </MDBox>
          </Grid>
          <Grid item xs={12} md={6} lg={3}>
            <MDBox mb={1.5}>
              <ComplexStatisticsCard
                color='primary'
                icon='person_add'
                title='Followers'
                count='+91'
                percentage={{
                  color: 'success',
                  amount: '',
                  label: 'Just updated',
                }}
              />
            </MDBox>
          </Grid>
        </Grid>
        <MDBox mt={4.5}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6} lg={4}>
              <MDBox mb={3}>
                <ReportsBarChart
                  color='info'
                  title='website views'
                  description='Last Campaign Performance'
                  date='campaign sent 2 days ago'
                  chart={reportsBarChartData}
                />
              </MDBox>
            </Grid>
            <Grid item xs={12} md={6} lg={4}>
              <MDBox mb={3}>
                <ReportsLineChart
                  color='success'
                  title='daily sales'
                  description={
                    <>
                      (<strong>+15%</strong>) increase in today sales.
                    </>
                  }
                  date='updated 4 min ago'
                  chart={sales}
                />
              </MDBox>
            </Grid>
            <Grid item xs={12} md={6} lg={4}>
              <MDBox mb={3}>
                <ReportsLineChart
                  color='dark'
                  title='completed tasks'
                  description='Last Campaign Performance'
                  date='just updated'
                  chart={tasks}
                />
              </MDBox>
            </Grid>
          </Grid>
        </MDBox>
        <MDBox>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6} lg={8}>
              <Projects />
            </Grid>
            <Grid item xs={12} md={6} lg={4}>
              <OrdersOverview />
            </Grid>
          </Grid>
        </MDBox>
      </MDBox>
      <Footer />
    </DashboardLayout>
  );
}

export default Dashboard;
