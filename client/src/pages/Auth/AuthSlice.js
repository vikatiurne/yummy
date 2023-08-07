import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import AuthServices from '../../services/AuthServices';

const initialState = { user: {}, isAuth: false, status: 'idle', error: null };

export const fetchLogin = createAsyncThunk(
  'auth/fetchLogin',
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const response = await AuthServices.login(email, password);
      return response;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
export const fetchAutoLogin = createAsyncThunk(
  'auth/fetchAutoLogin',
  async (token) => {
    const response = await AuthServices.autoLogin(token);
    return response;
  }
);
export const fetchRegistration = createAsyncThunk(
  'auth/fetchRegistration',
  async ({ email, password, name }, { rejectWithValue }) => {
    try {
      const response = await AuthServices.registration(email, password, name);
      return response;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
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
        state.error = null
        state.isAuth = true;
        state.user = payload.data.user;
        console.log(payload.data.accessToken)
        localStorage.setItem('token', payload.data.accessToken);
      })
      .addCase(fetchLogin.rejected, (state, { payload }) => {
        state.status = 'error';
        console.log(payload)
        state.error = payload.message;
      })
      .addCase(fetchRegistration.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchRegistration.fulfilled, (state, { payload }) => {
        state.status = 'success';
        state.error = null
        state.isAuth = true;
        state.user = payload.data.user;
        localStorage.setItem('token', payload.data.accessToken);
      })
      .addCase(fetchRegistration.rejected, (state, { payload }) => {
        state.status = 'error';
        let problem;
        problem = payload.errors[0].path;
        if (problem === 'password') problem = 'паролю';
        state.error = `${payload.message}. Перевірте коректність вашого ${problem}.`;
      })
      .addCase(fetchLogout.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchLogout.fulfilled, (state) => {
        state.status = 'success';
        state.error = null
        state.isAuth = false;
        state.user = {};
        localStorage.removeItem('token');
      })
      .addCase(fetchLogout.rejected, (state) => {
        state.status = 'error';
      })
      .addCase(fetchAutoLogin.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchAutoLogin.fulfilled, (state, { payload }) => {
        state.user = payload.data;
        state.error = null
        state.isAuth = true;
      })
      .addCase(fetchAutoLogin.rejected, (state) => {
        state.status = 'error';
      });
  },
});

export default authSlice.reducer;
