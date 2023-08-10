import { FC, memo, useEffect, useState } from "react";
import { Col, Row, Button, Form, Input, message, Select } from "antd";
import { IOption, IOrganization, IUserData, Roles } from "../../types";
import { getOrganizations } from "../../services/organizationService";
import { createUser, getUsers } from "../../services/userServices";
import { useNavigate } from "react-router-dom";

const UserCreate: FC = () => {
    const [organizations, setOrganizations] = useState<IOption[]>([]);
    const navigate = useNavigate();

    useEffect(() => {
        fethcOrganizations();
    }, []);

    const rolesOptions: IOption[] = [
        {
            value: Roles.organization,
            label: Roles.organization,
        },
        {
            value: Roles.user,
            label: Roles.user,
        },
    ];

    const fethcOrganizations = async () => {
        try {
            const data: IOrganization[] = await getOrganizations();
            setOrganizations(data.map((org) => ({ value: org.id, label: org.organization_name })));
        } catch (error) {
            message.error("Error while fetching organizations");
        }
    };

    const onFinish = async (values: IUserData) => {
        try {
            //check email
            const checkUsers = await getUsers({ email: values.email });

            if (checkUsers.length > 0) {
                message.error("Email already exists.");
                return;
            }

            //create user
            await createUser(values);
            message.success("User created successfully");
            navigate("/dashboard/users");
        } catch (error) {
            message.error("Something went wrong while creating user");
        }
    };

    return (
        <>
            <Row justify="center" align="middle" style={{ height: "100%" }}>
                <Col xs={22} sm={18} md={14} lg={10} xl={6}>
                    <Form
                        name="normal_login"
                        className="login-form"
                        initialValues={{ remember: true }}
                        onFinish={onFinish}
                    >
                        <Form.Item
                            name="organizationId"
                            rules={[{ required: true, message: "Please select Organization" }]}
                        >
                            <Select placeholder="Select Organization" style={{ width: "100%" }}>
                                {organizations.map((org) => (
                                    <Select.Option key={org.value} value={org.value}>
                                        {org.label}
                                    </Select.Option>
                                ))}
                            </Select>
                        </Form.Item>
                        <Form.Item name="role" rules={[{ required: true, message: "Please select role" }]}>
                            <Select placeholder="Select Role" style={{ width: "100%" }} options={rolesOptions}>
                                {rolesOptions.map((role) => (
                                    <Select.Option key={role.value} value={role.value}>
                                        {role.label}
                                    </Select.Option>
                                ))}
                            </Select>
                        </Form.Item>
                        <Form.Item
                            name="name"
                            rules={[
                                { required: true, message: "Please input name" },
                                { min: 4, message: "Must be minimum 4 characters" },
                            ]}
                        >
                            <Input placeholder="Name" />
                        </Form.Item>
                        <Form.Item
                            name="surname"
                            rules={[
                                { required: true, message: "Please input surname" },
                                { min: 4, message: "Must be minimum 4 characters" },
                            ]}
                        >
                            <Input placeholder="Surname" />
                        </Form.Item>
                        <Form.Item
                            name="email"
                            rules={[
                                { required: true, message: "Please input User Email!" },
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
                                Create
                            </Button>
                        </Form.Item>
                    </Form>
                </Col>
            </Row>
        </>
    );
};

const UserCreatePage = memo(UserCreate);

export default UserCreatePage;
