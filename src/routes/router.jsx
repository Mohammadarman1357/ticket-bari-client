import { createBrowserRouter } from "react-router";
import MainLayout from "../layouts/MainLayout/MainLayout";
import Home from "../pages/Home/Home/Home";
import AuthLayout from "../layouts/AuthLayout/AuthLayout";
import Login from "../pages/Auth/Login/Login";
import Register from "../pages/Auth/Register/Register";
import Error from "../pages/Error/Error";
import PrivateRoute from "./PrivateRoute";
import AllTickets from "../pages/AllTickets/AllTickets";
import Dashboard from "../layouts/Dashboard/Dashboard";
import DashboardHome from "../pages/Dashboard/DashboardHome/DashboardHome";
import Profile from "../pages/Dashboard/Profile/Profile";
import VendorRoute from "./VendorRoute";
import AddTickets from "../pages/Dashboard/VendorsPage/AddTickets/AddTickets";
import MyAddedTickets from "../pages/Dashboard/VendorsPage/MyAddedTickets/MyAddedTickets";
import RequestedBookings from "../pages/Dashboard/VendorsPage/RequestedBookings/RequestedBookings";
import RevenueOverview from "../pages/Dashboard/VendorsPage/RevenueOverview/RevenueOverview";
import AdminRoute from "./AdminRoute";
import ManageTickets from "../pages/Dashboard/AdminPage/ManageTickets/ManageTickets";
import AdvertiseTickets from "../pages/Dashboard/AdminPage/AdvertiseTickets/AdvertiseTickets";
import ManageUsers from "../pages/Dashboard/AdminPage/ManageUsers/ManageUsers";



export const router = createBrowserRouter([
    {
        path: "/",
        Component: MainLayout,
        children: [
            {
                index: true,
                Component: Home
            },
            {
                path:'all-tickets',
                element:<PrivateRoute><AllTickets></AllTickets></PrivateRoute>
            }
        ]
    },
    {
        path: '/',
        Component: AuthLayout,
        children: [
            {
                path: 'login',
                Component: Login
            },
            {
                path: 'register',
                Component: Register
            }
        ]
    },
    {
        path:'/dashboard',
        element:<PrivateRoute><Dashboard></Dashboard></PrivateRoute>,
        children:[
            {
                index:true,
                Component:DashboardHome
            },
            {
                path:'profile',
                Component:Profile
            },

            // vendor only routes
            {
                path:'add-tickets',
                element:<VendorRoute><AddTickets></AddTickets></VendorRoute>
            },
            {
                path:'my-added-tickets',
                element:<VendorRoute><MyAddedTickets></MyAddedTickets></VendorRoute>
            },
            {
                path:'requested-bookings',
                element:<VendorRoute><RequestedBookings></RequestedBookings></VendorRoute>
            },
            {
                path:'revenue-overview',
                element:<VendorRoute><RevenueOverview></RevenueOverview></VendorRoute>
            },
            
            // admin only routes
            {
                path:'manage-tickets',
                element:<AdminRoute><ManageTickets></ManageTickets></AdminRoute>
            },
            {
                path:'advertise-tickets',
                element:<AdminRoute><AdvertiseTickets></AdvertiseTickets></AdminRoute>
            },
            {
                path:'manage-users',
                element:<AdminRoute><ManageUsers></ManageUsers></AdminRoute>
            }
        ]

    },
    {
        path: '/*',
        Component: Error
    }

])