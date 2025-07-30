import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import ProductsAPIContext from "./contextAPIs/ProductsContext.jsx";
import CartContextProvider from "./contextAPIs/CartContext.jsx";
import  {Store}  from "./reduxAPIs/Store.jsx";
import {Provider} from 'react-redux'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-toastify/dist/ReactToastify.css';
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store ={Store}>
      <CartContextProvider>
      <ProductsAPIContext>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </ProductsAPIContext>
    </CartContextProvider>
    </Provider>
  </StrictMode>
);
