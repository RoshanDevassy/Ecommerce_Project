import { Link, Navigate, useNavigate } from "react-router-dom";
import "./header.css";
import { useSelector } from "react-redux";
export default function Header() {
  const { role } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  const handleAdminClick = (e) => {
    e.preventDefault();
    if (!role) return <Navigate to={"/login"} />;
    else if (role != "admin") return alert("You are not Admin");
    else if (role == "admin") {
      navigate("/admin");
    }
  };

  return (
    <>
      <header className="container-fluid header-container">
        {/* header wrapper */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            gap: "20px",
          }}
          className="header-wrapper flex-md-row justify"
        >
          {/* Language wrapper */}
          <div
            style={{ display: "flex", gap: "12px", fontSize: "10px" }}
            className="language-wrapper"
          >
            <select name="" id="">
              <option value="English" defaultChecked>
                English
              </option>
              <option value="Spanish">Spanish</option>
            </select>
            <select name="" id="">
              <option value="USD" defaultChecked>
                USD
              </option>
              <option value="CAD">CAD</option>
              <option value="EUR">EUR</option>
            </select>
          </div>
          {/* Header Links */}
          <div className="w-100 header-links-wrapper">
            <ul className="header-links-list">
              <Link
                to="/admin"
                className="header-links-item"
                onClick={handleAdminClick}
              >
                ADMIN
              </Link>
              <li className="header-links-item">MY ACCOUNT</li>
              <li className="header-links-item">WISHLIST</li>
              <li className="header-links-item">CHECKOUT</li>
              <Link to="/login" className="header-links-item">LOGIN</Link>
            </ul>
          </div>
        </div>
      </header>
    </>
  );
}
