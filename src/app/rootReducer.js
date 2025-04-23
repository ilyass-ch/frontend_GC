import { combineReducers } from 'redux';
import authReducer from '../features/auth/signin/authSlice';
import registerReducer from '../features/auth/signup/registerSlice.js';
import userReducer from '../features/users/userSlice.js';
// Ajoute d'autres reducers ici...

const rootReducer = combineReducers({
  auth: authReducer,
  register: registerReducer,
  users: userReducer,
  // etc.
});

export default rootReducer;
