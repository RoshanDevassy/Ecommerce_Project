import { Link, Outlet } from "react-router-dom";
import "./adminpage.css";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { fetchProducts } from "../../reduxAPIs/ProductsSlice";

export default function AdminPage() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchProducts());
  }, []);

  return (
    <>
      <section className="admin-page-section">
        <div className="admin-header">
          <div className="admin-header-heading">
            <h2>Admin Page</h2>
          </div>
          <nav className="admin-header-options">
            <Link to="singlecrud/" className="admin-header-options-item">
              Single Crud
            </Link>
            <Link to="getproducts/" className="admin-header-options-item">
              Products
            </Link>
            <Link to="addproducts/" className="admin-header-options-item">
              Add Products
            </Link>
          </nav>
        </div>

        <div>
          <Outlet />
        </div>
      </section>
    </>
  );
}
