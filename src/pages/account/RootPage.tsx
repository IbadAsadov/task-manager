import { FC, memo } from "react";
import { Outlet } from "react-router-dom";
import AppLayout from "../../components/layouts/Layout";

const RootP: FC = () => {
    return (
        <AppLayout>
            <Outlet />
        </AppLayout>
    );
};

const Rootpage = memo(RootP);

export default Rootpage;
