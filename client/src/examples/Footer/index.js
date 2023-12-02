// Material Dashboard 2 React components
import MDBox from "components/MDBox";

// Material Dashboard 2 React base styles
import typography from "assets/theme/base/typography";

function Footer({ }) {
  const { size } = typography;


  return (
    <MDBox
      display="flex"
      justifyContent="center"
      alignItems="center"
      flexWrap="wrap"
      color="text"
      fontSize={size.sm}
      px={1.5}
      sx={{ marginTop: 1 }}
    >
      &copy; {new Date().getFullYear()}, Fulda University of Applied Sciences Software Engineering Project, Fall 2023 For
      Demonstration Only
    </MDBox>
  );
}

export default Footer;
