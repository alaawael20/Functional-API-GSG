import { PATHS } from "./paths";
import { Navigate } from "react-router-dom";
import HomePage from './../pages/HomePage/index';
import { H1 } from "../components/Typography";
import AdminGuard from './../components/Guards/AdminGuard/index';
import UserGuard from './../components/Guards/UserGuard/index';
import StoresPage from './../pages/StoresPage/index';
import StorePage from './../pages/StorePage/index';
import EditStorePage from './../pages/EditStorePage/index';
import CreateStorePage from './../pages/CreateStorePage/index';
import GuestGuard from './../components/Guards/GuestGuard/index';
import LoginPage from './../pages/LoginPage/index';
import SignUpPage from './../pages/SignUpPage/index';
import AboutUs from "../pages/About";

const adminPages = [
    {
        path: PATHS.ADMIN.ROOT,
        element: <AdminGuard />,
        children: [
            {
                index: true,
                element: <H1>Admin</H1>,
            },
            {
                path: PATHS.ADMIN.USERS,
                element: <H1>Users</H1>,
            },
        ],
    },
];

const userPages = [
    {
        path: PATHS.STORES.ROOT,
        element: <UserGuard />,
        children: [
            {
                index: true,
                element: <StoresPage />,
            },
            {
                path: PATHS.STORES.VIEW,
                element: <StorePage />,
            },
            {
                path: PATHS.STORES.EDIT,
                element: <EditStorePage />,
            },
            {
                path: PATHS.STORES.CREATE,
                element: <CreateStorePage />,
            },
        ],
    },
];

const authPages = [
    {
        path: PATHS.LOGIN,
        element: (
            <GuestGuard>
                <LoginPage />
            </GuestGuard>
        ),
    },
    {
        path: PATHS.SIGNUP,
        element: (
            <GuestGuard>
                <SignUpPage />
            </GuestGuard>
        ),
    },
];

const guestPages = [
    {
        index: true,
        element: (
            <GuestGuard>
                <HomePage />
            </GuestGuard>
        ),
    },
    {
        path: PATHS.ABOUT,
        element: (
            <GuestGuard>
                <AboutUs />
            </GuestGuard>
        ),
    },
    ...authPages,
];

const routes = [
    ...guestPages,
    ...userPages,
    ...adminPages,
    {
        path: PATHS.ERRORS.NOT_FOUND,
        element: <H1>Page not found 404</H1>,
    },
    {
        path: '*',
        element: <Navigate to={PATHS.ERRORS.NOT_FOUND} replace={true} />,
    },
];

export { adminPages, userPages, routes };
