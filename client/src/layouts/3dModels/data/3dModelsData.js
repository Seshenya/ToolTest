/* eslint-disable react/prop-types */
/* eslint-disable react/function-component-definition */

// Material Dashboard 2 React components
import MDBox from "components/MDBox";

import Icon from '@mui/material/Icon';

import { IconButton } from "@mui/material";

export default function ThreeDModelsData(models, navigate, showSnackbar) {

  const handleDelete = () => {
    console.log("DELETE")
  };

  return {
    columns: [
      { Header: "Name", accessor: "name", align: "left" },
      { Header: "action", accessor: "action", align: "center" },
    ],

    rows: models.map((model) => {

      return (
        {
          name: `${model?.name}`,
          action: (
            <MDBox display='flex'>
              <MDBox ml={1}>
                <IconButton color="red" onClick={() => handleDelete()}>
                  <Icon fontSize="small">delete</Icon>
                </IconButton>
              </MDBox>
            </MDBox>

          ),
        }
      )
    })
  };
}
