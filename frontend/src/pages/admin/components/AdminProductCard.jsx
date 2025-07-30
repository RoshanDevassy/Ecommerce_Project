import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import {
  deleteProduct,
  fetchProducts,
  updateproduct,
} from "../../../reduxAPIs/ProductsSlice";

export default function AdminProductCard(props) {
  const dispatch = useDispatch();

  const [isDisabled, setIsDisabled] = useState(true);

  const handleProductEdit = () => {
    setIsDisabled(false);
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    document
      .querySelector("#AdminProductUpdateButton")
      .setAttribute("disabled", "true");
    setIsDisabled(true);

    const formData = new FormData(e.target);
    const json_formData = Object.fromEntries(formData.entries());
    console.info(json_formData);

    try {
      const response = await fetch(
        `http://localhost:5500/admin/updateproduct/${props.products._id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(json_formData),
        }
      );

      if (!response.ok) {
        throw new Error(response.error);
      }

      e.target.reset();

      dispatch(fetchProducts());
    } catch (error) {
      throw new Error(error);
    }
  };

  const handleProductDelete = async (id) => {
    dispatch(deleteProduct(id));  
  };

  return (
    <article key={props.products._id}z>
      <div>
        <img src={props.products.imgSrc} alt={props.products.title} />
      </div>
      <form onSubmit={handleFormSubmit} id={props.products._id}>
        <p>
          Title :{" "}
          <input
            type="text"
            name="title"
            defaultValue={props.products.title}
            disabled={isDisabled}
          />
        </p>
        <p>
          Price : ${" "}
          <input
            type="number"
            name="price"
            defaultValue={props.products.price}
            disabled={isDisabled}
          />
        </p>
        <p>
          Stocks :{" "}
          <input
            type="number"
            name="stock"
            defaultValue={props.products.stock}
            disabled={isDisabled}
          />
        </p>
        <p>
          ImgSrc :{" "}
          <input
            type="text"
            name="imgSrc"
            defaultValue={props.products.imgSrc}
            disabled={isDisabled}
          />
        </p>
        {isDisabled && (
          <button onClick={() => handleProductEdit()} type="button">
            Edit
          </button>
        )}
        {!isDisabled && (
          <button type="submit" id="AdminProductUpdateButton">
            Update
          </button>
        )}
        <button
          onClick={() => handleProductDelete(props.products._id)}
          type="button"
        >
          Delete
        </button>
      </form>
    </article>
  );
}
