import { FC, useState, useEffect } from "react";
import { Button, Select, Space, Table, Tooltip, message } from "antd";
import { useNavigate } from "react-router-dom";
import { ITask, ITaskData, IUser, Roles, TaskStatus, TaskStatuses } from "../../types";
import { RootState } from "../../store";
import { useSelector } from "react-redux";
import { ColumnsType } from "antd/es/table";
import { getTasks, removeTask, updateTask } from "../../services/taskService";
import Authorized from "../../components/auth/Authorized";

const TaskListPage: FC = () => {
    const navigate = useNavigate();
    const user: IUser | null = useSelector((state: RootState) => state.auth.user);
    const [data, setData] = useState<ITask[]>([]);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        const query_params: Record<string, string | number> = {
            "_expand": "organization",
            "_sort": "id",
            "_order": "desc",
        };

        if (user) {
            if (user.role !== Roles.admin) {
                query_params.organizationId = user.organizationId;
            }
        }
        const responseData = await getTasks(query_params);
        setData(responseData);
    };

    const handleCreate = () => {
        navigate("/dashboard/tasks/create");
    };

    const handleDelete = async (id: number) => {
        try {
            await removeTask(id);
            message.success("User deleted successfully");
            await fetchData();
        } catch (error) {
            message.error("Something went wrong");
        }
    };

    const handlechangeStatus = async (id: number, value: TaskStatus) => {
        const task: ITask = data.find((task) => task.id === id);

        if (task) {
            task.status = value;
            try {
                await updateTask(id, task);
                message.success("Status updated successfully");
                await fetchData();
            } catch (error) {
                message.error("Something went wrong");
            }
        }
    };

    const columns: ColumnsType<ITask> = [
        {
            title: "Id",
            dataIndex: "id",
            key: "id",
        },
        {
            title: "Title",
            key: "title",
            dataIndex: "title",
        },
        {
            title: "Description",
            key: "description",
            render: (_, record) => (
                <Space size="middle">
                    <Tooltip title={record.description}>
                        <span>{record.description.substring(0, 10) + "..."}</span>
                    </Tooltip>
                </Space>
            ),
        },
        {
            title: "Deadline",
            key: "deadline",
            render: (_, record) => (
                <Space size="middle">
                    <span>{record.deadline.toString()}</span>
                </Space>
            ),
        },
        {
            title: "Organization",
            key: "organization",
            render: (_, record) => (
                <Space size="middle">
                    <span>{record?.organization?.organization_name}</span>
                </Space>
            ),
        },
        {
            title: "Status",
            key: "status",
            render: (_, record) => {
                if (user?.role === Roles.user) {
                    if (record.userIds.includes(user.id)) {
                        return (
                            <Select
                                placeholder="Select Organization"
                                style={{ width: "100%" }}
                                onChange={(value: string) => handlechangeStatus(record.id, value as TaskStatus)}
                                value={record.status}
                            >
                                {(Object.keys(TaskStatuses) as Array<keyof typeof TaskStatuses>).map((key) => (
                                    <Select.Option key={key} value={TaskStatuses[key]}>
                                        {TaskStatuses[key]}
                                    </Select.Option>
                                ))}
                            </Select>
                        );
                    } else {
                        return <span>{record.status}</span>;
                    }
                } else {
                    return (
                        <Select
                            placeholder="Select Organization"
                            style={{ width: "100%" }}
                            onChange={(value: string) => handlechangeStatus(record.id, value as TaskStatus)}
                            value={record.status}
                        >
                            {(Object.keys(TaskStatuses) as Array<keyof typeof TaskStatuses>).map((key) => (
                                <Select.Option key={key} value={TaskStatuses[key]}>
                                    {TaskStatuses[key]}
                                </Select.Option>
                            ))}
                        </Select>
                    );
                }
            },
        },
        {
            title: "Action",
            key: "action",
            render: (_, record) => (
                <Authorized allowedRoles={[Roles.admin, Roles.organization]}>
                    <Space size="middle">
                        <Button type="primary" onClick={() => handleDelete(record.id)}>
                            Delete
                        </Button>
                    </Space>
                </Authorized>
            ),
        },
    ];

    return (
        <>
            <Button onClick={handleCreate} style={{ float: "right", marginBottom: "30px" }} type="primary">
                Create Task
            </Button>

            <Table columns={columns} dataSource={data} rowKey="id" />
        </>
    );
};

export default TaskListPage;
