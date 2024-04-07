import { getOrders } from "@/services/orders";
import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export interface OrderType {
  item_code: string;
  name: string;
  email: string;
  no_hp: "";
  address: "";
  price: number | null;
  description: string | null;
  status: string;
  created_at: string | number;
  updated_at: string | number;
}

export interface PaginationType {
  limit: number;
  total: number;
  page: number;
}

export const handlePageOrderFinished = createAsyncThunk<
  {
    data: OrderType[];
    pagination: PaginationType;
  },
  {
    token: string;
    page: number;
    search?: string;
    limit?: number;
  }
>(
  "orders/handlePageOrderFinished",
  async ({
    token,
    page,
    limit,
    search = "",
  }: {
    token: string;
    page: number;
    search?: string;
    limit?: number;
  }) => {
    const response = await getOrders({
      token,
      page,
      limit,
      status: "isFinished",
      search,
    }).catch((e) => {
      throw e;
    });

    return {
      data: (response.data as OrderType[]) || [],
      pagination: response.pagination as PaginationType,
    };
  }
);

export const handlePageOrderUnfinished = createAsyncThunk<
  {
    data: OrderType[];
    pagination: PaginationType;
  },
  {
    page: number;
    search?: string;
    limit?: number;
    token: string;
  }
>(
  "orders/handlePageOrderUnfinished",
  async ({
    page,
    search = "",
    limit,
    token,
  }: {
    page: number;
    limit?: number;
    search?: string;
    token: string;
  }) => {
    const response = await getOrders({
      token,
      page,
      limit,
      status: "isProcess",
      search,
    }).catch((e) => {
      throw e;
    });

    return {
      data: (response.data as OrderType[]) || [],
      pagination: response.pagination as PaginationType,
    };
  }
);

const initialState: {
  ordersFinished: {
    data: OrderType[];
    pagination: PaginationType;
    loading: boolean;
  };
  ordersUnfinished: {
    data: OrderType[];
    pagination: PaginationType;
    loading: boolean;
  };
  ordersItemLoading: boolean;
} = {
  ordersFinished: {
    data: [],
    pagination: {
      limit: 5,
      total: 1,
      page: 1,
    },
    loading: true,
  },
  ordersUnfinished: {
    data: [],
    pagination: {
      limit: 5,
      total: 1,
      page: 1,
    },
    loading: true,
  },
  ordersItemLoading: false,
};

const ordersSlice = createSlice({
  name: "orders",
  initialState,
  reducers: {
    changePage(state, action: PayloadAction<number>) {
      state.ordersFinished.pagination.page = action.payload;
      state.ordersUnfinished.pagination.page = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(handlePageOrderFinished.pending, (state) => {
        state.ordersItemLoading = true;
      })
      .addCase(
        handlePageOrderFinished.fulfilled,
        (
          state,
          action: PayloadAction<{
            data: OrderType[];
            pagination: PaginationType;
          }>
        ) => {
          state.ordersFinished.data = action.payload.data;
          state.ordersFinished.pagination = action.payload.pagination;
          state.ordersFinished.loading = false;
        }
      )
      .addCase(handlePageOrderFinished.rejected, (state) => {
        state.ordersFinished.loading = false;
      })
      .addCase(
        handlePageOrderUnfinished.fulfilled,
        (
          state,
          action: PayloadAction<{
            data: OrderType[];
            pagination: PaginationType;
          }>
        ) => {
          state.ordersUnfinished.data = action.payload.data;
          state.ordersUnfinished.pagination = action.payload.pagination;
          state.ordersUnfinished.loading = false;
          state.ordersItemLoading = false;
        }
      )
      .addCase(handlePageOrderUnfinished.rejected, (state) => {
        state.ordersUnfinished.loading = false;
        state.ordersItemLoading = false;
      });
  },
});

export const { changePage } = ordersSlice.actions;

export default ordersSlice.reducer;
