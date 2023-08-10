import { useEffect } from "react";
import { RouterProvider } from "react-router-dom";
import router from "./routes";
import { useDispatch } from "react-redux";
import { fetchInitialUser } from "./store/authSlice";
import { AppDispatch } from "./store";
import { IUser } from "./types";
import { getUserFromLocalStorage } from "./helpers/localstorage";

const App = () => {
    const dispatch = useDispatch<AppDispatch>();
    const userInLocalStorage = getUserFromLocalStorage();

    useEffect(() => {
        
        if (userInLocalStorage) {
            const user: IUser = userInLocalStorage;

            if (user.id) dispatch(fetchInitialUser(user.id));
        }

    }, []);

    return (
        <>
            <RouterProvider router={router} />
        </>
    );
};

export default App;
