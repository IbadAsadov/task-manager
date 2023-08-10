import { IUser } from "../types";

const setUserInLocalStorage = (user: IUser): void => {
    localStorage.setItem("user", JSON.stringify(user));
};

const getUserFromLocalStorage = (): IUser | null => {
   const user = localStorage.getItem("user");
  
   return user ? JSON.parse(user) : null;
};

const removeUserFromLocalStorage = (): void => {
    localStorage.removeItem("user");
};

export { setUserInLocalStorage, getUserFromLocalStorage, removeUserFromLocalStorage };
