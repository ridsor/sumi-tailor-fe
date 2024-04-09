import { fetchAuth } from "@/services/auth";
import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export type User = {
  id: string;
  name: string;
  email: string;
  image: string;
  role: string;
};

const initialState: User = {
  id: "",
  name: "",
  email: "",
  image: "",
  role: "",
};

export const getUser = createAsyncThunk<User, void>(
  "user/getUser",
  async () => {
    const user = await fetchAuth();
    return user?.data;
  }
);

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    clearUser(state) {
      state.id = initialState.id;
      state.name = initialState.name;
      state.email = initialState.email;
      state.image = initialState.image;
      state.role = initialState.role;
    },
  },
  extraReducers: (builder) =>
    builder.addCase(
      getUser.fulfilled,
      (state, action: PayloadAction<User | undefined>) => {
        if (action.payload) {
          state.id = action.payload.id;
          state.name = action.payload.name;
          state.email = action.payload.email;
          state.image = action.payload.image;
          state.role = action.payload.role;
        }
      }
    ),
});

export const { clearUser } = userSlice.actions;
export default userSlice.reducer;
