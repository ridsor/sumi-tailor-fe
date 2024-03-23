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
    const response = await fetch(
      (process.env.NEXT_PUBLIC_API_URL as string) + "/api/auth/me",
      {
        method: "GET",
        credentials: "include",
        cache: "no-store",
      }
    ).catch((err) => {
      throw err;
    });

    if (response.status != 200) {
      throw new Error("Failed to fetch");
    }

    const user = await response.json();

    return user.data;
  }
);

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) =>
    builder.addCase(getUser.fulfilled, (state, action: PayloadAction<User>) => {
      state.id = action.payload.id;
      state.name = action.payload.name;
      state.email = action.payload.email;
      state.image = action.payload.image;
      state.role = action.payload.role;
    }),
});

export default userSlice.reducer;
