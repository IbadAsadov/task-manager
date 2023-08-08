import { FC } from "react";
import AppLayout from "../../components/layouts/Layout";
import { Outlet } from "react-router-dom";

const Rootpage: FC = () => {
    return (
        <AppLayout>
            <Outlet />
        </AppLayout>
    );
};

export default Rootpage;
