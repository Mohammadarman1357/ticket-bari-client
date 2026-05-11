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
import Profiles from "../pages/Dashboard/Profiles/Profiles";
import VendorRoute from "./VendorRoute";
import AddTickets from "../pages/Dashboard/VendorsPage/AddTickets/AddTickets";
import MyAddedTickets from "../pages/Dashboard/VendorsPage/MyAddedTickets/MyAddedTickets";
import RequestedBookings from "../pages/Dashboard/VendorsPage/RequestedBookings/RequestedBookings";
import RevenueOverview from "../pages/Dashboard/VendorsPage/RevenueOverview/RevenueOverview";
import AdminRoute from "./AdminRoute";
import ManageTickets from "../pages/Dashboard/AdminPage/ManageTickets/ManageTickets";
import AdvertiseTickets from "../pages/Dashboard/AdminPage/AdvertiseTickets/AdvertiseTickets";
import ManageUsers from "../pages/Dashboard/AdminPage/ManageUsers/ManageUsers";
import TransactionHistory from "../pages/Dashboard/TransactionHistory/TransactionHistory";
import MyBookedTickets from "../pages/Dashboard/MyBookedTickets/MyBookedTickets";
import MyProfile from "../pages/MyProfile/MyProfile";
import UpdateTicket from "../pages/Dashboard/VendorsPage/UpdateTicket/UpdateTicket";
import VendorProfiles from "../pages/Dashboard/VendorsPage/VendorProfiles/VendorProfiles";
import AdminProfiles from "../pages/Dashboard/AdminPage/AdminProfiles/AdminProfiles";
import UserProfiles from "../pages/Dashboard/UserProfiles/UserProfiles";
import TicketDetails from "../pages/TicketDetails/TicketDetails";
import Payment from "../pages/Dashboard/Payment/Payment";
import PaymentSuccess from "../pages/Dashboard/Payment/PaymentSuccess";
import PaymentCancelled from "../pages/Dashboard/Payment/PaymentCancelled";



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
                path: 'all-tickets',
                element: <PrivateRoute><AllTickets></AllTickets></PrivateRoute>
            },
            {
                path: 'my-profile',
                Component: MyProfile
            },
            {
                path: 'ticket-details/:id',
                element: <PrivateRoute><TicketDetails></TicketDetails></PrivateRoute>
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
        path: '/dashboard',
        element: <PrivateRoute><Dashboard></Dashboard></PrivateRoute>,
        children: [
            {
                index: true,
                Component: DashboardHome
            },
            {
                path: 'profile',
                Component: Profiles
            },
            {
                path: 'user-profiles',
                Component: UserProfiles
            },
            {
                path: 'transaction-history',
                Component: TransactionHistory
            },
            {
                path: 'my-booked-tickets',
                Component: MyBookedTickets
            },
            {
                path: 'payment/:bookingId',
                Component: Payment
            },
            {
                path: 'payment-success',
                Component: PaymentSuccess
            },
            {
                path: 'payment-cancelled',
                Component: PaymentCancelled
            },

            // vendor only routes
            {
                path: 'add-tickets',
                element: <VendorRoute><AddTickets></AddTickets></VendorRoute>,
                loader: () => fetch('/src/assets/json/busCounter.json').then(res => res.json())
            },
            {
                path: 'vendor-profiles',
                element: <VendorRoute><VendorProfiles></VendorProfiles></VendorRoute>
            },
            {
                path: 'my-added-tickets',
                element: <VendorRoute><MyAddedTickets></MyAddedTickets></VendorRoute>
            },
            {
                path: 'requested-bookings',
                element: <VendorRoute><RequestedBookings></RequestedBookings></VendorRoute>
            },
            {
                path: 'revenue-overview',
                element: <VendorRoute><RevenueOverview></RevenueOverview></VendorRoute>
            },
            {
                path: 'update-ticket/:ticketId',
                element: <VendorRoute><UpdateTicket></UpdateTicket></VendorRoute>,
                loader: () => fetch('/src/assets/json/busCounter.json').then(res => res.json())
            },

            // admin only routes
            {
                path: 'admin-profiles',
                element: <AdminRoute><AdminProfiles></AdminProfiles></AdminRoute>
            },
            {
                path: 'manage-tickets',
                element: <AdminRoute><ManageTickets></ManageTickets></AdminRoute>
            },
            {
                path: 'advertise-tickets',
                element: <AdminRoute><AdvertiseTickets></AdvertiseTickets></AdminRoute>
            },
            {
                path: 'manage-users',
                element: <AdminRoute><ManageUsers></ManageUsers></AdminRoute>
            }
        ]

    },
    {
        path: '/*',
        Component: Error
    }

])