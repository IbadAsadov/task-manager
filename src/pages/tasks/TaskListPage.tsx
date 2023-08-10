import { FC, useState, useEffect } from "react";
import { Button, Space, Table, Tooltip, message } from "antd";
import { useNavigate } from "react-router-dom";
import { ITask, IUser, Roles } from "../../types";
import { RootState } from "../../store";
import { useSelector } from "react-redux";
import { ColumnsType } from "antd/es/table";
import { getTasks, removeTask } from "../../services/taskService";
import Authorized from "../../components/auth/Authorized";

const TaskListPage: FC = () => {
    const navigate = useNavigate();
    const user: IUser | null = useSelector((state: RootState) => state.auth.user);
    const [data, setData] = useState<ITask[]>([]);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        const query_params: Record<string, string | number> = {};

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
    }

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
            title: "Status",
            dataIndex: "status",
            key: "status",
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
