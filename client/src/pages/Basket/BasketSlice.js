import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import GetServices from '../../services/GetServices';
import BasketServices from '../../services/BasketServices';

const initialState = {
  order: [],
  status: 'idle',
  err: null,
  prodactsInBasket: [],
};

export const fetchGetBasket = createAsyncThunk(
  'basket/fetchGetBasket',
  async ({ userId }, { rejectWithValue }) => {
    try {
      const response = await GetServices.getBasket(userId);
      return response.data.prodacts;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const fetchAppendProdact = createAsyncThunk(
  'basket/fetchAppendProdact',
  async ({ prodactId, qty, userId }, { rejectWithValue }) => {
    try {
      const response = await BasketServices.append(prodactId, qty, userId);
      return response.data.prodacts;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const fetchIncrement = createAsyncThunk(
  'basket/fetchIncrement',
  async ({ prodactId }, { rejectWithValue }) => {
    try {
      const response = await BasketServices.increment(prodactId);
      return response.data.prodacts;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
export const fetchDecrement = createAsyncThunk(
  'basket/fetchDecrement',
  async ({ prodactId, minOrder }, { rejectWithValue }) => {
    try {
      const response = await BasketServices.decrement(prodactId, minOrder);
      return response.data.prodacts;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
export const fetchUpdate = createAsyncThunk(
  'basket/fetchUpdate',
  async ({ prodactId, minOrder, qty }, { rejectWithValue }) => {
    try {
      const response = await BasketServices.update(prodactId, minOrder, qty);
      return response.data.prodacts;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const BasketSlice = createSlice({
  name: 'basket',
  initialState,

  extraReducers(builder) {
    builder
      .addCase(fetchGetBasket.pending, (state) => {
        state.status = 'loading';
        state.err = null;
      })
      .addCase(fetchGetBasket.fulfilled, (state, { payload }) => {
        state.status = 'success';
        state.order = payload;
      })
      .addCase(fetchGetBasket.rejected, (state, { payload }) => {
        state.status = 'error';
        if (payload && payload.length >= 0) state.err = payload.data.message;
      })
      .addCase(fetchAppendProdact.pending, (state) => {
        state.status = 'loading';
        state.err = null;
      })
      .addCase(fetchAppendProdact.fulfilled, (state, { payload }) => {
        state.status = 'success';
        state.order = payload;
      })
      .addCase(fetchAppendProdact.rejected, (state, { payload }) => {
        state.status = 'error';
        state.err = payload.data.message;
      })
      .addCase(fetchIncrement.pending, (state) => {
        state.status = 'loading';
        state.err = null;
      })
      .addCase(fetchIncrement.fulfilled, (state, { payload }) => {
        state.status = 'success';
        state.order = payload;
      })
      .addCase(fetchIncrement.rejected, (state, { payload }) => {
        state.status = 'error';
        state.err = payload.data.message;
      })
      .addCase(fetchDecrement.pending, (state) => {
        state.status = 'loading';
        state.err = null;
      })
      .addCase(fetchDecrement.fulfilled, (state, { payload }) => {
        state.status = 'success';
        state.order = payload;
      })
      .addCase(fetchDecrement.rejected, (state, { payload }) => {
        state.status = 'error';
        state.err = payload.data.message;
      });
  },

  // reducers: {
  //   formOrder(state, { payload }) {
  //     const { img, name, price, prodactId, unit } = payload;
  //     if (!!state.order.length) {
  //       const arr = state.order.filter((item) => item.prodactId === prodactId);
  //       if (!arr.length) {
  //         state.order.push(payload);
  //       } else {
  //         const updateNum = arr[0].num + payload.num;

  //         const updateOrder = state.order.map((item) =>
  //           item.prodactId === prodactId
  //             ? { img, name, price, prodactId, num: updateNum, unit }
  //             : item
  //         );
  //         state.order = updateOrder;
  //       }
  //     } else {
  //       state.order.push(payload);
  //     }
  //   },
  //   updateOrder(state, { payload }) {
  //     const { prodactId, increase } = payload;
  //     const arr = state.order.filter((item) => item.prodactId === prodactId);
  //     let updateNum;
  //     increase
  //       ? (updateNum = arr[0].num + 1)
  //       : arr[0].minOrder < arr[0].num
  //       ? (updateNum = arr[0].num - 1)
  //       : (updateNum = arr[0].num);

  //     const updatedOrder = state.order.map((item) =>
  //       item.prodactId === prodactId ? { ...item, num: updateNum } : item
  //     );
  //     state.order = updatedOrder;
  //   },
  //   deleteProdact(state, {payload}) {
  //       const { prodactId } = payload;
  //       const updatedOrder = state.order.filter((item) => item.prodactId !== prodactId);
  //       state.order = updatedOrder
  //   }
  // },
});

// export const { putProdactsInBasket } = BasketSlice.actions;

export default BasketSlice.reducer;
