import { createBrowserRouter, RouteObject } from "react-router-dom";
import LoginPage from "../pages/auth/LoginPage";
import RegisterPage from "../pages/auth/RegisterPage";
import Error from "../pages/error/Error";
import UserListPage from "../pages/users/UserListPage";
import OrganizationListPage from "../pages/organizations/OrganizationListPage";
import TaskListPage from "../pages/tasks/TaskListPage";
import ProtectedAuth from "../components/auth/ProtectedAuth";
import ProtectedRoute from "../components/auth/ProtectedRoute";
import { Roles } from "../types";
import RootPage from "../pages/account/RootPage";
import UserCreatePage from "../pages/users/UserCreatePage";
import TaskCreatePage from "../pages/tasks/TaskCreatePage";

const routes: RouteObject[] = [
    {
        path: "login",
        element: (
            <ProtectedAuth>
                <LoginPage />
            </ProtectedAuth>
        ),
    },
    {
        path: "register",
        element: (
            <ProtectedAuth>
                <RegisterPage />
            </ProtectedAuth>
        ),
    },
    {
        path: "dashboard",
        element: (
            <ProtectedRoute allowedRoles={[Roles.admin, Roles.organization, Roles.user]}>
                <RootPage />
            </ProtectedRoute>
        ),
        children: [
            {
                path: "organizations",
                element: (
                    <ProtectedRoute allowedRoles={[Roles.admin]}>
                        <OrganizationListPage />
                    </ProtectedRoute>
                ),
            },
            {
                path: "users",
                element: (
                    <ProtectedRoute allowedRoles={[Roles.admin, Roles.organization]}>
                        <UserListPage />
                    </ProtectedRoute>
                ),
            },
            {
                path: "users/create",
                element: (
                    <ProtectedRoute allowedRoles={[Roles.admin]}>
                        <UserCreatePage />
                    </ProtectedRoute>
                ),
            },
            {
                path: "tasks",
                element: (
                    <ProtectedRoute allowedRoles={[Roles.admin, Roles.organization, Roles.user]}>
                        <TaskListPage />
                    </ProtectedRoute>
                ),
            },
            {
                path: "tasks/create",
                element: (
                    <ProtectedRoute allowedRoles={[Roles.admin, Roles.organization, Roles.user]}>
                        <TaskCreatePage />
                    </ProtectedRoute>
                ),
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
