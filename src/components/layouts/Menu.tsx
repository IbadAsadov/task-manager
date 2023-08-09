import { FC, memo } from "react";
import { useNavigate } from "react-router-dom";
import { Menu } from "antd";
import { UnorderedListOutlined } from "@ant-design/icons";
import type { MenuProps } from "antd";

const AppMenuComponent: FC = () => {
    const navigate = useNavigate();
    const handleLinkClick: MenuProps["onClick"] = (e) => {
        navigate(e.key.toString());
    };

    const items = [
        {
            key: "/organizations",
            icon: <UnorderedListOutlined />,
            label: "Organizations",
            onClick: handleLinkClick,
        },
        {
            key: "/users",
            icon: <UnorderedListOutlined />,
            label: "Users",
            onClick: handleLinkClick,
        },
        {
            key: "/tasks",
            icon: <UnorderedListOutlined />,
            label: "Tasks",
            onClick: handleLinkClick,
        },
    ];

    return <Menu theme="dark" mode="inline" defaultSelectedKeys={["1"]} items={items} />;
};


const AppMenu = memo(AppMenuComponent);

export default AppMenu;
