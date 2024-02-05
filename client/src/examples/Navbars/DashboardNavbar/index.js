import { useState, useEffect } from 'react';
import useAxiosPrivate from 'hooks/useAxiosPrivate';

// react-router components
import { useLocation, Link, useNavigate } from 'react-router-dom';

// prop-types is a library for typechecking of props.
import PropTypes from 'prop-types';

// @material-ui core components
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import Icon from '@mui/material/Icon';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

// Material Dashboard 2 React components
import MDBox from 'components/MDBox';
import MDInput from 'components/MDInput';
import MDButton from 'components/MDButton';
import SearchByImageModal from 'layouts/shop/components/SearchByImageModal';

// Material Dashboard 2 React example components
import Breadcrumbs from 'examples/Breadcrumbs';
import NotificationItem from 'examples/Items/NotificationItem';

// Custom styles for DashboardNavbar
import {
    navbar,
    navbarContainer,
    navbarRow,
    navbarIconButton,
    navbarMobileMenu,
} from 'examples/Navbars/DashboardNavbar/styles';

// Material Dashboard 2 React context
import {
    useMaterialUIController,
    setTransparentNavbar,
    setMiniSidenav,
    setOpenConfigurator,
} from 'context';
import MDTypography from 'components/MDTypography';
import { debounce } from 'lodash';
import { axiosPrivate } from 'api/axios';
import useAuth from 'hooks/useAuth';

function DashboardNavbar({
    absolute,
    light,
    isMini,
    filters,
    reCallApi,
    filtersRef,
    hideBreadCrumbs,
    shop,
    smartsearch,
    onSearch,
}) {
    const [navbarType, setNavbarType] = useState();
    const [controller, dispatch] = useMaterialUIController();
    const {
        miniSidenav,
        transparentNavbar,
        fixedNavbar,
        openConfigurator,
        darkMode,
    } = controller;
    const [openMenu, setOpenMenu] = useState(false);
    const [openModal, setOpenModal] = useState(false)
    const route = useLocation().pathname.split('/').slice(1);
    const { auth, updateAuth } = useAuth();
    const axiosPrivate = useAxiosPrivate();

    const [categories, setCategories] = useState([]);
    const [mediaTypes, setMediaTypes] = useState([]);

    const [searchQuery, setSearchQuery] = useState('');

    const handleModalOpen = () => {
        setOpenModal(true)
    }

    const handleModalClose = () => {
        setOpenModal(false)
    }

    useEffect(() => {
        if (auth?.user_id) {


            const fetchCategories = async () => {
                try {
                    const response = await axiosPrivate.get('/categories/');
                    setCategories(response.data);
                } catch (error) {
                    console.error('Error fetching categories:', error);
                }
            };

            const fetchMediaTypes = async () => {
                try {
                    const response = await axiosPrivate.get('/types/');
                    setMediaTypes(response.data);
                } catch (error) {
                    console.error('Error fetching media types:', error);
                }
            };

            fetchCategories();
            fetchMediaTypes();
        }
    }, []);

    useEffect(() => {
        // Setting the navbar type
        if (fixedNavbar) {
            setNavbarType('sticky');
        } else {
            setNavbarType('static');
        }

        // A function that sets the transparent state of the navbar.
        function handleTransparentNavbar() {
            setTransparentNavbar(
                dispatch,
                (fixedNavbar && window.scrollY === 0) || !fixedNavbar
            );
        }

        /** 
 The event listener that's calling the handleTransparentNavbar function when 
 scrolling the window.
*/
        window.addEventListener('scroll', handleTransparentNavbar);

        // Call the handleTransparentNavbar function to set the state with the initial value.
        handleTransparentNavbar();

        // Remove event listener on cleanup
        return () =>
            window.removeEventListener('scroll', handleTransparentNavbar);
    }, [dispatch, fixedNavbar]);

    const handleMiniSidenav = () => setMiniSidenav(dispatch, !miniSidenav);
    const handleConfiguratorOpen = () =>
        setOpenConfigurator(dispatch, !openConfigurator);
    const handleOpenMenu = (event) => setOpenMenu(event.currentTarget);
    const handleCloseMenu = () => setOpenMenu(false);
    const navigate = useNavigate();

    const logout = () => {
        axiosPrivate
            .delete(`/logout`, {
                data: { token: auth.refreshToken },
            })
            .then((res) => {
                updateAuth({});
                localStorage.removeItem('user');
                navigate('/authentication/sign-in');
            });
    };

    // Render the notifications menu
    const renderMenu = () => {
        return (
            <Menu
                anchorEl={openMenu}
                anchorReference={null}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                }}
                open={Boolean(openMenu)}
                onClose={handleCloseMenu}
                sx={{ mt: 2 }}
            >
                <Link to="/profile">
                    <NotificationItem
                        icon={<Icon>person</Icon>}
                        title="My Profile"
                    />
                </Link>
                <NotificationItem
                    icon={<Icon>history</Icon>}
                    title="Order History"
                    onClick={() => navigate('/order-history')}
                />
                <NotificationItem
                    onClick={logout}
                    icon={<Icon>logout</Icon>}
                    title="Logout"
                />
            </Menu>
        );
    };

    // Styles for the navbar icons
    const iconsStyle = ({
        palette: { dark, white, text },
        functions: { rgba },
    }) => ({
        color: () => {
            let colorValue = light || darkMode ? white.main : dark.main;

            if (transparentNavbar && !light) {
                colorValue = darkMode ? rgba(text.main, 0.6) : text.main;
            }

            return colorValue;
        },
    });

    return (
        <AppBar
            position={absolute ? 'absolute' : navbarType}
            color="inherit"
            sx={(theme) =>
                navbar(theme, { transparentNavbar, absolute, light, darkMode })
            }
        >
            <Toolbar sx={(theme) => navbarContainer(theme)}>
                <MDBox
                    color="inherit"
                    mb={{ xs: 1, md: 0 }}
                    sx={(theme) => navbarRow(theme, { isMini })}
                >
                    {hideBreadCrumbs ? null : (
                        <Breadcrumbs
                            icon="home"
                            title={route[route.length - 1]}
                            route={route}
                            light={light}
                        />
                    )}
                </MDBox>
                {isMini ? null : auth?.user_id ? (
                    <MDBox sx={(theme) => navbarRow(theme, { isMini })}>
                        {filters ? (
                            <>
                                <MDBox pr={1}>
                                    <FormControl sx={{ width: 120 }}>
                                        <InputLabel id="category">
                                            Category
                                        </InputLabel>
                                        <Select
                                            sx={{ padding: 1.5 }}
                                            fullWidth
                                            labelId="category"
                                            id="category"
                                            defaultValue={''}
                                            label="Category"
                                            onChange={(e) => {
                                                filtersRef.current.category =
                                                    e.target.value;
                                                reCallApi(filtersRef.current);
                                            }}
                                        >
                                            <MenuItem value={''}>All</MenuItem>
                                            {categories.map((category) => (
                                                <MenuItem value={category.id}>
                                                    {category.type}
                                                </MenuItem>
                                            ))}
                                        </Select>
                                    </FormControl>
                                </MDBox>
                                {/* <MDBox pr={1}>
                    <FormControl sx={{ width: 120 }}>
                      <InputLabel id="category">Ratings</InputLabel>
                      <Select
                        sx={{ padding: 1.5 }}
                        fullWidth
                        labelId="ratings"
                        id="ratings"
                        defaultValue={'4'}
                        label="Ratings"
                        renderValue={(value) => {
                          return (
                            <MDBox sx={(theme) => navbarRow(theme, { isMini })}>
                              {value}
                              &nbsp;<Icon sx={{ color: 'gold' }}>star</Icon>
                            </MDBox>
                          )
                        }}
                      >
                        <MenuItem value={'1'}>1</MenuItem>
                        <MenuItem value={'2'}>2</MenuItem>
                        <MenuItem value={'3'}>3</MenuItem>
                        <MenuItem value={'4'}>4</MenuItem>
                        <MenuItem value={'5'}>5</MenuItem>
                      </Select>
                    </FormControl>
                  </MDBox> */}
                                <MDBox pr={1}>
                                    <FormControl sx={{ width: 140 }}>
                                        <InputLabel id="media_type">
                                            Media Type
                                        </InputLabel>
                                        <Select
                                            sx={{ padding: 1.5 }}
                                            fullWidth
                                            labelId="media_type"
                                            id="media_type"
                                            defaultValue={''}
                                            label="File Type"
                                            onChange={(e) => {
                                                filtersRef.current.media_type =
                                                    e.target.value;
                                                reCallApi(filtersRef.current);
                                            }}
                                        >
                                            <MenuItem value={''}>All</MenuItem>
                                            {mediaTypes.map((mediaType) => (
                                                <MenuItem value={mediaType.id}>
                                                    {mediaType.type}
                                                </MenuItem>
                                            ))}
                                        </Select>
                                    </FormControl>
                                </MDBox>
                                <MDBox pr={1}>
                                    <MDInput
                                        onChange={debounce((e) => {
                                            filtersRef.current.query =
                                                e.target.value;
                                            reCallApi(filtersRef.current);
                                        }, 400)}
                                        label="Search..."
                                    />
                                </MDBox>
                                {shop ? (
                                    <MDButton
                                        variant="gradient"
                                        size="medium"
                                        color={'primary'}
                                        onClick={handleModalOpen}
                                    >
                                        Search By Image
                                    </MDButton>
                                ) : null}
                            </>
                        ) : null}

                        {smartsearch ? (
                            <>
                                <MDBox pr={1}>
                                    <MDInput
                                        onChange={debounce((e) => {
                                            setSearchQuery(e.target.value);
                                        }, 400)}
                                        label="Search..."
                                        required
                                    />
                                </MDBox>
                                <MDButton
                                    variant="gradient"
                                    size="medium"
                                    color={'primary'}
                                    onClick={() => {
                                        if (searchQuery.trim() !== '') {
                                            onSearch(searchQuery);
                                        } else {
                                            alert('Search field cannot be empty!');
                                        }
                                    }}
                                >Search
                                </MDButton>
                            </>
                        ) : null }

                        <MDBox color={light ? 'white' : 'inherit'}>
                            <IconButton
                                size="small"
                                disableRipple
                                color="inherit"
                                sx={navbarMobileMenu}
                                onClick={handleMiniSidenav}
                            >
                                <Icon sx={iconsStyle} fontSize="medium">
                                    {miniSidenav ? 'menu_open' : 'menu'}
                                </Icon>
                            </IconButton>
                            <IconButton
                                sx={navbarIconButton}
                                size="small"
                                disableRipple
                                onClick={handleOpenMenu}
                            >
                                <Icon sx={iconsStyle}>account_circle</Icon>
                                <MDTypography>
                                    &nbsp;Hello, {`${auth?.firstname}`}
                                </MDTypography>
                            </IconButton>

                            {/* <IconButton
                  size="small"
                  disableRipple
                  color="inherit"
                  sx={navbarIconButton}
                  onClick={handleConfiguratorOpen}
                >
                  <Icon sx={iconsStyle}>settings</Icon>
                </IconButton> */}
                            {/* <IconButton
                  size="small"
                  disableRipple
                  color="inherit"
                  sx={navbarIconButton}
                  aria-controls="notification-menu"
                  aria-haspopup="true"
                  variant="contained"
                  onClick={handleOpenMenu}
                >
                  <Icon sx={iconsStyle}>notifications</Icon>
                </IconButton> */}
                            {renderMenu()}
                        </MDBox>
                    </MDBox>
                ) : (
                    <MDBox sx={(theme) => navbarRow(theme, { isMini })}>
                        <MDBox pr={1}>
                            <Link to="/authentication/sign-in">
                                <MDButton variant="outlined" color="primary">
                                    <Icon sx={{ fontWeight: 'bold' }}>
                                        login
                                    </Icon>
                                    &nbsp;Sign In
                                </MDButton>
                            </Link>
                        </MDBox>
                        <MDBox>
                            <Link to="/authentication/sign-up">
                                <MDButton variant="gradient" color="primary">
                                    <Icon sx={{ fontWeight: 'bold' }}>
                                        person
                                    </Icon>
                                    &nbsp;Sign Up
                                </MDButton>
                            </Link>
                        </MDBox>
                    </MDBox>
                )}
            </Toolbar>
            <SearchByImageModal
                openModal={openModal}
                onClose={handleModalClose}
                setOpenModal={setOpenModal}
                reCallApi={reCallApi}
                filtersRef={filtersRef}
            />
        </AppBar>

    );
}

// Setting default values for the props of DashboardNavbar
DashboardNavbar.defaultProps = {
    absolute: false,
    light: false,
    isMini: false,
};

// Typechecking props for the DashboardNavbar
DashboardNavbar.propTypes = {
    absolute: PropTypes.bool,
    light: PropTypes.bool,
    isMini: PropTypes.bool,
};

export default DashboardNavbar;
