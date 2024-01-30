/** 
  All of the routes for the Material Dashboard 2 React are added here,
  You can add a new route, customize the routes and delete the routes here.

  Once you add a new route on this file it will be visible automatically on
  the Sidenav.

  For adding a new route you can follow the existing routes in the routes array.
  1. The `type` key with the `collapse` value is used for a route.
  2. The `type` key with the `title` value is used for a title inside the Sidenav. 
  3. The `type` key with the `divider` value is used for a divider between Sidenav items.
  4. The `name` key is used for the name of the route on the Sidenav.
  5. The `key` key is used for the key of the route (It will help you with the key prop inside a loop).
  6. The `icon` key is used for the icon of the route on the Sidenav, you have to add a node.
  7. The `collapse` key is used for making a collapsible item on the Sidenav that has other routes
  inside (nested routes), you need to pass the nested routes inside an array as a value for the `collapse` key.
  8. The `route` key is used to store the route location which is used for the react router.
  9. The `href` key is used to store the external links location.
  10. The `title` key is only for the item with the type of `title` and its used for the title text on the Sidenav.
  10. The `component` key is used to store the component of its route.
*/

// Material Dashboard 2 React layouts
import Dashboard from 'layouts/dashboard';
import Tables from 'layouts/tables';
import Billing from 'layouts/billing';
import RTL from 'layouts/rtl';
import Notifications from 'layouts/notifications';
import Profile from 'layouts/profile';
import SignIn from 'layouts/authentication/sign-in';
import SignUp from 'layouts/authentication/sign-up';
import Team from 'layouts/about/';
import Home from 'layouts/home';

// @mui icons
import Icon from '@mui/material/Icon';
import Shop from 'layouts/shop';
import Sell from 'layouts/sell';
import AdminDashboard from 'layouts/admin';
import Competitions from 'layouts/competitions';
import MyCompetitions from 'layouts/competitions/myCompetitions';
import Collaborations from 'layouts/collaborations';
import MyCollaborations from 'layouts/collaborations/myCollaborations';
import Chat from 'layouts/chat';
import Categories from 'layouts/categories';

//
import ProductDetails from 'layouts/ProductDetails';
import OrderHistory from 'layouts/orderHistory';
import Developer from 'layouts/about/developer';
import ThreeTee from 'layouts/threeTee/ThreeTee';
import ThreeDModels from 'layouts/3dModels';

const routes = [
    {
        type: 'collapse',
        name: 'Home',
        key: 'home',
        icon: <Icon fontSize="small">home</Icon>,
        route: '/home',
        component: <Home />,
    },
    {
        type: 'collapse',
        name: 'Shop',
        key: 'shop',
        icon: <Icon fontSize="small">shoppingBasket</Icon>,
        route: '/shop',
        component: <Shop />,
    },
    {
        // type: 'collapse',
        // name: 'Shop',
        // key: 'shop',
        // icon: <Icon fontSize='small'>shoppingBasket</Icon>,
        route: '/shop/:productId',
        component: <ProductDetails />,
    },
    {
        type: 'collapse',
        name: 'Sell',
        key: 'sell',
        icon: <Icon fontSize="small">store</Icon>,
        route: '/sell',
        component: <Sell />,
    },
    // {
    //     type: 'collapse',
    //     name: 'Competitions',
    //     key: 'competitions',
    //     icon: <Icon fontSize="small">event</Icon>,
    //     route: '/competitions',
    //     component: <Competitions />,
    // },
    // {
    //     type: 'title',
    //     name: 'My Competitions',
    //     key: 'myCompetitions',
    //     icon: <Icon fontSize="small">event</Icon>,
    //     route: '/my-competitions',
    //     component: <MyCompetitions />,
    // },
    // {
    //     type: 'collapse',
    //     name: 'Collaborations',
    //     key: 'collaborarions',
    //     icon: <Icon fontSize="small">group_add</Icon>,
    //     route: '/collaborarions',
    //     component: <Collaborations />,
    // },
    // {
    //     type: 'title',
    //     name: 'My Collaborations',
    //     key: 'myCollaborarions',
    //     icon: <Icon fontSize="small">event</Icon>,
    //     route: '/my-collaborarions',
    //     component: <MyCollaborations />,
    // },
    {
        type: 'collapse',
        name: 'Admin Dashboard',
        key: 'admin',
        icon: <Icon fontSize="small">dashboard</Icon>,
        route: '/admin',
        component: <AdminDashboard />,
        admin: true,
    },
    {
        type: 'title',
        name: 'Dashboard',
        key: 'dashboard',
        icon: <Icon fontSize="small">dashboard</Icon>,
        route: '/dashboard',
        component: <Dashboard />,
    },
    {
        type: 'title',
        name: 'Tables',
        key: 'tables',
        icon: <Icon fontSize="small">table_view</Icon>,
        route: '/tables',
        component: <Tables />,
    },
    {
        type: 'title',
        name: 'Billing',
        key: 'billing',
        icon: <Icon fontSize="small">receipt_long</Icon>,
        route: '/billing',
        component: <Billing />,
    },
    {
        type: 'title',
        name: 'RTL',
        key: 'rtl',
        icon: <Icon fontSize="small">format_textdirection_r_to_l</Icon>,
        route: '/rtl',
        component: <RTL />,
    },
    {
        type: 'title',
        name: 'Notifications',
        key: 'notifications',
        icon: <Icon fontSize="small">notifications</Icon>,
        route: '/notifications',
        component: <Notifications />,
    },
    {
        type: 'title',
        name: 'Profile',
        key: 'profile',
        icon: <Icon fontSize="small">person</Icon>,
        route: '/profile',
        component: <Profile />,
    },
    {
        type: 'title',
        name: 'Sign In',
        key: 'sign-in',
        icon: <Icon fontSize="small">login</Icon>,
        route: '/authentication/sign-in',
        component: <SignIn />,
        notProtected: true,
    },
    {
        type: 'title',
        name: 'Sign Up',
        key: 'sign-up',
        icon: <Icon fontSize="small">assignment</Icon>,
        route: '/authentication/sign-up',
        component: <SignUp />,
        notProtected: true,
    },
    {
        type: 'collapse',
        name: 'Chat',
        key: 'chat',
        icon: <Icon fontSize="small">chat</Icon>,
        route: '/chat',
        component: <Chat />,
    },
    {
        type: 'collapse',
        name: 'About Us',
        key: 'about-us',
        icon: <Icon fontSize="small">group</Icon>,
        route: '/about-us',
        component: <Team />,
    },
    {
        type: 'collapse',
        name: 'Categories',
        key: 'categories',
        icon: <Icon fontSize="small">category</Icon>,
        route: '/categories',
        component: <Categories />,
    },
    {
        type: 'title',
        route: '/order-history',
        // name: 'Order history',
        // key: 'Order history',
        component: <OrderHistory />,
    },
    {
        name: 'Developer',
        route: '/about-us/:developer',
        component: <Developer />,
    },
    {
        type: 'collapse',
        name: '3Tee',
        icon: <Icon fontSize="small">accessibility</Icon>,
        key: '3tee',
        route: '/3tee',
        component: <ThreeTee />,
    },
    {
        type: 'collapse',
        name: '3D Models',
        key: '3d-models',
        icon: <Icon fontSize="small">category</Icon>,
        route: '/3d-models',
        component: <ThreeDModels />,
    },
];

export default routes;
