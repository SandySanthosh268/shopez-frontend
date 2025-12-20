import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { createOrderApi, fetchMyOrdersApi } from './orderService';

/* ================================
   CREATE ORDER (Checkout)
================================ */
export const createOrder = createAsyncThunk('order/create', async (orderData, thunkAPI) => {
  try {
    return await createOrderApi(orderData);
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response?.data?.message || 'Order creation failed');
  }
});

/* ================================
   FETCH MY ORDERS (Order History)
================================ */
export const fetchMyOrders = createAsyncThunk('order/myOrders', async (_, thunkAPI) => {
  try {
    return await fetchMyOrdersApi();
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response?.data?.message || 'Failed to fetch orders');
  }
});

/* ================================
   ORDER SLICE
================================ */
const orderSlice = createSlice({
  name: 'order',
  initialState: {
    loading: false,
    success: false,
    error: null,

    order: null, // single order (after checkout)
    orders: [], // order history (my orders)
  },
  reducers: {
    resetOrder: (state) => {
      state.loading = false;
      state.success = false;
      state.error = null;
      state.order = null;
    },
  },
  extraReducers: (builder) => {
    builder
      /* ---------- CREATE ORDER ---------- */
      .addCase(createOrder.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createOrder.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.order = action.payload;
      })
      .addCase(createOrder.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      /* ---------- FETCH MY ORDERS ---------- */
      .addCase(fetchMyOrders.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchMyOrders.fulfilled, (state, action) => {
        state.loading = false;
        state.orders = action.payload;
      })
      .addCase(fetchMyOrders.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { resetOrder } = orderSlice.actions;
export default orderSlice.reducer;
