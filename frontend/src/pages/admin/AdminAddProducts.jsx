import { useState } from "react";
import "./adminaddproducts.css";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addProduct } from "../../reduxAPIs/ProductsSlice";

export default function AdminAddProducts() {
  const [isSubmitClicked, setIsSubmitClicked] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleAdminFormSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitClicked(true);

    const formData = new FormData(e.target);
    const jsonFormData = Object.fromEntries(formData.entries());

    try {
      if (
        (jsonFormData.title == "") |
        (jsonFormData.price == "") |
        (jsonFormData.stock == "") |
        (jsonFormData.imgSrc == "")
      ) {
        alert("Enter All Details");
        console.warn("Enter All Details");
        setIsSubmitClicked(false);
        throw new Error("Enter All Details");
      }


      await dispatch(addProduct(jsonFormData)).unwrap();
      /* const response = await fetch("http://localhost:5500/admin/addproduct", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(jsonFormData),
      });

      if (!response.ok) {
        alert("Error during POST");
        throw new Error("Error during product POST method");
      }
      alert("Product Added Successfully"); */
      e.target.reset();
      setIsSubmitClicked(false);

      navigate("/admin/getproducts");
    } catch (err) {
      console.warn(err.message);
    }
  };

  return (
    <>
      <div className="admin-product-wrapper">
        <h2>Product Form</h2>
        <form
          className="admin-addproduct-form"
          onSubmit={handleAdminFormSubmit}
        >
          <div className="admin-addproduct-item">
            <label htmlFor="product-title">Product Title :</label>
            <input
              type="text"
              id="product-title"
              name="title"
              placeholder="bag"
            />
          </div>
          <div className="admin-addproduct-item">
            <label htmlFor="product-price">Price :</label>
            <input
              type="number"
              id="product-price"
              name="price"
              placeholder="120"
            />
          </div>
          <div className="admin-addproduct-item">
            <label htmlFor="product-stock">Stock :</label>
            <input
              type="number"
              id="product-stock"
              name="stock"
              placeholder="32"
            />
          </div>
          <div className="admin-addproduct-item">
            <label htmlFor="product-image">Image Source :</label>
            <input
              type="text"
              id="product-image"
              name="imgSrc"
              placeholder="eg.https://themesindustry.com/html/eren/images/product6.jpg"
            />
          </div>
          <button
            type="submit"
            disabled={isSubmitClicked}
            style={{ backgroundColor: "red" }}
          >
            Submit
          </button>
        </form>
      </div>
    </>
  );
}
