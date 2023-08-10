import { FC, useState, memo } from "react";
import { Layout, Button, theme } from "antd";
import AppMenu from "./Menu";
import { MenuUnfoldOutlined, MenuFoldOutlined, LogoutOutlined } from "@ant-design/icons";
import { logout } from "../../helpers/logout";
import { IUser } from "../../types";
import { useSelector } from "react-redux";
import { RootState } from "../../store";

const { Header, Footer, Sider, Content } = Layout;

interface LayoutProps {
    children: React.ReactNode;
}

const AppLayoutComponent: FC<LayoutProps> = ({ children }) => {
    const [collapsed, setCollapsed] = useState(false);
    const user: IUser = useSelector((state: RootState) => state.auth.user);

    const {
        token: { colorBgContainer },
    } = theme.useToken();

    return (
        <>
            <Layout style={{ minHeight: "100vh" }}>
                <div className="demo-logo-vertical" />
                <Sider trigger={null} collapsible collapsed={collapsed}>
                    <AppMenu />
                </Sider>
                <Layout>
                    <Header style={{ padding: 0, background: colorBgContainer }}>
                        <Button
                            type="text"
                            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
                            onClick={() => setCollapsed(!collapsed)}
                            style={{
                                fontSize: "16px",
                                width: 64,
                                height: 64,
                            }}
                        />
                        <Button
                            type="text"
                            style={{ fontSize: "16px", width: 64, height: 64, float: "right" }}
                            icon={<LogoutOutlined />}
                            onClick={logout}
                        />
                        <span style={{ fontSize: "16px", marginLeft: 16, float: "right", marginRight: "30px" }}>
                            {user.name} {user.surname}
                        </span>
                    </Header>
                    <Content
                        style={{
                            margin: "24px 16px",
                            padding: 24,
                            minHeight: 280,
                            background: colorBgContainer,
                        }}
                    >
                        {children}
                    </Content>
                    <Footer style={{ textAlign: "center" }}>Task manager created by Ibad Asadov</Footer>
                </Layout>
            </Layout>
        </>
    );
};

const AppLayout = memo(AppLayoutComponent);

export default AppLayout;
