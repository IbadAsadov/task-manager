import { Col, Row, Typography, Button, Form, Input, message } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { createOrganization } from "../../services/organizationService";
import { createUser, getUsers } from "../../services/userServices";
import { IOrganization, IOrganizationData, IUser, IUserData, Roles } from "../../types";

interface IRegisterData {
    organization_name: string;
    phone: string;
    address: string;
    name: string;
    surname: string;
    email: string;
    password: string;
}

const RegisterPage = () => {
    const navigate = useNavigate();
    const onFinish = async (values: IRegisterData) => {
        try {
            //check email
            const checkUsers = await getUsers({ email: values.email });

            if (checkUsers.length > 0) {
                message.error("Email already exists.");
                return;
            }

            //create organization
            const organizationData: IOrganizationData = {
                organization_name: values.organization_name,
                phone: values.phone,
                address: values.address,
            };
            const organization: IOrganization = await createOrganization(organizationData);

            //create user
            const userData: IUserData = {
                name: values.name,
                surname: values.surname,
                email: values.email,
                password: values.password,
                organizationId: organization.id,
                role: Roles.organization,
            };
            await createUser(userData);

            message.success("Registration successfully");
            navigate("/login");
        } catch (error) {
            message.error("Registration failed");
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
                            name="organization_name"
                            rules={[
                                { required: true, message: "Please input your Organization name!" },
                                { min: 4, message: "Must be minimum 4 characters" },
                            ]}
                        >
                            <Input placeholder="Organization name" />
                        </Form.Item>
                        <Form.Item
                            name="phone"
                            rules={[
                                { required: true, message: "Please input your Organization phone!" },
                                {
                                    pattern: new RegExp("^[0-9]{10}$"),
                                    message: "Enter a valid phone number - 0502221144",
                                },
                            ]}
                        >
                            <Input placeholder="Organization phone - 0502221144" />
                        </Form.Item>
                        <Form.Item
                            name="address"
                            rules={[
                                { required: true, message: "Please input your Organization address!" },
                                { min: 4, message: "Must be minimum 4 characters" },
                            ]}
                        >
                            <Input placeholder="Organization address" />
                        </Form.Item>

                        <Form.Item
                            name="name"
                            rules={[
                                { required: true, message: "Please input your name" },
                                { min: 4, message: "Must be minimum 4 characters" },
                            ]}
                        >
                            <Input placeholder="Your name" />
                        </Form.Item>
                        <Form.Item
                            name="surname"
                            rules={[
                                { required: true, message: "Please input your surname" },
                                { min: 4, message: "Must be minimum 4 characters" },
                            ]}
                        >
                            <Input placeholder="Your surname" />
                        </Form.Item>
                        <Form.Item
                            name="email"
                            rules={[
                                { required: true, message: "Please input your Email!" },
                                { type: "email", message: "Enter a valid email address" },
                            ]}
                        >
                            <Input placeholder="Email" />
                        </Form.Item>
                        <Form.Item
                            name="password"
                            rules={[
                                { required: true, message: "Please input your Password!" },
                                { min: 6, message: "Password must be minimum 6 characters" },
                            ]}
                        >
                            <Input type="password" placeholder="Password" />
                        </Form.Item>

                        <Form.Item>
                            <Button type="primary" htmlType="submit" style={{ width: "100%" }}>
                                Register
                            </Button>{" "}
                            <Typography.Paragraph style={{ textAlign: "center" }}>
                                <Link to="/login">Login!</Link>
                            </Typography.Paragraph>
                        </Form.Item>
                    </Form>
                </Col>
            </Row>
        </>
    );
};

export default RegisterPage;
