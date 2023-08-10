import { FC, memo } from "react";
import { IUser, Role } from "../../types";
import { useSelector } from "react-redux";
import { RootState } from "../../store";

interface IAuthorizedComponentProps {
    allowedRoles: Role[];
    children: React.ReactNode;
}

const AuthorizedComponent: FC<IAuthorizedComponentProps> = ({ allowedRoles, children }) => {
    const user: IUser | null = useSelector((state: RootState) => state.auth.user);

    if (user) {
        if (allowedRoles.includes(user.role)) {
            return children;
        }
    }
};

const Authorized = memo(AuthorizedComponent);

export default Authorized;
