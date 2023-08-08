import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IUser } from "../types";

interface IAuthSlice {
    user: IUser | null;
}

const initialState: IAuthSlice = {
    user: null,
};

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setUser(state, action: PayloadAction<IUser>) {
            state.user = action.payload;
        },
        reset(state) {
            state.user = null;
        }
    },
});

export const { setUser, reset } = authSlice.actions;

export default authSlice.reducer;
