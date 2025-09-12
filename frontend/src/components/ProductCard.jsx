import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addCartItem, getCartItem } from "../reduxAPIs/UserCartSlice";
import { fetchProducts } from "../reduxAPIs/ProductsSlice";
import "./productcard.css";
import { toast } from "react-toastify";

export default function ProductCard() {
  const { products, productStatus, error } = useSelector(
    (state) => state.ecomProducts
  );
  const { cartProducts } = useSelector((state) => state.userCartItems);

  const { token } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchProducts(token));

    dispatch(getCartItem(token));

    /*    async function getCartItems() {
      try {
        await dispatch(getCartItem(token)).unwrap();
      } catch (error) {
        if (error.message.split(" ")[1] == "TokenExpiredError") {
          toast.info("Token Expired please Login");
          localStorage.removeItem("clientname");
          localStorage.removeItem("clientToken");
          localStorage.removeItem("clientRole");
        }

        navigate("/login");
      }
    }

    getCartItems(); */
  }, []);

  const handleAddToCart = (obj) => {
    const pfind = cartProducts.find((val) => val.p_id == obj._id);
    if (pfind) {
      return toast.error("Product already in Cart");
    } else {
      dispatch(addCartItem({ obj, token }));
    }
  };
  return (
    <>
      {productStatus == "pending" && <p>Loading</p>}
      {productStatus == "rejected" && <pre>{JSON.stringify(error)}</pre>}
      {productStatus == "fulfilled" && (
        <div className="container productcard-grid">
          {products.length > 0 &&
            products.map((obj) => (
              <article key={obj._id} className="productcard-body">
                <div>
                  <img src={obj.imgSrc} alt={obj.title} />
                </div>
                <div>
                  <p>{obj.title}</p>
                  <p>Price : ${obj.price}</p>
                  <p>Stocks : {obj.stock}</p>
                  <button>Buy</button>
                  <button onClick={() => handleAddToCart(obj)} type="button">
                    Add to Cart
                  </button>
                </div>
              </article>
            ))}
        </div>
      )}
    </>
  );
}
