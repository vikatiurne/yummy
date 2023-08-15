import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import GetServices from '../../services/GetServices';

const initialState = {
  category: [],
  categoryId: null,
  subcategory: [],
  subcategoryId: null,
  prodacts: [],
  prodact: [],
  count: null,
  limit: 8,
  page: 1,
};

export const fetchGetCategory = createAsyncThunk(
  'admin/fetchGetCategory',
  async () => await GetServices.getCategories()
);
export const fetchGetSubcategory = createAsyncThunk(
  'admin/fetchGetSubcategory',
  async () => await GetServices.getSubcategories()
);
export const fetchGetAllProdact = createAsyncThunk(
  'admin/fetchGetAllProdact',
  async ({categoryId, subcategoryId, page, limit}) =>
    await GetServices.getAllProdacts(categoryId, subcategoryId, page, limit)
);

const HomeSlice = createSlice({
  name: 'home',
  initialState,
  reducers: {
    selectedCategory: {
      reducer(state, { payload }) {
        state.categoryId = payload;
      },
    },
    selectedSubcategory: {
      reducer(state, { payload }) {
        state.subcategoryId = payload;
      },
    },
    selectedLimit: {
      reducer(state, { payload }) {
        state.limit = payload;
      },
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchGetCategory.fulfilled, (state, { payload }) => {
        state.category = payload.data;
      })
      .addCase(fetchGetSubcategory.fulfilled, (state, { payload }) => {
        state.subcategory = payload.data;
      })
      .addCase(fetchGetAllProdact.fulfilled, (state, { payload }) => {
        state.prodacts = payload.data.rows;
        state.count = payload.data.count;
      });
  },
});

export const { selectedCategory, selectedSubcategory, selectedLimit } =
  HomeSlice.actions;
export default HomeSlice.reducer;
