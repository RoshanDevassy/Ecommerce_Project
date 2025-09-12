import React, { useEffect, useState } from "react";
import { deleteCartItem, getCartItem } from "../reduxAPIs/UserCartSlice";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../reduxAPIs/ProductsSlice";
import "./cartproductcard.css"
import { toast } from "react-toastify";

export default function CartProductsCard(props) {
  const [counter, setCounter] = useState(1);

  const {token} = useSelector(state => state.auth)

  const dispatch = useDispatch();

  useEffect(() => {
    if (counter > props.cartItem.stock) {
      setCounter(props.cartItem.stock);
      toast.error("Stock limit reached");
    } else if (counter <= 0) {
      setCounter(1);
    }
  }, [counter]);

  const handleCartDeleteItem = (id) => {
      dispatch(deleteCartItem({id,token}));                  
  };

  return (
    <div className="cart-items-body">
      <div>
        <img src={props.cartItem.imgSrc} alt={props.cartItem.title} />
      </div>
      <div>
        <p>{props.cartItem.title}</p>
        <p>Price : {props.cartItem.price} </p>
        <p>Stock : {props.cartItem.stock} </p>
        <p>
          Quantity :{" "}
          <button onClick={() => setCounter((prev) => prev - 1)} type="button">-</button>
          {counter}{" "}
          <button onClick={() => setCounter((prev) => prev + 1)} type="button">+</button>{" "}
        </p>
        <button>Buy</button>
        <button
          onClick={() => handleCartDeleteItem(props.cartItem._id)}
          type="button"
        >
          Delete
        </button>
      </div>
    </div>
  );
}
