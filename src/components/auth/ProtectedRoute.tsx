import { FC, memo } from "react";
import { Navigate } from "react-router-dom";
import { IUser, Role } from "../../types";
import ErrorPage from "../../pages/error/Error";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import { Button } from "antd";
import { logout } from "../../helpers/logout";
import { getUserFromLocalStorage } from "../../helpers/localstorage";

interface IProtectedRouteComponentProps {
    allowedRoles: Role[];
    children: React.ReactNode;
}

const ProtectedRouteComponent: FC<IProtectedRouteComponentProps> = ({ allowedRoles, children }) => {
    const user: IUser | null = useSelector((state: RootState) => state.auth.user);
    const userInLocalStorage: IUser | null = getUserFromLocalStorage();

    if (!user && !userInLocalStorage) {
        return <Navigate to="/login" />;
    }

   if (typeof user === "object" && user !== null) {
       if (allowedRoles.includes(user.role)) {
           return children;
       }
   }

    return (
        <ErrorPage
            status={403}
            title="Not authorized"
            subTitle="Sorry, you are not authorized to access this page."
            extra={
                <Button key="back" onClick={logout}>
                    Log out
                </Button>
            }
        />
    );
};

const ProtectedRoute = memo(ProtectedRouteComponent);

export default ProtectedRoute;
