import { createBrowserRouter, RouteObject } from "react-router-dom";
import LoginPage from "../pages/auth/LoginPage";
import RegisterPage from "../pages/auth/RegisterPage";
import Error from "../pages/error/Error";
import Rootpage from "../pages/account/RootPage";
import UserListPage from "../pages/users/UserListPage";
import OrganizationListPage from "../pages/organizations/OrganizationListPage";
import TaskListPage from "../pages/tasks/TaskListPage";
import ProtectedAuth from "../components/auth/ProtectedAuth";
import ProtectedRoute from "../components/auth/ProtectedRoute";

const routes: RouteObject[] = [
    {
        path: "/login",
        element: (
            <ProtectedAuth>
                <LoginPage />
            </ProtectedAuth>
        ),
    },
    {
        path: "/register",
        element: (
            <ProtectedAuth>
                <RegisterPage />
            </ProtectedAuth>
        ),
    },
    {
        path: "/account",
        element: <Rootpage />,
        children: [
            {
                path: "users",
                element: (
                    <ProtectedRoute >
                        <UserListPage />
                    </ProtectedRoute>
                ),
            },
            {
                path: "tasks",
                element: <TaskListPage />,
            },
            {
                path: "organizations",
                element: <OrganizationListPage />,
            },
        ],
    },
    {
        path: "*",
        element: <Error status={404} title="404" subTitle="Sorry, the page you visited does not exist." />,
    },
];

const router = createBrowserRouter(routes);

export default router;
