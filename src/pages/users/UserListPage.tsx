import { FC, useState, useEffect } from "react";
import { IUser, Roles } from "../../types";
import { getUsers, removeUser } from "../../services/userServices";
import Table, { ColumnsType } from "antd/es/table";
import { Button, Space, message } from "antd";
import { useNavigate } from "react-router-dom";
import Authorized from "../../components/auth/Authorized";
import { useSelector } from "react-redux";
import { RootState } from "../../store";

const UserListPage: FC = () => {
    const user: IUser | null = useSelector((state: RootState) => state.auth.user);
    const [data, setData] = useState<IUser[]>([]);
    const navigate = useNavigate();

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        const query_params: Record<string, string | number> = {};

        if (user) {
            if (user.role === Roles.organization) {
                query_params.organizationId = user.organizationId;
            }
        }
        const responseData = await getUsers(query_params);
        setData(responseData);
    };

    const handleDelete = async (id: number) => {
        try {
            await removeUser(id);
            message.success("User deleted successfully");
            await fetchData();
        } catch (error) {
            message.error("Something went wrong");
        }
    };
    const handleCreate = () => {
        navigate("/dashboard/users/create");
    };

    const columns: ColumnsType<IUser> = [
        {
            title: "Id",
            dataIndex: "id",
            key: "id",
        },
        {
            title: "Name",
            dataIndex: "name",
            key: "name",
        },
        {
            title: "Surname",
            dataIndex: "surname",
            key: "surname",
        },
        {
            title: "Role",
            dataIndex: "role",
            key: "role",
        },
        {
            title: "Email",
            dataIndex: "email",
            key: "email",
        },
        {
            title: "Action",
            key: "action",
            render: (_, record) => (
                <Authorized allowedRoles={[Roles.admin]}>
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
            <Authorized allowedRoles={[Roles.admin]}>
                <Button onClick={handleCreate} style={{ float: "right", marginBottom: "30px" }} type="primary">
                    Create User
                </Button>
            </Authorized>
            <Table columns={columns} dataSource={data} rowKey="id" />
        </>
    );
};

export default UserListPage;
