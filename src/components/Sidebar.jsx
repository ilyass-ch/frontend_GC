import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "../styles/sideBar.css";
import Navbar from "./NavBar";

const Sidebar = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [menuOpen, setMenuOpen] = useState({}); // Track open menus dynamically

  const toggleSidebar = () => {
    setCollapsed(!collapsed);
  };

  const toggleMenu = (menu) => {
    setMenuOpen((prevState) => ({
      ...prevState,
      [menu]: !prevState[menu],
    }));
  };

  return (
    <div className={`wrapper d-flex ${collapsed ? "toggled" : ""}`}>
      <aside id="sidebar" className={`sidebar ${collapsed ? "collapsed" : ""}`}>
        <div className="sidebar-header">
          <h3 className="sidebar-logo">CodzSword</h3>
          <button className="btn btn-toggle" onClick={toggleSidebar}>
            <i className={`fa ${collapsed ? "fa-chevron-right" : "fa-chevron-left"}`}></i>
          </button>
        </div>
        <ul className="sidebar-nav">
          <li className="sidebar-item">
            <a href="#" className="sidebar-link">
              <i className="fa-solid fa-user pe-2"></i> Profile
            </a>
          </li>
          <li className="sidebar-item">
            <a
              className="sidebar-link"
              onClick={() => toggleMenu("pages")}
            >
              <i className="fa-regular fa-file-lines pe-2"></i> Pages
              <i className={`fa ${menuOpen.pages ? "fa-chevron-up" : "fa-chevron-down"} float-end`}></i>
            </a>
            <ul className={`sidebar-dropdown ${menuOpen.pages ? "show" : ""}`}>
              <li><a href="#" className="sidebar-link">Analytics</a></li>
              <li><a href="#" className="sidebar-link">Ecommerce</a></li>
              <li><a href="#" className="sidebar-link">Crypto</a></li>
            </ul>
          </li>
          <li className="sidebar-item">
            <a
              className="sidebar-link"
              onClick={() => toggleMenu("dashboard")}
            >
              <i className="fa-solid fa-sliders pe-2"></i> Dashboard
              <i className={`fa ${menuOpen.dashboard ? "fa-chevron-up" : "fa-chevron-down"} float-end`}></i>
            </a>
            <ul className={`sidebar-dropdown ${menuOpen.dashboard ? "show" : ""}`}>
              <li><a href="#" className="sidebar-link">Dashboard Analytics</a></li>
              <li><a href="#" className="sidebar-link">Dashboard Ecommerce</a></li>
            </ul>
          </li>
          <li className="sidebar-item">
            <a
              className="sidebar-link"
              onClick={() => toggleMenu("auth")}
            >
              <i className="fa-regular fa-user pe-2"></i> Auth
              <i className={`fa ${menuOpen.auth ? "fa-chevron-up" : "fa-chevron-down"} float-end`}></i>
            </a>
            <ul className={`sidebar-dropdown ${menuOpen.auth ? "show" : ""}`}>
              <li><a href="#" className="sidebar-link">Login</a></li>
              <li><a href="#" className="sidebar-link">Register</a></li>
            </ul>
          </li>
        </ul>
      </aside>
      <div id="content" className={`content ${collapsed ? "sidebar-collapsed" : ""}`}>
        <Navbar isSidebarCollapsed={collapsed} />
      </div>
    </div>
  );
};

export default Sidebar;