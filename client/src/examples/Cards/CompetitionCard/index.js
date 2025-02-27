
// react-router-dom components
import { Link } from "react-router-dom";

// prop-types is a library for typechecking of props
import PropTypes from "prop-types";

// @mui material components
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import Tooltip from "@mui/material/Tooltip";
import Icon from "@mui/material/Icon";
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDButton from "components/MDButton";
import MDAvatar from "components/MDAvatar";
import { useState } from "react";
import MDInput from "components/MDInput";
import MDBadge from "components/MDBadge";
import { statusColors } from "constants/DummyProducts";



function CompetitionCard({ image, label, title, description, action, authors, deleteBtn, discountCode, editBtn, status }) {

  const [deleteOpen, setDeleteOpen] = useState(false)
  const [discountOpen, setDiscountOpen] = useState(false)

  const renderAuthors = authors.map(({ image: media, name }) => (
    <Tooltip key={name} title={name} placement="bottom">
      <MDAvatar
        src={media}
        alt={name}
        size="xs"
        sx={({ borders: { borderWidth }, palette: { white } }) => ({
          border: `${borderWidth[2]} solid ${white.main}`,
          cursor: "pointer",
          position: "relative",
          ml: -1.25,
          "&:hover, &:focus": {
            zIndex: "10",
          },
        })}
      />
    </Tooltip>
  ));

  return (
    <Card
      sx={{
        display: "flex",
        flexDirection: "column",
        backgroundColor: "transparent",
        boxShadow: "none",
        overflow: "visible",
      }}
    >
      <MDBox position="relative" width="100.25%" borderRadius="xl">
        <CardMedia
          src={image}
          component="img"
          title={title}
          sx={{
            maxWidth: "100%",
            height: '20vh',
            margin: 0,
            boxShadow: ({ boxShadows: { md } }) => md,
            objectFit: "cover",
            objectPosition: "center",
            textAlign: 'center',
          }}
        />
      </MDBox>
      <MDBox mt={1} mx={0.5}>
        <MDBox mb={1}>
          {action ? (action.type === "internal" ? (
            <MDTypography
              component={Link}
              to={action.route}
              variant="h5"
              textTransform="capitalize"
            >
              {title}
            </MDTypography>
          ) : (
            <MDTypography
              component="a"
              href={action.route}
              target="_blank"
              rel="noreferrer"
              variant="h5"
              textTransform="capitalize"
            >
              {title}
            </MDTypography>
          )) : null}
        </MDBox>
        <MDBox mb={3} lineHeight={0}>
          <MDTypography variant="button" fontWeight="light" color="text">
            {description}
          </MDTypography>
        </MDBox>
        <MDBox display="flex" justifyContent="space-between" alignItems="center">
          {
            status ? (
              <MDBadge badgeContent={status} color={statusColors[status]} variant="gradient" size="sm" />
            ) : null
          }
          {action ? (
            action.type === "internal" ? (
              <MDButton
                component={Link}
                to={action.route}
                variant="outlined"
                size="small"
                color={action.color}
              >
                {action.label}
              </MDButton>
            ) : (
              <MDButton
                component="a"
                href={action.route}
                target="_blank"
                rel="noreferrer"
                variant="outlined"
                size="small"
                color={action.color}
              >
                {action.label}
              </MDButton>
            )) : null}
          <MDBox display="flex">{renderAuthors}</MDBox>
          <MDBox display="flex" justifyContent="space-evenly" mr={3}>
            {
              editBtn ?
                (
                  <MDBox display="flex" mr={3}>
                    <Tooltip key={'edit'} title={"Edit"} placement="bottom">
                      <Icon>edit</Icon>
                    </Tooltip>
                  </MDBox>
                ) : null
            }
            {
              deleteBtn ?
                (
                  <MDBox display="flex" mr={3}>
                    <Tooltip key={'delete'} title={"Delete"} placement="bottom">
                      <Icon sx={{ color: 'red' }} onClick={() => setDeleteOpen(true)}>delete</Icon>
                    </Tooltip>
                  </MDBox>
                ) : null
            }
            <Dialog
              open={deleteOpen}
              onClose={() => setDeleteOpen(false)}
              aria-labelledby="delete-title"
              aria-describedby="delete-description"
            >
              <DialogTitle id="delete-title">
                Are you sure ?
              </DialogTitle>
              <DialogActions>
                <MDButton onClick={() => setDeleteOpen(false)}>Yes</MDButton>
                <MDButton onClick={() => setDeleteOpen(false)} >
                  No
                </MDButton>
              </DialogActions>
            </Dialog>
            {
              discountCode ?
                (
                  <Tooltip key={'discount'} title={"Generate Discount Code"} placement="bottom">
                    <Icon onClick={() => setDiscountOpen(true)}>discount</Icon>
                  </Tooltip>
                ) : null
            }
            <Dialog
              open={discountOpen}
              onClose={() => setDiscountOpen(false)}
              aria-labelledby="delete-title"
              aria-describedby="delete-description"
            >
              <DialogTitle id="delete-title">
                Generate Discount Code
              </DialogTitle>
              <DialogContent>
                <MDInput
                  startDecorator={"A"}
                  type='number' sx={{ width: '100%', marginTop: 2 }} label={'Amount'} />
                <MDBox
                  display='flex'
                >
                  <MDTypography variant={'title'} mt={1} >AJHSG12312</MDTypography>
                  <Icon sx={{ marginTop: 1.5, marginLeft: 1 }}>copy</Icon>
                </MDBox>
              </DialogContent>
              <DialogActions>
                <MDButton sx={{ width: '100%' }} color='primary' variant='gradient' onClick={() => setDiscountOpen(false)}>Generate</MDButton>
              </DialogActions>
            </Dialog>
          </MDBox>
        </MDBox>
      </MDBox>
    </Card >
  );
}

// Setting default values for the props of CompetitionCard
CompetitionCard.defaultProps = {
  authors: [],
};

// Typechecking props for the CompetitionCard
CompetitionCard.propTypes = {
  image: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  action: PropTypes.shape({
    type: PropTypes.oneOf(["external", "internal"]),
    route: PropTypes.string.isRequired,
    color: PropTypes.oneOf([
      "primary",
      "secondary",
      "info",
      "success",
      "warning",
      "error",
      "light",
      "dark",
      "white",
    ]).isRequired,
    label: PropTypes.string.isRequired,
  }).isRequired,
  authors: PropTypes.arrayOf(PropTypes.object),
};

export default CompetitionCard;
