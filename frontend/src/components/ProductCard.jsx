import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addCartItem, getCartItem } from "../reduxAPIs/UserCartSlice";
import { fetchProducts } from "../reduxAPIs/ProductsSlice";
import "./productcard.css";

export default function ProductCard() {
  const { products, loading, error } = useSelector(
    (state) => state.ecomProducts
  );
  const { cartProducts } = useSelector((state) => state.userCartItems);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchProducts());
    dispatch(getCartItem());
  }, []);

  const handleAddToCart = (obj) => {
    const pfind = cartProducts.find((val) => val._id == obj._id);
    if (pfind) {
      return alert("Product already in Cart");
    } else {
      dispatch(addCartItem(obj));
    }
  };
  return (
    <>
      {loading && <p>Loading</p>}
      {error && <p>{error.message}</p>}
      <div className="container productcard-grid">
        {products.length > 0 ? (
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
                <button
                  onClick={() => handleAddToCart(obj)}
                  id={`addtocartbtn${obj._id}`}
                  type="button"
                >
                  Add to Cart
                </button>
              </div>
            </article>
          ))
        ) : (
          <p>No Products</p>
        )}
      </div>
    </>
  );
}
