import { useDispatch, useSelector } from "react-redux";
import { deleteProduct, fetchProducts } from "../../reduxAPIs/ProductsSlice";
import { useEffect, useState } from "react";
import AdminProductCard from "./components/AdminProductCard";
import { Link } from "react-router-dom";
import "./adminproductdisplay.css";

export default function AdminProductsDisplay() {
  const { products, loading, error } = useSelector(
    (state) => state.ecomProducts
  );
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    title: "",
    price: "",
    stock: "",
    imgSrc: "",
  });

  const handleOnChange = (e) => {
    const newForm = {
      ...formData,
      [e.target.name]: e.target.value,
    };

    setFormData(newForm);
  };

  useEffect(() => {
    dispatch(fetchProducts());
  }, []);

  const [isIdClicked, setIsIdClicked] = useState(null);

  const handleProductEdit = (id) => {
    /* setIsIdClicked(id); */
  };

  return (
    <>
      <section className="admin-product-display-section">
        <h2>Products</h2>
        {loading && <p>Loading..</p>}
        {error && <p>Error : {error}</p>}

        {products && (
          <table className="product-display-table">
            <thead className="product-display-thead">
              <tr className="product-display-row">
                <th>Image</th>
                <th>Name</th>
                <th>Price</th>
                <th>Stock</th>
                <th>url</th>
                <th></th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {products.map((obj) => (
                <tr key={obj._id} className="product-display-row">
                  <td>
                    <img src={obj.imgSrc} alt={obj.title} />
                  </td>
                  <td>
                    <input
                      type="text"
                      defaultValue={obj.title}
                      style={{
                        width: "100%",
                        backgroundColor: "white",
                        border: "none",
                        color: "black",
                      }}
                      name="title"
                      onChange={handleOnChange}
                      disabled={isIdClicked == obj._id ? false : true}
                    />
                  </td>
                  <td>
                    <input
                      type="number"
                      defaultValue={obj.price}
                      name="price"
                      disabled={isIdClicked == obj._id ? false : true}
                      style={{
                        width: "100%",
                        backgroundColor: "white",
                        border: "none",
                        color: "black",
                      }}
                    />
                  </td>
                  <td>
                    <input
                      type="number"
                      defaultValue={obj.stock}
                      name="stock"
                      disabled={isIdClicked == obj._id ? false : true}
                      style={{
                        width: "100%",
                        backgroundColor: "white",
                        border: "none",
                        color: "black",
                      }}
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      defaultValue={obj.imgSrc}
                      name="imgSrc"
                      disabled={isIdClicked == obj._id ? false : true}
                      style={{
                        width: "100%",
                        backgroundColor: "white",
                        border: "none",
                        color: "black",
                      }}
                    ></input>
                  </td>
                  <td>
                    <Link
                      to={`/admin/updateproduct/${obj._id}`}
                      onClick={() => handleProductEdit(obj._id)}
                      style={{
                        textDecoration: "none",
                        backgroundColor: "grey",
                        color: "white",
                        padding: "6px 8px",
                      }}
                    >
                      Edit
                    </Link>
                  </td>
                  <td>
                    {" "}
                    <button
                      onClick={() => dispatch(deleteProduct(obj._id))}
                      style={{
                        textDecoration: "none",
                        backgroundColor: "grey",
                        color: "white",
                        padding: "6px 8px",
                      }}
                    >
                      Del
                    </button>{" "}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
        {/* {products &&
          products.map((obj) => (
            <AdminProductCard products={obj} key={obj._id} />
          ))} */}
      </section>
    </>
  );
}
