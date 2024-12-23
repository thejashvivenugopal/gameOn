import { createBrowserRouter } from "react-router";
import UserStats from './components/userStatsPage';
import DashBoard from './components/MainDashboard/DashBoard.tsx';
import LedgerTableProvider from './components/ledgers';
import SignUp from './components/signUp/SignUp.tsx';
import Cart from './components/cart';
import Profile from './components/profile';
import CustomersView from './components/customers';
import CustomerDashBoard from './components/CustomerDashBoard/CustDashBoard.tsx';
import CustomerLedgerTable from "./components/CustomerBookings";
import HomePage from "./components/home/home.tsx";

export const routes = createBrowserRouter([
    {
        path: '/',
        Component: HomePage,
    },
    {
        path: 'dashboard',
        Component: DashBoard,
    },
    {
        path: '/dashboard/transactions',
        Component: LedgerTableProvider,
    },
    {
        path: '/dashboard/profile',
        Component: Profile,
    },
    {
        path: '/dashboard/customers',
        Component: CustomersView,
    },
    {
        path: '/dashboard/customers/bookings',
        Component: CustomerLedgerTable,
    },
    {
        path: '/dashboard/userstats',
        Component: UserStats,
    },
    {
        path: '/dashboard/cart',
        Component: Cart,
    },
    {
        path: '/signup',
        Component: SignUp,
    },
    {
        path: '/customer/dashboard',
        Component: CustomerDashBoard,
    }
]);