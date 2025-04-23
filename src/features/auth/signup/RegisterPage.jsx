import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "./registerSlice";
import { Navigate, Link } from "react-router-dom";

import Image from "../../../assets/image.webp";
import Logo from "../../../assets/logo.png";
import "../../../styles/registerStyle.css";

const RegisterPage = () => {
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.auth);

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");

  const handleRegister = (e) => {
    e.preventDefault();
    if (!username || !email || !password || !phone) {
      return alert("Veuillez remplir tous les champs.");
    }
    console.log("Envoi des données :", { username, email, password, phone });
    dispatch(registerUser({ username, email, password, phone }));
  };

  if (localStorage.getItem("token")) return <Navigate to="/" />;

  return (
    <div className="login-main">
      {/* LEFT: Image */}
      <div className="login-left">
        <img src={Image} alt="Illustration" />
      </div>

      {/* RIGHT: Form */}
      <div className="login-right">
        <div className="login-right-container">
          <div className="login-logo">
            <img src={Logo} alt="Logo" />
          </div>

          <div className="login-center">
            <h2 style={{ color: "#141f50" }}>Créer un compte</h2>
            <p>Remplissez les informations ci-dessous</p>

            {error && <p className="text-red-600">{error}</p>}

            <form onSubmit={handleRegister}>
              <input
                type="text"
                placeholder="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />

              <input
                type="email"
                placeholder="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />

              <input
                type="password"
                placeholder="Mot de passe"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />

              <input
                type="text"
                placeholder="Téléphone"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                required
              />

              <div className="login-center-buttons">
                <button type="submit" disabled={loading}>
                  {loading ? "Création..." : "S'inscrire"}
                </button>
              </div>
            </form>
          </div>

          <p className="login-bottom-p">
            Vous avez déjà un compte ? <Link to="/login">Se connecter</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
