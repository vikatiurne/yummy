import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import AuthServices from '../../services/AuthServices';

const initialState = { user: {}, isAuth: false, status: 'idle' };

export const fetchLogin = createAsyncThunk(
  'auth/fetchLogin',
  async ({ email, password }) => {
    const response = await AuthServices.login(email, password);
    console.log(response)
    return response;
  }
);
export const fetchAutoLogin = createAsyncThunk(
  'auth/fetchAutoLogin',
  async ( token ) => {
    const response = await AuthServices.autoLogin(token);
    console.log(response)
    return response;
  }
);
export const fetchRegistration = createAsyncThunk(
  'auth/fetchRegistration',
  async ({ email, password, name }) => {
    const response = await AuthServices.registration(email, password, name);
    return response;
  }
);
export const fetchLogout = createAsyncThunk('auth/fetchLogout', async () => {
  return await AuthServices.logout();
});

const authSlice = createSlice({
  name: 'auth',
  initialState,
  extraReducers(builder) {
    builder
      .addCase(fetchLogin.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchLogin.fulfilled, (state, { payload }) => {
        state.status = 'success';
        state.isAuth = true;
        state.user = payload.data.user;
        localStorage.setItem('token', payload.data.accessToken);
      })
      .addCase(fetchLogin.rejected, (state) => {
        state.status = 'error';
      })
      .addCase(fetchRegistration.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchRegistration.fulfilled, (state, { payload }) => {
        state.status = 'success';
        state.isAuth = true;
        state.user = payload.data.user;
        localStorage.setItem('token', payload.data.accessToken);
      })
      .addCase(fetchRegistration.rejected, (state) => {
        state.status = 'error';
      })
      .addCase(fetchLogout.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchLogout.fulfilled, (state) => {
        state.status = 'success';
        state.isAuth = false;
        state.user = {};
        localStorage.removeItem('token');
      })
      .addCase(fetchLogout.rejected, (state) => {
        state.status = 'error';
      })
      .addCase(fetchAutoLogin.pending, (state)=>{
        state.status = 'loading';
      })
      .addCase(fetchAutoLogin.fulfilled, (state,{payload})=>{
        state.user = payload.data
        state.isAuth = true
      })
      .addCase(fetchAutoLogin.rejected, (state)=>{
        state.status = 'error';
      })
  },
});


export default authSlice.reducer;
