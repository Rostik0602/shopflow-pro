import { useSelector } from "react-redux";
import type { RootState } from "../../app/store";
import { useGetProductsQuery } from "../../services/productApi";
import ProductList from "../../features/products/ProductList/ProductList";
import Loader from "../../components/Loader/Loader";
import EmptyState from "../../components/EmptyState/EmptyState";
import type { Product } from "../../types/product";
import { Heart } from "lucide-react";
import styles from "./FavoritesPage.module.scss";

export default function FavoritesPage() {
  const favorites = useSelector((state: RootState) => state.favorites);
  const { data: allProductData, isFetching } = useGetProductsQuery();

  if (isFetching) return <Loader />;

  const favoriteProducts = favorites
    .map((id) => allProductData?.products.find((p) => p.id === id))
    .filter((product): product is Product => product !== undefined);

  return (
    <div className={styles.page}>
      {favoriteProducts.length > 0 && (
        <h1 className={styles.title}>Favorites</h1>
      )}

      {favoriteProducts.length === 0 ? (
        <EmptyState message="Your favorites list is empty" icon={Heart} />
      ) : (
        <ProductList products={favoriteProducts} />
      )}
    </div>
  );
}
