import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { OrderType, PaginationType } from "./ordersSlice";
import { getOrderHistory } from "@/services/orders";

export type OrderHistory = OrderType & { description: string };

interface initialState {
  orders: {
    data: OrderHistory[];
    pagination: PaginationType;
    loading: boolean;
  };
}

const initialState: initialState = {
  orders: {
    data: [],
    pagination: {
      limit: 8,
      total: 1,
    },
    loading: true,
  },
};

export const handlePageOrderHistory = createAsyncThunk<
  {
    data: OrderHistory[];
    pagination: PaginationType;
  },
  {
    page: number;
    search?: string;
    limit?: number;
  }
>(
  "handlePage/orderHistory",
  async ({
    page,
    search = "",
    limit,
  }: {
    page: number;
    search?: string;
    limit?: number;
  }) => {
    const orders = await getOrderHistory({
      page,
      limit,
      status: "isProcess",
      search,
    }).catch((e) => {
      throw e;
    });

    return {
      data: (orders.data as OrderHistory[]) || [],
      pagination: orders.pagination as PaginationType,
    };
  }
);

const orderHistorySlice = createSlice({
  name: "order history",
  initialState,
  reducers: {
    changePage(state, action: PayloadAction<number>) {
      state.orders.pagination.page = action.payload;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(handlePageOrderHistory.pending, (state) => {
        state.orders.loading = true;
      })
      .addCase(
        handlePageOrderHistory.fulfilled,
        (
          state,
          action: PayloadAction<{
            data: OrderHistory[];
            pagination: PaginationType;
          }>
        ) => {
          state.orders.data = action.payload.data;
          state.orders.pagination = action.payload.pagination;
          state.orders.loading = false;
        }
      )
      .addCase(handlePageOrderHistory.rejected, (state) => {
        state.orders.loading = false;
      });
  },
});

export const { changePage } = orderHistorySlice.actions;

export default orderHistorySlice.reducer;
