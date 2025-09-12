import { Link, useNavigate } from "react-router-dom";

import "./navbar.css";
import { useDispatch } from "react-redux";
import { logout } from "../reduxAPIs/AuthSlice";

export default function Navbar() {
  const authDispatch = useDispatch();
  const navigate = useNavigate();

  return (
    <>
      <section className="container-fluid nav-section">
        <div className=" nav-wrapper">
          <div className="LogoName">
            <Link to="/homepage" className="logo">
              EREN
            </Link>
          </div>
          <nav>
            <button className="hamburger-menu">
              <span></span>
              <span></span>
              <span></span>
            </button>

            <ul>
              <li>
                <Link to="/homepage" className="nav-items">
                  HOME
                </Link>
              </li>
              <li>
                <Link to="/productspage" className="nav-items">
                  PRODUCTS
                </Link>
              </li>
              {/* <li>
                <Link to="/collectionspage" className="nav-items">
                  COLLECTIONS
                </Link>
              </li>
              <li>
                <Link to="/pagespage" className="nav-items">
                  PAGES
                </Link>
              </li>
              <li>
                <Link to="/aboutpage" className="nav-items">
                  ABOUT US
                </Link>
              </li>
              <li>
                <Link to="/contactuspage" className="nav-items">
                  CONTACT US
                </Link>
              </li> */}
              <li>
                <Link to="/cartpage" className="nav-items">
                  CART
                </Link>
              </li>
              <li>
                <Link
                  to="/login"
                  className="nav-items"
                  onClick={(e) => {
                    e.preventDefault();
                    authDispatch(logout());
                    navigate("/login");
                  }}
                >
                  LOGOUT
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </section>
    </>
  );
}
