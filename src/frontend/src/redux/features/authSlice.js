import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import * as api from '../api'
export const login = createAsyncThunk(
  'auth/login',
  async ({ formValue, navigate, toast }, { rejectWithValue }) => {
    try {
      const response = await api.signIn(formValue);
      toast.success('Login Successfully');
      navigate('/');
      console.log(response.data);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  });
export const register = createAsyncThunk(
  'auth/register',
  async ({ formValue, navigate, toast }, { rejectWithValue }) => {
    try {
      const response = await api.signUp(formValue);
      toast.success('Register Successfully');
      navigate('/login');
      console.log(response.data);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  });

const authSlices = createSlice({
  name: 'user',
  initialState: {
    user: null,
    error: '',
    loading: false
  },
  reducers: {
    setLoggedIn: (state, action) => {
      state.isLoggedIn = action.payload;
    }
  },
  extraReducers: {
    [login.pending]: (state, action) => {
      state.loading = true;
    },
    [login.fulfilled]: (state, action) => {
      state.loading = false;
      state.user = action.payload;
      localStorage.setItem('profile', JSON.stringify({ ...action.payload }));
    },
    [login.rejected]: (state, action) => {
      state.error = action.payload.message;
      state.loading = false;
    },
    [register.pending]: (state, action) => {
      state.loading = true;
    },
    [register.fulfilled]: (state, action) => {
      state.loading = false;
      state.user = action.payload;
      localStorage.setItem('profile', JSON.stringify({ ...action.payload }));
    },
    [register.rejected]: (state, action) => {
      state.error = action.payload.message;
      state.loading = false;
    }
  }
}
)
export default authSlices.reducer;