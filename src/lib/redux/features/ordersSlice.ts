import { getOrders } from "@/services/orders";
import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export interface OrderType {
  item_code: string;
  name: string;
  no_hp: string;
  address: string;
  price: number | null;
  note: string;
  status: string;
  image: string;
  created_at: string;
  updated_at: string;
}

export interface PaginationType {
  limit: number;
  total: number;
  page?: number;
}

export const handlePageOrderFinished = createAsyncThunk<
  {
    data: OrderType[];
    pagination: PaginationType;
  },
  {
    page: number;
    search?: string;
    limit?: number;
  }
>(
  "orders/handlePageOrderFinished",
  async ({
    page,
    limit,
    search = "",
  }: {
    page: number;
    search?: string;
    limit?: number;
  }) => {
    const response = await getOrders({
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
  }
>(
  "orders/handlePageOrderUnfinished",
  async ({
    page,
    search = "",
    limit,
  }: {
    page: number;
    limit?: number;
    search?: string;
  }) => {
    const response = await getOrders({
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
} = {
  ordersFinished: {
    data: [],
    pagination: {
      limit: 8,
      total: 1,
    },
    loading: true,
  },
  ordersUnfinished: {
    data: [],
    pagination: {
      limit: 8,
      total: 1,
    },
    loading: true,
  },
};

const ordersSlice = createSlice({
  name: "orders",
  initialState,
  reducers: {
    changePage(
      state,
      action: PayloadAction<{
        ordersFinished: number;
        ordersUnfinished: number;
      }>
    ) {
      state.ordersFinished.pagination.page = action.payload.ordersFinished;
      state.ordersUnfinished.pagination.page = action.payload.ordersUnfinished;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(handlePageOrderFinished.pending, (state) => {
        state.ordersFinished.loading = true;
      })
      .addCase(handlePageOrderUnfinished.pending, (state) => {
        state.ordersUnfinished.loading = true;
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
        }
      )
      .addCase(handlePageOrderUnfinished.rejected, (state) => {
        state.ordersUnfinished.loading = false;
      });
  },
});

export const { changePage } = ordersSlice.actions;

export default ordersSlice.reducer;
