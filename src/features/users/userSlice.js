import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axiosClient from '../../api/axiosClient';

// --- FETCH ALL USERS ---
export const getAllUsers = createAsyncThunk(
  'users/fetchAll',
  async (_, { rejectWithValue }) => {
    try {
      const res = await axiosClient.get('/users');
      return res.data;
    } catch (err) {
      if (!err.response) {
        return rejectWithValue("Le serveur est injoignable.");
      }
      return rejectWithValue(err.response.data.message);
    }
  }
);

// --- DELETE USER ---
export const removeUser = createAsyncThunk(
  'users/remove',
  async (id, { rejectWithValue }) => {
    try {
      await axiosClient.delete(`/users/${id}`);
      console.log(`User with ID ${id} deleted`);
      return id;
    } catch (err) {
      if (!err.response) {
        return rejectWithValue("Impossible de supprimer : serveur injoignable.");
      }
      return rejectWithValue(err.response.data.message);
    }
  }
);

// --- SLICE ---
const userSlice = createSlice({
  name: 'users',
  initialState: {
    users: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // FETCH
      .addCase(getAllUsers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.users = action.payload;
      })
      .addCase(getAllUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // REMOVE
      .addCase(removeUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(removeUser.fulfilled, (state, action) => {
        state.loading = false;
        state.users = state.users.filter((u) => u._id !== action.payload);
      })
      .addCase(removeUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default userSlice.reducer;
