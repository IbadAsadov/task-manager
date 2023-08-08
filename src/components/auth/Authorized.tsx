import { FC, memo } from "react";
import { Role } from "../../types";

interface IAuthorizedComponentProps {
    allowedRoles: Role[];
    userRole: Role;
    children: React.ReactNode;
}

const AuthorizedComponent: FC<IAuthorizedComponentProps> = ({ allowedRoles, userRole, children }) => {
    if (allowedRoles.includes(userRole)) {
        return children;
    }
};

const Authorized = memo(AuthorizedComponent);

export default Authorized;
