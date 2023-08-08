import { useEffect } from "react";
import { RouterProvider } from "react-router-dom";
import router from "./routes";
import { getUser } from "./services/userServices";

const App = () => {
    const storeUser = async (userId: number) => {
        const response = await getUser(userId);
        console.log(response);
    };

    useEffect(() => {
        const userId = Number(localStorage.getItem("userId"));
        if (userId) {
            storeUser(userId);
        }
    }, []);

    return (
        <>
            <RouterProvider router={router} />
        </>
    );
};

export default App;
