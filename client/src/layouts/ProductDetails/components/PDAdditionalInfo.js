import MDBox from 'components/MDBox';
import MDTypography from 'components/MDTypography';
import React from 'react';
import HeadingNContent from './HeadingNContent';
import { Chip, Grid } from '@mui/material';
import { getFileDescription } from 'common/commonUtils';

const PDAdditionalInfo = ({ fileName, fileType, fileSize, tags }) => {
  return (
    <MDBox
      sx={{
        border: '1px solid lightgrey',
        marginTop: 3,
        padding: 3,
      }}
      borderRadius={'xl'}
    >
      <MDTypography
        sx={{
          marginBottom: 2,
          fontSize: 18,
          fontWeight: 500,
        }}
      >
        Additional info.
      </MDTypography>
      <Grid container rowSpacing={2} columnSpacing={1}>
        <Grid item xs={4}>
          <HeadingNContent title={'file name'} description={`${fileName}.${fileType}`} />
        </Grid>
        <Grid item xs={4}>
          <HeadingNContent title={'file type'} description={getFileDescription(fileType)} />
        </Grid>
        <Grid item xs={4}>
          <HeadingNContent title={'file size'} description={`${fileSize}mb  `} />
        </Grid>
        <Grid item xs={12}>
          <HeadingNContent
            title={'Tags'}
            component={
              <MDBox sx={{ display: 'flex', gap: 1, marginTop: 1 }}>
                {tags.map((val, idx) => (
                  <Chip key={idx} label={val} variant='outlined' color='info' size={'small'} />
                ))}
              </MDBox>
            }
          />
        </Grid>
      </Grid>
    </MDBox>
  );
};

export default PDAdditionalInfo;
