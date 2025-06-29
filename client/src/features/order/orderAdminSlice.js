
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const loadOrders = createAsyncThunk("ordersAdmin/loadOrders", async (userId) => {
  try {
    console.log(userId);
      const endpoint = `http://localhost:5000/api/user/${userId}/orders/details`;
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
});

const orderSlice = createSlice({
  name: "ordersAdmin",
  initialState: {
    list: [],
    loading: false,
    selectedOrder: null,
  },
  reducers: {
    selectOrder: (state, action) => {
      state.selectedOrder = action.payload;
    },
    clearSelectedOrder: (state) => {
      state.selectedOrder = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loadOrders.pending, (state) => {
        state.loading = true;
      })
      .addCase(loadOrders.fulfilled, (state, action) => {
        state.list = action.payload;
        state.loading = false;
      })
      .addCase(loadOrders.rejected, (state) => {
        state.loading = false;
      });
  },
});

export const { selectOrder, clearSelectedOrder } = orderSlice.actions;

export const selectOrders = (state) => state.ordersAdmin.list;
export const selectLoading = (state) => state.ordersAdmin.loading;
export const selectCurrentOrder = (state) => state.ordersAdmin.selectedOrder;

export default orderSlice.reducer;
