import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "../styles/sideBar.css";
import Navbar from "./Navbar";

const Sidebar = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false); // Nouvel état pour le menu des pages

  const toggleSidebar = () => {
    setCollapsed(!collapsed);
  };

  const toggleMenu = () => {
    setMenuOpen(!menuOpen); // Change l'état du menu
  };

  return (
    <div className={`wrapper d-flex ${collapsed ? "toggled" : ""}`}>
      <aside id="sidebar" className={collapsed ? "collapsed" : ""}>
        <div className="h-100">
          <div className="sidebar-logo">
            <a href="#">CodzSword</a>
          </div>
          <ul className="sidebar-nav">
            <li className="sidebar-header">Tools & Components</li>
            <li className="sidebar-item">
              <a href="#" className="sidebar-link">
                <i className="fa-solid fa-list pe-2"></i> Profile
              </a>
            </li>

            <li className="sidebar-item">
              <a className="sidebar-link" data-bs-toggle="collapse" data-bs-target="#pages" onClick={toggleMenu}>
                <i className="fa-regular fa-file-lines pe-2"></i> Pages
              </a>
              <ul id="pages" className={`sidebar-dropdown list-unstyled ${menuOpen ? 'show' : ''}`}>
                <li className="sidebar-item"><a href="#" className="sidebar-link">Analytics</a></li>
                <li className="sidebar-item"><a href="#" className="sidebar-link">Ecommerce</a></li>
                <li className="sidebar-item"><a href="#" className="sidebar-link">Crypto</a></li>
              </ul>
            </li>

            <li className="sidebar-item">
              <a className="sidebar-link" data-bs-toggle="collapse" data-bs-target="#dashboard">
                <i className="fa-solid fa-sliders pe-2"></i> Dashboard
              </a>
              <ul id="dashboard" className="sidebar-dropdown list-unstyled collapse">
                <li className="sidebar-item"><a href="#" className="sidebar-link">Dashboard Analytics</a></li>
                <li className="sidebar-item"><a href="#" className="sidebar-link">Dashboard Ecommerce</a></li>
              </ul>
            </li>

            <li className="sidebar-item">
              <a className="sidebar-link" data-bs-toggle="collapse" data-bs-target="#auth">
                <i className="fa-regular fa-user pe-2"></i> Auth
              </a>
              <ul id="auth" className="sidebar-dropdown list-unstyled collapse">
                <li className="sidebar-item"><a href="#" className="sidebar-link">Login</a></li>
                <li className="sidebar-item"><a href="#" className="sidebar-link">Register</a></li>
              </ul>
            </li>

            <li className="sidebar-header">Multi Level Nav</li>
            <li className="sidebar-item">
              <a className="sidebar-link" data-bs-toggle="collapse" data-bs-target="#multi">
                <i className="fa-solid fa-share-nodes pe-2"></i> Multi Level
              </a>
              <ul id="multi" className="sidebar-dropdown list-unstyled collapse">
                <li className="sidebar-item">
                  <a className="sidebar-link" data-bs-toggle="collapse" data-bs-target="#multi-two">
                    Two Links
                  </a>
                  <ul id="multi-two" className="sidebar-dropdown list-unstyled collapse">
                    <li className="sidebar-item"><a href="#" className="sidebar-link">Link 1</a></li>
                    <li className="sidebar-item"><a href="#" className="sidebar-link">Link 2</a></li>
                  </ul>
                </li>
              </ul>
            </li>
          </ul>
        </div>
      </aside>

      {/* Contenu principal */}
      <div id="content" className={`content ${collapsed ? "sidebar-collapsed" : ""}`}>
        <Navbar isSidebarCollapsed={collapsed} />
      </div>
    </div>
  );
};

export default Sidebar;
