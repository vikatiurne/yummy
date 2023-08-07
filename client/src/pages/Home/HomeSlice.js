import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import GetServices from '../../services/GetServices';

const initialState = {
  category: [],
  subcategory: [],
  prodacts: [],
  prodact: [],
};

export const fetchGetCategory = createAsyncThunk(
  'admin/fetchGetCategory',
  async () => await GetServices.getCategories()
);
export const fetchGetSubcategory = createAsyncThunk(
  'admin/fetchGetSubcategory',
  async () => await GetServices.getSubcategories()
);

const HomeSlice = createSlice({
  name: 'home',
  initialState,
  extraReducers(builder) {
    builder.addCase(fetchGetCategory.fulfilled, (state, { payload }) => {
      state.category = payload.data;
    })
    .addCase(fetchGetSubcategory.fulfilled, (state, { payload }) => {
      state.subcategory = payload.data;
    })
  },
});

export default HomeSlice.reducer;
