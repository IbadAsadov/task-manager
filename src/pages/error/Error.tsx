import { Result } from "antd";
import { FC } from "react";

interface ErrorProps {
    status: 403 | 404 | 500 | "403" | "404" | "500";
    title: string;
    subTitle: string;
    extra?: JSX.Element;
}

const Error: FC<ErrorProps> = (props) => {
    return <Result status={props.status} title={props.title} subTitle={props.subTitle} extra={props.extra} />;
};

export default Error;
