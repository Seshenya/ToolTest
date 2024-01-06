/* eslint-disable react/prop-types */
/* eslint-disable react/function-component-definition */

// Material Dashboard 2 React components
import MDBox from 'components/MDBox';
import MDTypography from 'components/MDTypography';
import MDBadge from 'components/MDBadge';

import Icon from '@mui/material/Icon';

// Images

import { statusColors } from 'constants/DummyCompetitions';

export default function competitionsTableData(competitions, openUpdateStatus) {
  return {
    columns: [
      { Header: 'Competition', accessor: 'competition', align: 'left' },
      { Header: 'Creator', accessor: 'creator', align: 'left' },
      { Header: 'date', accessor: 'date', align: 'left' },
      { Header: 'status', accessor: 'status', align: 'center' },
      { Header: 'action', accessor: 'action', align: 'center' },
    ],

    rows: competitions.map(competition => {
      return {
        competition: competition.title,
        creator: competition.creator.name,
        status: (
          <MDBox ml={-1}>
            <MDBadge
              badgeContent={competition.status}
              color={statusColors[competition.status]}
              variant='gradient'
              size='sm'
            />
          </MDBox>
        ),
        date: (
          <MDTypography component='a' href='#' variant='caption' color='text' fontWeight='medium'>
            {competition.date}
          </MDTypography>
        ),
        action: (
          <MDBox display='flex'>
            <MDBox>
              <Icon fontSize='small' onClick={() => openUpdateStatus(competition)}>
                edit
              </Icon>
            </MDBox>
            <MDBox ml={1}>
              <Icon fontSize='small'>download</Icon>
            </MDBox>
          </MDBox>
        ),
      };
    }),
  };
}
