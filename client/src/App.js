
import { useState, useEffect, useMemo } from "react";

// react-router components
import { Routes, Route, Navigate, useLocation } from "react-router-dom";

// @mui material components
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import Icon from "@mui/material/Icon";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";

// Material Dashboard 2 React example components
import Sidenav from "examples/Sidenav";
import Configurator from "examples/Configurator";

// Material Dashboard 2 React themes
import theme from "assets/theme";
import themeRTL from "assets/theme/theme-rtl";

// Material Dashboard 2 React Dark Mode themes
import themeDark from "assets/theme-dark";
import themeDarkRTL from "assets/theme-dark/theme-rtl";

// RTL plugins
import rtlPlugin from "stylis-plugin-rtl";
import { CacheProvider } from "@emotion/react";
import createCache from "@emotion/cache";

// Material Dashboard 2 React routes
import routes from "routes";

// Material Dashboard 2 React contexts
import { useMaterialUIController, setMiniSidenav, setOpenConfigurator } from "context";

// Images
import brandWhite from "assets/images/logo-ct.png";
import brandDark from "assets/images/logo-ct-dark.png";
import ProtectedRoute from "components/ProtectedRoute";
import { SnackbarProvider } from "context/SnackbarContext";
import useAuth from "hooks/useAuth";

import ReactGa from "react-ga4";

export default function App() {
  const [controller, dispatch] = useMaterialUIController();
  const {
    miniSidenav,
    direction,
    layout,
    openConfigurator,
    sidenavColor,
    transparentSidenav,
    whiteSidenav,
    darkMode,
  } = controller;
  const [onMouseEnter, setOnMouseEnter] = useState(false);
  const [rtlCache, setRtlCache] = useState(null);
  const { pathname } = useLocation();
  const { auth } = useAuth();
  const location = useLocation();

  // Google Analytics
  const TRACKING_ID = "G-60L0PNKCYF";
  useEffect(() => {
    console.log("Initializing Google Analytics");
    ReactGa.initialize(TRACKING_ID);
  
    return () => {
      console.log("Cleaning up Google Analytics");
    };
  }, []);
  
  useEffect(() => {
    console.log("Tracking pageview:", location.pathname + location.search);
    ReactGa.send({ hitType: "pageview", page: location.pathname + location.search });
  }, [location]);

  // Cache for the rtl
  useMemo(() => {
    const cacheRtl = createCache({
      key: "rtl",
      stylisPlugins: [rtlPlugin],
    });

    setRtlCache(cacheRtl);
  }, []);

  // Open sidenav when mouse enter on mini sidenav
  const handleOnMouseEnter = () => {
    if (miniSidenav && !onMouseEnter) {
      setMiniSidenav(dispatch, false);
      setOnMouseEnter(true);
    }
  };

  // Close sidenav when mouse leave mini sidenav
  const handleOnMouseLeave = () => {
    if (onMouseEnter) {
      setMiniSidenav(dispatch, true);
      setOnMouseEnter(false);
    }
  };

  // Change the openConfigurator state
  const handleConfiguratorOpen = () => setOpenConfigurator(dispatch, !openConfigurator);

  // Setting the dir attribute for the body element
  useEffect(() => {
    document.body.setAttribute("dir", direction);
  }, [direction]);

  // Setting page scroll to 0 when changing the route
  useEffect(() => {
    document.documentElement.scrollTop = 0;
    document.scrollingElement.scrollTop = 0;
  }, [pathname]);

  const getRoutes = (allRoutes) =>
    allRoutes.map((route) => {

      if (route.collapse) {
        return getRoutes(route.collapse);
      }

      if (route.route && (!route.admin || (route.admin && auth.type === 2))) {
        return <Route exact path={route.route} element={route.notProtected ? route.component : <ProtectedRoute>{route.component}</ProtectedRoute>} key={route.key} />;
      }

      return null;
    });

  const configsButton = (
    <MDBox
      display="flex"
      justifyContent="center"
      alignItems="center"
      width="3.25rem"
      height="3.25rem"
      bgColor="white"
      shadow="sm"
      borderRadius="50%"
      position="fixed"
      right="2rem"
      bottom="2rem"
      zIndex={99}
      color="dark"
      sx={{ cursor: "pointer" }}
      onClick={handleConfiguratorOpen}
    >
      <Icon fontSize="small" color="inherit">
        settings
      </Icon>
    </MDBox>
  );

  return <ThemeProvider theme={darkMode ? themeDark : theme}>
    <SnackbarProvider>
      <CssBaseline />
      {layout === "dashboard" && (
        <>
          <Sidenav
            color={sidenavColor}
            brand={(transparentSidenav && !darkMode) || whiteSidenav ? brandDark : brandWhite}
            brandName="Artsync"
            routes={routes.filter((route) => (!route.admin || (route.admin && auth.type === 2)))}
            onMouseEnter={handleOnMouseEnter}
            onMouseLeave={handleOnMouseLeave}
          />
          {/* <Configurator />
      {configsButton} */}
        </>
      )}
      {layout === "vr" && <Configurator />}
      <Routes>
        {getRoutes(routes)}
        <Route path="*" element={<Navigate to="/home" />} />
      </Routes>
    </SnackbarProvider>
  </ThemeProvider>

  // direction === "rtl" ? (
  //   <CacheProvider value={rtlCache}>
  //     <ThemeProvider theme={darkMode ? themeDarkRTL : themeRTL}>
  //       <SnackbarProvider>
  //         <CssBaseline />
  //         {layout === "dashboard" && (
  //           <>
  //             <Sidenav
  //               color={sidenavColor}
  //               brand={(transparentSidenav && !darkMode) || whiteSidenav ? brandDark : brandWhite}
  //               brandName="Artsync"
  //               routes={routes}
  //               onMouseEnter={handleOnMouseEnter}
  //               onMouseLeave={handleOnMouseLeave}
  //             />
  //             <Configurator />
  //             {configsButton}
  //           </>
  //         )}
  //         {layout === "vr" && <Configurator />}
  //         <Routes>
  //           {getRoutes(routes)}
  //           {/* <Route path="*" element={<Navigate to="/dashboard" />} /> */}
  //         </Routes>
  //       </SnackbarProvider>
  //     </ThemeProvider>
  //   </CacheProvider>
  // ) : (

  // );
}
