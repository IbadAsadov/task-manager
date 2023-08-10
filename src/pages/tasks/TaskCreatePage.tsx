import { FC, memo, useState, useEffect } from "react";
import { Col, Row, Button, Form, Input, message, Select, DatePicker } from "antd";
import TextArea from "antd/es/input/TextArea";
import { IOption, IOrganization, ITaskData, IUser, Roles, TaskStatus, TaskStatuses } from "../../types";
import { getOrganizations } from "../../services/organizationService";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import { getUsers } from "../../services/userServices";
import { useNavigate } from "react-router-dom";
import { createTask } from "../../services/taskService";

interface IFormValues {
    title: string;
    description: string;
    deadline: string;
    organizationId: number;
    userIds: number[];
}

const TaskCreate: FC = () => {
    const user: IUser = useSelector((state: RootState) => state.auth.user);
    const [organizationOptions, setOrganizationOptions] = useState<IOption[]>([]);
    const [userOptions, setUserOptions] = useState<IOption[]>([]);

    const navigate = useNavigate();

    useEffect(() => {
        fethcOrganizations();
    }, []);

    const fethcOrganizations = async () => {
        try {
            const query_params: Record<string, string | number> = {};

            if (user.role !== Roles.admin) {
                query_params["id"] = user.organizationId;
            }

            const response: IOrganization[] = await getOrganizations(query_params);
            setOrganizationOptions(response.map((org) => ({ value: org.id, label: org.organization_name })));
        } catch (error) {
            message.error("Error while fetching organizations");
        }
    };

    const fethcUsers = async (organizationId: number) => {
        try {
            const query_params: Record<string, string | number> = {
                organizationId,
            };
            const response = await getUsers(query_params);
            setUserOptions(response.map((org) => ({ value: org.id, label: org.name })));
        } catch (error) {
            message.error("Error while fetching users");
        }
    };

    const handeChangeOrganization = async (value: number) => {
        await fethcUsers(value);
    };

    const onFinish = async (values: IFormValues) => {
        try {
            const data: ITaskData = {
                ...values,
                status: TaskStatuses.new,
            };

            //create task
            await createTask(data);
            message.success("User created successfully");
            navigate("/dashboard/tasks");
        } catch (error) {
            message.error("Something went wrong while creating user");
        }
    };

    const config = {
        rules: [{ type: "object" as const, required: true, message: "Please select time" }],
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
                            name="title"
                            rules={[
                                { required: true, message: "Please input title" },
                                { min: 4, message: "Must be minimum 4 characters" },
                            ]}
                        >
                            <Input placeholder="Title" />
                        </Form.Item>
                        <Form.Item name="description" rules={[{ required: true, message: "Please input description" }]}>
                            <TextArea rows={4} placeholder="Description" />
                        </Form.Item>

                        <Form.Item name="deadline" {...config}>
                            <DatePicker
                                placeholder="Select Time"
                                style={{ width: "100%" }}
                                showTime
                                format="YYYY-MM-DD HH:mm:ss"
                            />
                        </Form.Item>

                        <Form.Item
                            name="organizationId"
                            rules={[{ required: true, message: "Please select organization" }]}
                        >
                            <Select
                                placeholder="Select Organization"
                                style={{ width: "100%" }}
                                onChange={handeChangeOrganization}
                            >
                                {organizationOptions.map((org) => (
                                    <Select.Option key={org.value} value={org.value}>
                                        {org.label}
                                    </Select.Option>
                                ))}
                            </Select>
                        </Form.Item>

                        <Form.Item name="userIds" rules={[{ required: true, message: "Please select users" }]}>
                            <Select
                                mode="multiple"
                                allowClear
                                style={{ width: "100%" }}
                                placeholder="Select Users"
                                options={userOptions}
                            />
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

const TaskCreatePage = memo(TaskCreate);

export default TaskCreatePage;
