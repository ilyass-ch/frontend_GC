// src/features/auth/registerSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import register from './regidterAPI'; // Assurez-vous d'avoir la fonction register dans authAPI.js

const initialState = {
  user: null,
  loading: false,
  error: null,
};

console.log("registerSlice.js loaded");

// Thunk
export const registerUser = createAsyncThunk(
  'auth/registerUser',
  async (credentials, { rejectWithValue }) => {
    try {
      const data = await register(credentials); // Appel à l'API pour l'enregistrement
      return data; // Retourne les données utilisateur
    } catch (err) {
      return rejectWithValue(err.response.data.message); // Gestion des erreurs
    }
  }
);

const registerSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout(state) {
      state.user = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user; // Sauvegarde les informations utilisateur
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload; // Sauvegarde le message d'erreur
      });
  },
});

export const { logout } = registerSlice.actions;
export default registerSlice.reducer;
