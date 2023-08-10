import { FC } from "react";
import { useDispatch } from "react-redux";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Link, useNavigate } from "react-router-dom";
import { Col, Row, Typography, Button, Form, Input, message } from "antd";
import { AppDispatch } from "../../store";
import { setUser } from "../../store/authSlice";
import { IUser } from "../../types";
import { getUsers } from "../../services/userServices";
import { setUserInLocalStorage } from "../../helpers/localstorage";

interface ILoginData {
    email: string;
    password: string;
}

const LoginPage: FC = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch<AppDispatch>();

    const handleLogin = (user: IUser) => {
        dispatch(setUser(user));

        if (user.id !== undefined) {
           setUserInLocalStorage(user);
        }

        navigate("/dashboard");
    };

    const onFinish = async (values: ILoginData) => {
        try {
            const response = await getUsers({ email: values.email, password: values.password });
            
            if (response.length === 0) {
                message.error("Wrong email or password");
                return;
            }

            const user: IUser = response[0];
            handleLogin(user);
        } catch (err) {
            message.error("Server error");
        }
    };
    return (
        <>
            <Row justify="center" align="middle" style={{ height: "100vh" }}>
                <Col xs={22} sm={18} md={14} lg={10} xl={6}>
                    <Form
                        name="normal_login"
                        className="login-form"
                        initialValues={{ remember: true }}
                        onFinish={onFinish}
                    >
                        <Form.Item
                            name="email"
                            rules={[
                                { required: true, message: "Please input your Email!" },
                                { type: "email", message: "Enter a valid email address" },
                            ]}
                        >
                            <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Email" />
                        </Form.Item>
                        <Form.Item
                            name="password"
                            rules={[
                                { required: true, message: "Please input your Password!" },
                                { min: 6, message: "Password must be minimum 6 characters" },
                            ]}
                        >
                            <Input
                                prefix={<LockOutlined className="site-form-item-icon" />}
                                type="password"
                                placeholder="Password"
                            />
                        </Form.Item>

                        <Form.Item>
                            <Button type="primary" htmlType="submit" style={{ width: "100%" }}>
                                Log in
                            </Button>{" "}
                            <Typography.Paragraph style={{ textAlign: "center" }}>
                                <Link to="/register">Register now!</Link>
                            </Typography.Paragraph>
                        </Form.Item>
                    </Form>
                </Col>
            </Row>
        </>
    );
};

export default LoginPage;
