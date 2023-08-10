import { FC, useState, useEffect, memo } from "react";
import { Button, Space, Table, message } from "antd";
import type { ColumnsType } from "antd/es/table";
import { IOrganization } from "../../types";
import { getOrganizations, removeOrganization } from "../../services/organizationService";

const OrganizationListP: FC = () => {
    const [data, setData] = useState<IOrganization[]>([]);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        const response = await getOrganizations();
        setData(response.data);
    };

    const handleDelete = async (id: number) => {
        try {
            await removeOrganization(id);
            message.success("Organization deleted successfully");
            await fetchData();
        } catch (error) {
            console.log(error);
        }
    };

    const columns: ColumnsType<IOrganization> = [
        {
            title: "Id",
            dataIndex: "id",
            key: "id",
        },
        {
            title: "Name",
            dataIndex: "organization_name",
            key: "organization_name",
        },
        {
            title: "Phone",
            dataIndex: "phone",
            key: "phone",
        },
        {
            title: "Address",
            dataIndex: "address",
            key: "address",
        },
        {
            title: "Action",
            key: "action",
            render: (_, record) => (
                <Space size="middle">
                    <Button type="primary" onClick={() => handleDelete(record.id)}>
                        Delete
                    </Button>
                </Space>
            ),
        },
    ];

    return <Table columns={columns} dataSource={data} rowKey="id" />;
};

const OrganizationListPage = memo(OrganizationListP);

export default OrganizationListPage;
