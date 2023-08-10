import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IUser } from "../types";
import { getUser } from "../services/userServices";
import { getUserFromLocalStorage } from "../helpers/localstorage";

interface IAuthSlice {
    user: IUser | null;
}

const initialState: IAuthSlice = {
    user: getUserFromLocalStorage() ? getUserFromLocalStorage() : null,
};
export const fetchInitialUser = createAsyncThunk("auth/fetchInitialUser", async (userId: number) => {
    const response = await getUser(userId);
    return response;
});

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setUser(state, action: PayloadAction<IUser | null>) {
            state.user = action.payload;
        },
        reset(state) {
            state.user = null;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(fetchInitialUser.fulfilled, (state, action) => {
            state.user = action.payload;
        });
        builder.addCase(fetchInitialUser.rejected, (state) => {
            state.user = null;
        });
    },
});

export const { setUser, reset } = authSlice.actions;

export default authSlice.reducer;
