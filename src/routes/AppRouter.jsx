import { BrowserRouter, Routes, Route } from 'react-router-dom';
import UserPage from '../features/users/UserPage';
import AuthPage from '../features/auth/signin/AuthPage'; // Assurez-vous d'importer la page d'authentification
import RegisterPage from '../features/auth/signup/RegisterPage'; // Assurez-vous d'importer la page d'authentification
//import Navbar from '../components/Navbar'; // Assurez-vous d'importer la barre de navigation
import ProductPage from '../features/products/ProductPage'; // Assurez-vous d'importer la page produit
import Sidebar from '../components/Sidebar';

const AppRouter = () => (
  <BrowserRouter>
      {/* Conditionner l'affichage de la Navbar */}
      <Sidebar />
      {/* {location.pathname !== '/login' && location.pathname !== '/register' && <Navbar />} */}
      {/* <ProductPage /> */}
    <Routes>
      <Route path="/users" element={<UserPage />} />
      <Route path="/login" element={<AuthPage />} />
      <Route path="/register" element={<RegisterPage />} />
      {/* autres routes */}
    </Routes>
  </BrowserRouter>
);

export default AppRouter;
