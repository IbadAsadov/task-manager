import { FC } from "react";
import { Typography } from "antd";

const Rootpage: FC = () => {
    return (
        <Typography.Title level={2} style={{ textAlign: "center" }}>
            Welcome to Task Manager
        </Typography.Title>
    );
};

export default Rootpage;
