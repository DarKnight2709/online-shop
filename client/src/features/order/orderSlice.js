import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Async thunk để load đơn hàng theo userId
export const loadOrders = createAsyncThunk(
  'orders/loadOrders',
  async (userId) => {
    try {
      const endpoint = `http://localhost:5000/api/user/${userId}/orders/`;
      const response = await fetch(endpoint, {
        method: 'GET',
        credentials: 'include',
      });
      if (response.ok) {
        const jsonResponse = await response.json();
        return jsonResponse;
      } else {
        throw new Error('Failed to load orders');
      }
    } catch (e) {
      console.error('Error fetching orders:', e);
      throw e;
    }
  }
);

export const orderSlice = createSlice({
  name: 'orders',
  initialState: {
    orders: [],         // Danh sách đơn hàng
    isLoadingOrders: false,
    failedLoadingOrders: false,
  },
  reducers: {
    clearOrders: (state) => {
      state.orders = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loadOrders.pending, (state) => {
        state.isLoadingOrders = true;
        state.failedLoadingOrders = false;
      })
      .addCase(loadOrders.fulfilled, (state, action) => {
        state.isLoadingOrders = false;
        state.failedLoadingOrders = false;
        state.orders = action.payload;
      })
      .addCase(loadOrders.rejected, (state) => {
        state.isLoadingOrders = false;
        state.failedLoadingOrders = true;
      });
  },
});

export const { clearOrders } = orderSlice.actions;

// Selectors
export const selectOrders = (state) => state.orders.orders;
export const isLoadingOrders = (state) => state.orders.isLoadingOrders;
export const failedLoadingOrders = (state) => state.orders.failedLoadingOrders;

export default orderSlice.reducer;
