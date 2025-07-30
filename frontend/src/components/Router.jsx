import { Route, Routes } from "react-router-dom";
import HomePage from "../pages/HomePage";
import AboutPage from "../pages/AboutPage";
import ProductsPage from "../pages/ProductsPage";
import CollectionsPage from "../pages/CollectionsPage";
import PagesPage from "../pages/PagesPage";
import ContactusPage from "../pages/ContactusPage";
import CartPage from "../pages/CartPage";
import ProductDetail from "../pages/ProductsDetail";
import AdminPage from "../pages/admin/AdminPage";
import AdminAddProducts from "../pages/admin/AdminAddProducts";
import AdminProductsDisplay from "../pages/admin/AdminProductsDisplay";
import ProductEditPageAdmin from "../pages/admin/ProductEditPageAdmin";
import SignupPage from "../pages/SignupPage";
import LoginPage from "../pages/LoginPage";
import ProtectedRoute from "./ProtectedRoute";
import SingleCrud from "../pages/admin/pages/SingleCrud";

export default function Router(props) {
  return (
    <>
      <Routes>
        <Route path="/" element={<SignupPage />} />
        <Route path="/login" element={<LoginPage />} />

        <Route
          path="/homepage"
          element={
            <ProtectedRoute>
              <HomePage ProductReviewObj={props.ProductReviewObj} />
            </ProtectedRoute>
          }
        />
        <Route
          path="/productspage"
          element={
            <ProtectedRoute>
              <ProductsPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/collectionspage"
          element={
            <ProtectedRoute>
              <CollectionsPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/pagespage"
          element={
            <ProtectedRoute>
              <PagesPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/aboutpage"
          element={
            <ProtectedRoute>
              <AboutPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/contactuspage"
          element={
            <ProtectedRoute>
              <ContactusPage />
            </ProtectedRoute>
          }
        />
        <Route
          path={`/productsdetail/:id`}
          element={
            <ProtectedRoute>
              <ProductDetail ProductReviewObj={props.ProductReviewObj} />
            </ProtectedRoute>
          }
        />
        <Route
          path={`/cartpage`}
          element={
            <ProtectedRoute>
              <CartPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin"
          element={
            <ProtectedRoute requiredRole="admin">
              <AdminPage />
            </ProtectedRoute>
          }
        >
          <Route index element={<SingleCrud />} />
          <Route path="singlecrud/" element={<SingleCrud />} />
          <Route path="getproducts/" element={<AdminProductsDisplay />} />
          <Route path="addproducts/" element={<AdminAddProducts />} />
          <Route path="updateproduct/:id" element={<ProductEditPageAdmin />} />
        </Route>
      </Routes>
    </>
  );
}
