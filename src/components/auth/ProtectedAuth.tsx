import { FC, memo } from "react";
import { Navigate, useLocation } from "react-router-dom";

interface IProtectedAuthComponentProps {
    children: React.ReactNode;
}

const ProtectedAuthComponent: FC<IProtectedAuthComponentProps> = ({ children }) => {
    const location = useLocation();

    const protectedRoutes: string[] = ["/login", "/register"];

    if (localStorage.getItem("userId") && protectedRoutes.includes(location.pathname)) {
        return <Navigate to="/account" />;
    }

    return children;
};

const ProtectedAuth = memo(ProtectedAuthComponent);

export default ProtectedAuth;
