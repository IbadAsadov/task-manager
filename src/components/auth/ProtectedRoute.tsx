import { FC, memo } from "react";
import { Navigate } from "react-router-dom";
import { IUser, Role } from "../../types";
import ErrorPage from "../../pages/error/Error";
import { useSelector } from "react-redux";
import { RootState } from "../../store";

interface IProtectedRouteComponentProps {
    allowedRoles: Role[];
    children: React.ReactNode;
}

const ProtectedRouteComponent: FC<IProtectedRouteComponentProps> = ({ allowedRoles, children }) => {
    const user: IUser | null = useSelector((state: RootState) => state.auth.user);
    const userId: string | null = localStorage.getItem("userId");

    if (!user) {
        return <Navigate to="/login" />;
    }

    if (allowedRoles.includes(user?.role)) {
        return children;
    } 

    return (
        <ErrorPage status={403} title="Not authorized" subTitle="Sorry, you are not authorized to access this page." />
    );
};

const ProtectedRoute = memo(ProtectedRouteComponent);

export default ProtectedRoute;
