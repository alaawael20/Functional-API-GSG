import { PATHS } from "./paths";
import { Navigate, Outlet } from "react-router-dom";
import StoresPage from './../pages/StoresPage/index';
import StorePage from "../pages/StorePage";
import EditStorePage from "../pages/EditStorePage";
import CreateStorePage from './../pages/CreateStorePage/index';
import HomePage from './../pages/HomePage/index';
import { H1 } from "../components/Typography";
import AboutUs from "../pages/About";
import CodeInput from './../pages/CodeInput/index';

const routes = [
    {
        index: true,
        element:<HomePage />
    },
    {
        path: PATHS.STORES.ROOT,
        element: <Outlet />,
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
    {
        path: "/about",
        element: <AboutUs />,
    },
    {
        path: "/codeInput",
        element: <CodeInput />,
    },
    {
        path: PATHS.ERRORS.NOT_FOUND,
        element: <H1>Page not found 404</H1>,
    },
    {
        path: '*',
        element: <Navigate to={PATHS.ERRORS.NOT_FOUND} replace={true} />,
    },
];

export { routes };