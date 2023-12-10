import { ShoppingCartRounded, StoreRounded, SwapHorizRounded } from '@mui/icons-material';
import MDBox from 'components/MDBox';
import MDButton from 'components/MDButton';
import { useMaterialUIController } from 'context';
import React from 'react';

const PDActionButtons = () => {
  const [controller] = useMaterialUIController();
  const { sidenavColor } = controller;

  return (
    <>
      <MDButton variant='gradient' color={sidenavColor} fullWidth sx={{ marginBottom: 1 }}>
        Buy now &nbsp;
        <StoreRounded />
      </MDButton>
      <MDBox sx={{ display: 'flex', gap: 1 }}>
        <MDButton color={'warning'} fullWidth>
          Negotiate &nbsp;
          <SwapHorizRounded />
        </MDButton>
        <MDButton variant='gradient' color={'secondary'} fullWidth>
          Add to Cart &nbsp;
          <ShoppingCartRounded />
        </MDButton>
      </MDBox>
    </>
  );
};

export default PDActionButtons;
