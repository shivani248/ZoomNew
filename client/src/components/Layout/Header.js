import React from 'react'
import { NavLink } from 'react-router-dom';
import { useAuth } from "../../context/auth";
const Header = () => {
  const [auth, setAuth] = useAuth();
  const handleLogout = () => {
    setAuth({
      ...auth,
      user: null,
      token: "",
    });
    localStorage.removeItem("auth");
    
  };
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light fixed-top shadow-sm">
    <div className="container-fluid">
        <NavLink to="/" className="navbar-brand">
            <img
                src="/images/logo.jpg"
                width="30"
                height="30"
                className="d-inline-block align-top"
                alt="Logo"
                style={{ borderRadius: '50%' }}
            />
            Zoom
        </NavLink>

        <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
        >
            <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                <li className="nav-item">
                    <NavLink to="/" className="nav-link" activeClassName="active">
                        Home
                    </NavLink>
                </li>

                {!auth?.user ? (
                    <>
                        <li className="nav-item">
                            <NavLink to="/register" className="nav-link" activeClassName="active">
                                Register
                            </NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink to="/login" className="nav-link" activeClassName="active">
                                Login
                            </NavLink>
                        </li>
                    </>
                ) : (
                    <li className="nav-item">
                        <NavLink
                            onClick={handleLogout}
                            to="/login"
                            className="nav-link"
                            activeClassName="active"
                        >
                            Logout
                        </NavLink>
                    </li>
                )}
            </ul>
        </div>
    </div>
</nav>
  )
}

export default Header