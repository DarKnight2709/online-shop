// src/components/TopMenu.jsx
import React from "react";
import { Link } from "react-router-dom";
import './topMenu.css';

export default function TopMenu({ user, logOutHandler }) {
  return (
    <nav className="navbar shop-secondary-menu navbar-expand bg-dark border-bottom border-body" data-bs-theme="dark">
      <div className="container d-flex justify-content-end">
        <ul className="navbar-nav align-items-center gap-3">
          {user ? (
            <>
              {/* Giỏ hàng */}
              <li className="nav-item d-flex align-items-center">
                <Link className="nav-link icon-link d-flex align-items-center justify-content-center" to="/cart" title="Giỏ hàng">
                  <i className="bi bi-cart-fill custom-icon"></i>
                </Link>
              </li>

              {/* Menu tài khoản */}
              <li className="nav-item dropdown user-dropdown d-flex align-items-center">
                <span className="nav-link dropdown-toggle d-flex align-items-center justify-content-center" role="button" title="Tài khoản">
                  <i className="bi bi-person-circle custom-icon"></i>
                </span>
                <ul className="dropdown-menu dropdown-menu-end">
                  <li>
                    <Link className="dropdown-item" to="/account">Tài khoản của tôi</Link>
                  </li>
                  <li>
                    <Link className="dropdown-item" to="/order">Đơn hàng của tôi</Link>
                  </li>
                  <li>
                    <button className="dropdown-item text-danger" onClick={logOutHandler}>Đăng xuất</button>
                  </li>
                </ul>
              </li>
            </>
          ) : (
            <>
              <li className="nav-item">
                <Link className="nav-link" to="/login">Đăng nhập</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/register">Đăng ký</Link>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
}
