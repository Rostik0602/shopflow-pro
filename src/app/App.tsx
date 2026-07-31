import { Routes, Route } from "react-router-dom";
import LoginPage from "../pages/LoginPage/LoginPage";
import ProtectedRoute from "../features/auth/ProtectedRoute/ProtectedRoute";
import ProductsPage from "../pages/ProductsPage/ProductsPage";
import ProductsDetails from "../pages/ProductDetailsPage/ProductsDetailsPage";
import CartPage from "../pages/CartPage/CartPage";
import FavoritesPage from "../pages/FavoritesPage/FavoritesPage";
import CreateProductPage from "../pages/CreateProductPage/CreateProductPage";
import EditProductPage from "../pages/EditProductPage/EditProductPage";
import Navbar from "../layout/Navbar/Navbar";

export default function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/login" element={<LoginPage />} />

        <Route element={<ProtectedRoute />}>
          <Route path="/" element={<ProductsPage />} />
          <Route path="/products/:id" element={<ProductsDetails />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/favorites" element={<FavoritesPage />} />
          <Route path="/products/create" element={<CreateProductPage />} />
          <Route path="/products/edit/:id" element={<EditProductPage />} />
        </Route>
      </Routes>
    </>
  );
}
