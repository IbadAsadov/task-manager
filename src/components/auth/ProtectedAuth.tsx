import { FC, memo } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { getUserFromLocalStorage } from "../../helpers/localstorage";

interface IProtectedAuthComponentProps {
    children: React.ReactNode;
}

const ProtectedAuthComponent: FC<IProtectedAuthComponentProps> = ({ children }) => {
    const location = useLocation();

    const protectedRoutes: string[] = ["/login", "/register"];

    if (getUserFromLocalStorage() && protectedRoutes.includes(location.pathname)) {
        return <Navigate to="/dashboard" />;
    }

    return children;
};

const ProtectedAuth = memo(ProtectedAuthComponent);

export default ProtectedAuth;
