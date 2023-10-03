import { createSlice } from '@reduxjs/toolkit';

const initialState = { order: [] };

const BasketSlice = createSlice({
  name: 'basket',
  initialState,
  reducers: {
    formOrder(state, { payload }) {
      const { img, name, price, prodactId, unit } = payload;
      if (!!state.order.length) {
        const arr = state.order.filter((item) => item.prodactId === prodactId);
        if (!arr.length) {
          state.order.push(payload);
        } else {
          const updateNum = arr[0].num + payload.num;

          const updateOrder = state.order.map((item) =>
            item.prodactId === prodactId
              ? { img, name, price, prodactId, num: updateNum, unit }
              : item
          );
          state.order = updateOrder;
        }
      } else {
        state.order.push(payload);
      }
    },
    updateOrder(state, { payload }) {
      const { prodactId, increase } = payload;
      const arr = state.order.filter((item) => item.prodactId === prodactId);
      let updateNum;
      increase
        ? (updateNum = arr[0].num + 1)
        : arr[0].minOrder < arr[0].num
        ? (updateNum = arr[0].num - 1)
        : (updateNum = arr[0].num);

      const updatedOrder = state.order.map((item) =>
        item.prodactId === prodactId ? { ...item, num: updateNum } : item
      );
      state.order = updatedOrder;
    },
    deleteProdact(state, {payload}) {
        const { prodactId } = payload;
        const updatedOrder = state.order.filter((item) => item.prodactId !== prodactId);
        state.order = updatedOrder  
    }
  },
});

export const { formOrder, updateOrder, deleteProdact } = BasketSlice.actions;

export default BasketSlice.reducer;
