import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { fetchProducts, updateproduct } from "../../reduxAPIs/ProductsSlice";

export default function ProductEditPageAdmin() {
  const { id } = useParams();
  const router = useNavigate();

  const { products, loading, error } = useSelector(
    (state) => state.ecomProducts
  );
  const dispatch = useDispatch();

  const { token } = useSelector((state) => state.auth);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const find_product = products.filter((obj) => obj._id == id);

  /* const id = new Promise((resolve)=>{
        resolve(find_product[0]._id)
    }).then(res => res)  */

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    const plainFormData = Object.fromEntries(formData.entries());

    // const response =  fetch(`http://localhost:5500/admin/updateproduct/${id}`, {
    //         method: "PUT",
    //         headers: {
    //             "Content-Type": "application/json"
    //         },
    //         body: JSON.stringify(plainFormData)
    //     })

    await dispatch(updateproduct({ plainFormData, id })).unwrap();

    await dispatch(fetchProducts(token)).unwrap();

    router(-1);
  };

  return (
    <>
      {find_product.map((obj) => (
        <form onSubmit={handleFormSubmit} key={obj._id}>
          <p>
            Product Title :{" "}
            <input type="text" name="title" defaultValue={obj.title} />{" "}
          </p>
          <p>
            Product Price :{" "}
            <input type="number" name="price" defaultValue={obj.price} />{" "}
          </p>
          <p>
            Product Stock :{" "}
            <input type="number" name="stock" defaultValue={obj.stock} />{" "}
          </p>
          <p>
            Product imgSrc :{" "}
            <input type="text" name="imgSrc" defaultValue={obj.imgSrc} />{" "}
          </p>

          <button type="submit">Submit</button>
        </form>
      ))}
    </>
  );
}
