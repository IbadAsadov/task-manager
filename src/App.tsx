import { useEffect } from "react";
import { RouterProvider } from "react-router-dom";
import router from "./routes";
import { getUser } from "./services/userServices";
import { useDispatch } from "react-redux";
import { setUser } from "./store/authSlice";

const App = () => {
    const dispatch = useDispatch();
    const storeUser = async (userId: number) => {
        const response = await getUser(userId);
        dispatch(setUser(response));
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
