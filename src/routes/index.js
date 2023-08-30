import PrivateRoutes from "../components/PrivateRoutes";
import LayoutDefault from "../layout/LayoutDefault";
import Error404 from "../pages/Error404";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Logout from "../pages/Logout";
import Search from "../pages/Search";
import JobDetail from "../pages/JobDetail";
import CompanyDetail from "../pages/CompanyDetail";
import Error from "../pages/Error";
import Company from "../pages/Company";
import LayoutAdmin from "../layout/LayoutAdmin";
import Dashboard from "../pages/Dashboard";
import InfoCompany from "../pages/InfoCompany"
import JobsManager from "../pages/Jobs-Manager"
import CvManager from "../pages/Cv-Manager"
import CreateJob from "../pages/Jobs-Manager/CreateJob";
import JobDetailAdmin from "../pages/JobDetailAdmin";
import CvDetailAdmin from "../pages/CvDetailAdmin";

export const routes = [
    {
        children: [
            {
                path: "/",
                element: <LayoutDefault />,
                children: [
                    {
                        path: "/",
                        element: <Home />,
                    },
                    {
                        path: "login",
                        element: <Login />,
                    },
                    {
                        path: "*",
                        element: <Error404 />,
                    },
                    {
                        path: "logout",
                        element: <Logout />,
                    },
                    {
                        path: "search",
                        element: <Search />
                    },
                    {
                        path: "jobs/:id",
                        element: <JobDetail />
                    },
                    {
                        path: "company/:id",
                        element: <CompanyDetail />
                    },
                    {
                        path: "error",
                        element: <Error />
                    },
                    {
                        path: "company",
                        element: <Company />
                    },
                    {
                        path: "register",
                        element: <Register />
                    }
                ]
            }, {
                element: <PrivateRoutes />,
                children: [
                    {
                        element: <LayoutAdmin />,
                        children:[
                            {
                                path: "/admin",
                                element: <Dashboard />
                            },
                            {
                                path: "/info-company",
                                element: <InfoCompany />
                            },
                            {
                                path: "/jobs-manager",
                                element: <JobsManager />
                            },
                            {
                                path: "/cv-manager",
                                element: <CvManager />
                            },
                            {
                                path: "/create-job",
                                element: <CreateJob />
                            },
                            {
                                path: "/detail-job/:id",
                                element: <JobDetailAdmin />
                            },
                            {
                                path: "/detail-cv/:id",
                                element: <CvDetailAdmin />
                            }
                        ]
                    }
                ]
            }
        ]
    }
];
