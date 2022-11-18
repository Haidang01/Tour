import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import * as api from '../api'
export const createTour = createAsyncThunk(
  'tour/createTour',
  async ({ updateTourData, navigate, toast }, { rejectWithValue }) => {
    try {
      const response = await api.createTour(updateTourData);
      toast.success('Tour add successfully');
      navigate('/home');
      console.log(response.data);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  });
export const getTours = createAsyncThunk(
  'tour/getTours',
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.getTours();
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  });
export const getTour = createAsyncThunk(
  'tour/getTour',
  async (id, { rejectWithValue }) => {
    try {
      const response = await api.getTour(id.id);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  });

const TourSlices = createSlice({
  name: 'tour',
  initialState: {
    tour: {},
    tours: [],
    userTours: [],
    error: '',
    loading: false
  },
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
    setLogout: (state, action) => {
      state.user = null;
      localStorage.clear();
    }
  },
  extraReducers: {
    [createTour.pending]: (state, action) => {
      state.loading = true;
    },
    [createTour.fulfilled]: (state, action) => {
      state.loading = false;
      state.tour = [action.payload];
    },
    [createTour.rejected]: (state, action) => {
      state.error = action.payload.message;
      state.loading = false;
    },
    [getTours.pending]: (state, action) => {
      state.loading = true;
    },
    [getTours.fulfilled]: (state, action) => {
      state.loading = false;
      state.tours = action.payload.tours;
    },
    [getTours.rejected]: (state, action) => {
      state.error = action.payload.message;
      state.loading = false;
    },
    [getTour.pending]: (state, action) => {
      state.loading = true;
    },
    [getTour.fulfilled]: (state, action) => {
      state.loading = false;
      state.tour = action.payload.tour;
    },
    [getTour.rejected]: (state, action) => {
      state.error = action.payload.message;
      state.loading = false;
    },
  }
}
)
// export const { setUser, setLogout } = authSlices.actions;
export default TourSlices.reducer;