import { useContext, useEffect } from "react";
import { CartContext } from "../contextAPIs/CartContext";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { removeProduct } from "../reduxAPIs/CartSlice";
import { useLocation } from "react-router-dom";
import { deleteCartItem, getCartItem } from "../reduxAPIs/UserCartSlice";
import CartProductsCard from "../components/CartProductsCard";
import "./cartpage.css";

function CartPage() {
  /* const { cartData, setCartData } = useContext(CartContext);
  console.info("Cart Page Data : ", cartData.products);

  const cartremoveHandler = (id) => {
    const newData = cartData.products.filter((obj) => id !== obj.id);
    setCartData({...cartData,products:newData});
    
  }; */
  const { cartProducts, loading, status } = useSelector(
    (state) => state.userCartItems
  );

  const dispatch = useDispatch();

  const {token} = useSelector(state => state.auth)

  useEffect(() => {
    window.scrollTo(0, 0);
    dispatch(getCartItem(token));
  }, []);

  const { productData } = useSelector((state) => state.cartData);

  const CartDispatch = useDispatch();

  return (
    <section
      className="container cartpage-section"
      style={{ minHeight: "100vh" }}
    >
      <div className="cartpage-section-heading-div">
        <h1>Items in Cart</h1>
      </div>
      {/* using Context Api */}
      {/* <div className="container featured-product-gallery">
          {cartData.products.length <= 0 ? (
            <div>No Items</div>
          ) : (
            cartData.products.map((obj) => (
              <div
                key={obj.id}
                className="featured-product-gallery-image-wrapper"
              >
                <div className="featured-product-img">
                  <img src={obj.imgsrc} alt={obj.title} />
                </div>
                <div className="container featured-product-description">
                  <p>{obj.title}</p>
                  <p>{obj.product_type}</p>
                  <p>${obj.price}</p>
                  <button>Buy</button>
                  <button onClick={() => cartremoveHandler(obj.id)}>
                    Remove
                  </button>
                </div>
              </div>
            ))
          )}
        </div> */}
      {/* Using normal Redux */}
      <div className="container featured-product-gallery">
        {productData.length <= 0 ? (
          <div></div>
        ) : (
          productData.map((obj) => (
            <div
              key={obj.id}
              className="featured-product-gallery-image-wrapper"
            >
              <div className="featured-product-img">
                <img src={obj.imgsrc} alt={obj.title} />
              </div>
              <div className="container featured-product-description">
                <p>{obj.title}</p>
                <p>{obj.product_type}</p>
                <p>${obj.price}</p>
                <button>Buy</button>
                <button onClick={() => CartDispatch(removeProduct(obj.id))}>
                  Remove
                </button>
              </div>
            </div>
          ))
        )}
      </div>
      {/* Using Thunk in Redux */}
      <div className="cart-items-grid">
        {loading && <p>Loading...</p>}
        {status == "rejected" && <p>{status}</p>}
        {cartProducts.length <= 0 ? <p>No Items</p> : ""}
        {cartProducts &&
          cartProducts.map((obj) => (
            <CartProductsCard cartItem={obj} key={obj._id} />
          ))}
      </div>
    </section>
  );
}

export default CartPage;
