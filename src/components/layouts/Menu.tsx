import { FC, memo } from "react";
import { useNavigate } from "react-router-dom";
import { Menu } from "antd";
import { IUser, Role, Roles } from "../../types";
import type { MenuProps } from "antd";
import { UnorderedListOutlined } from "@ant-design/icons";
import { useSelector } from "react-redux";
import { RootState } from "../../store";

const AppMenuComponent: FC = () => {
    const navigate = useNavigate();
    const handleLinkClick: MenuProps["onClick"] = (e) => {
        navigate(e.key.toString());
    };
    const user: IUser = useSelector((state: RootState) => state.auth.user);

    const links: Record<Role, any[]> = {
        [Roles.admin]: [
            {
                key: "/dashboard/organizations",
                icon: <UnorderedListOutlined />,
                label: "Organizations",
                onClick: handleLinkClick,
            },
            {
                key: "/dashboard/users",
                icon: <UnorderedListOutlined />,
                label: "Users",
                onClick: handleLinkClick,
            },
            {
                key: "/dashboard/tasks",
                icon: <UnorderedListOutlined />,
                label: "Tasks",
                onClick: handleLinkClick,
            },
        ],
        [Roles.organization]: [
            {
                key: "/dashboard/users",
                icon: <UnorderedListOutlined />,
                label: "Users",
                onClick: handleLinkClick,
            },
            {
                key: "/dashboard/tasks",
                icon: <UnorderedListOutlined />,
                label: "Tasks",
                onClick: handleLinkClick,
            },
        ],
        [Roles.user]: [
            {
                key: "/dashboard/tasks",
                icon: <UnorderedListOutlined />,
                label: "Tasks",
                onClick: handleLinkClick,
            },
        ],
    };

    return <Menu theme="dark" mode="inline" defaultSelectedKeys={["1"]} items={links[user?.role]} />;
};

const AppMenu = memo(AppMenuComponent);

export default AppMenu;
