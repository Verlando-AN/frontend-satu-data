import { NavLink, Link } from "react-router-dom";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import Logo from "../../assets/IMG_Logo.png"

export default function Header() {
  return (
    <nav className="navbar navbar-expand-lg bg-white shadow-sm sticky-top">
      <div className="container">
        <Link to="/" className="navbar-brand">
          <img 
            src={Logo}
            alt="logo"
            style={{ height: '70px' }}
          />
        </Link>
        
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav mx-auto mb-2 mb-lg-0 align-items-center">
            <li className="nav-item">
              <NavLink className="nav-link text-secondary fw-medium px-3" to="/">
                Beranda
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link text-secondary fw-medium px-3" to="/dataset">
                Dataset
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link text-secondary fw-medium px-3" to="/sektoral">
                Sektoral
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link text-secondary fw-medium px-3" to="/urusan">
                Urusan
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link text-secondary fw-medium px-3" to="/organisasi">
                Organisasi
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link text-secondary fw-medium px-3" to="/publikasi">
                Publikasi
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link text-secondary fw-medium px-3" to="/kontak">
                Kontak
              </NavLink>
            </li>
          </ul>
          
          <Link 
            className="btn rounded-3 fw-medium px-4" 
            to="/login"
            style={{
              background: 'linear-gradient(135deg, #fa6666 0%, #ff0c0c 100%)',
              color: 'white',
              border: 'none'
            }}  
          >
            Login
          </Link>
        </div>
      </div>
    </nav>
  );
}