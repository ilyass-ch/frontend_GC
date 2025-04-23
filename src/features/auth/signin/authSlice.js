import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import login from './authAPI';  // Assurez-vous que la fonction `login` est correctement définie

const initialState = {
  user: JSON.parse(localStorage.getItem('user')) || null,
  accessToken: localStorage.getItem('accessToken') || null,
  refreshToken: localStorage.getItem('refreshToken') || null,
  loading: false,
  error: null,
};
console.log("authSlice.js loaded");

// Thunk pour la connexion
export const loginUser = createAsyncThunk(
  'auth/loginUser',
  async (credentials, { rejectWithValue }) => {
    try {
      const data = await login(credentials);  // Appel à l'API pour se connecter
      console.log(data);  // Inspecter la structure des données reçues
      if (!data['access-token'] || !data['refresh-token']) {
        throw new Error('Token manquant dans la réponse de l\'API');
      }
      localStorage.setItem('accessToken', data['access-token']);
      localStorage.setItem('refreshToken', data['refresh-token']);
      localStorage.setItem('user', JSON.stringify(data.user));

      return {
        user: data.user,
        accessToken: data['access-token'],
        refreshToken: data['refresh-token'],
      };
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || 'Une erreur est survenue');
    }
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout(state) {
      // Réinitialiser l'état et supprimer les éléments du localStorage
      state.user = null;
      state.accessToken = null;
      state.refreshToken = null;
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
      localStorage.removeItem('user');
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        // Mise à jour de l'état avec les données de l'action
        state.user = action.payload.user;
        state.accessToken = action.payload.accessToken;
        state.refreshToken = action.payload.refreshToken;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
