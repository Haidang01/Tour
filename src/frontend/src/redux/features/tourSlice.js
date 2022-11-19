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
export const deleteTour = createAsyncThunk(
  'tour/deleteTour',
  async ({ id, toast }, { rejectWithValue }) => {
    try {
      const response = await api.deleteTour(id);
      toast.success('Tour delete successfully');
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  });
export const updateTour = createAsyncThunk(
  'tour/updateTour',
  async ({ id, updateTourData, toast, navigate }, { rejectWithValue }) => {
    try {
      const response = await api.updateTour(id, updateTourData);
      toast.success('Tour update successfully');
      navigate('/dashboard');
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  });
export const getToursByUser = createAsyncThunk(
  'tour/getTourByUser',
  async (userId, { rejectWithValue }) => {
    try {
      const response = await api.getToursByUser(userId);
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
    [getToursByUser.pending]: (state, action) => {
      state.loading = true;
    },
    [getToursByUser.fulfilled]: (state, action) => {
      state.loading = false;
      state.userTours = action.payload.userTours;
    },
    [getToursByUser.rejected]: (state, action) => {
      state.error = action.payload.message;
      state.loading = false;
    },
    [deleteTour.pending]: (state, action) => {
      state.loading = true;
    },
    [deleteTour.fulfilled]: (state, action) => {
      state.loading = false;
      state.tours = state.tours.filter(tour => tour._id !== action.meta.arg.id);
      state.userTours = state.userTours.filter(tour => tour._id !== action.meta.arg.id);
    },
    [deleteTour.rejected]: (state, action) => {
      state.error = action.payload.message;
      state.loading = false;
    },
    [updateTour.pending]: (state, action) => {
      state.loading = true;
    },
    [updateTour.fulfilled]: (state, action) => {
      state.loading = false;
      const { id } = action.meta.arg;
      state.tours = state.tours.map(tour => tour._id === id ? action.payload : tour);

      state.userTours = state.userTours.map(tour => tour._id === id ? action.payload : tour);
    },
    [updateTour.rejected]: (state, action) => {
      state.error = action.payload.message;
      state.loading = false;
    },
  }
}
)
// export const { setUser, setLogout } = authSlices.actions;
export default TourSlices.reducer;