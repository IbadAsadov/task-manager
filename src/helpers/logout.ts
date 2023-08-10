import { removeUserFromLocalStorage } from "./localstorage";


export const logout  = () => {
    removeUserFromLocalStorage();
    window.location.href = "/login";
};