import { FC, memo } from "react";
import { Role } from "../../types";

interface IAuthorizedComponentProps {
    allowedRoles: Role[];
    children: React.ReactNode;
}

const AuthorizedComponent: FC<IAuthorizedComponentProps> = ({ allowedRoles, children }) => {
    if (allowedRoles.includes(userRole)) {
        return children;
    }
};

const Authorized = memo(AuthorizedComponent);

export default Authorized;
