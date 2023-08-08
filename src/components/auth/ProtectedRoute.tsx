import { FC, memo } from "react";
import { Navigate } from "react-router-dom";
import { Role } from "../../types";
import ErrorPage from "../../pages/error/Error";

interface IProtectedRouteComponentProps {
    allowedRoles: Role[];
    userRole: Role;
    children: React.ReactNode;
}

const ProtectedRouteComponent: FC<IProtectedRouteComponentProps> = ({ allowedRoles, userRole, children }) => {
    if (!localStorage.getItem("userId")) {
        return <Navigate to="/login" />;
    }

    if (allowedRoles.includes(userRole)) {
        return children;
    }

    return <ErrorPage status={403} title="403" subTitle="Sorry, you are not authorized to access this page." />;
};

const ProtectedRoute = memo(ProtectedRouteComponent);

export default ProtectedRoute;
