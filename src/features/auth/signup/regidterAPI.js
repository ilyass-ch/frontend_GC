// src/features/auth/authAPI.js
import axiosClient from '../../../api/axiosClient';

const register = async ({ username, email, password, phone }) => {
  console.log('Credentials:', { username, email, password, phone });

  const response = await axiosClient.post('/users/register', null, {
    params: {
      username,
      email,
      password,
      phone,
    },
  });

  return response.data;
};

export default register;
