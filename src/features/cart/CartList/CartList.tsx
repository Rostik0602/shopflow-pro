import { useSelector } from "react-redux";
import type { RootState } from "../../../app/store";
import { useGetProductsQuery } from "../../../services/productApi";
import CartItem from "../CartItem/CartItem";
import Loader from "../../../components/Loader/Loader";
import EmptyState from "../../../components/EmptyState/EmptyState";
import { ShoppingCart } from "lucide-react";
import styles from "./CartList.module.scss";

export default function CartList() {
  const cart = useSelector((state: RootState) => state.cart);
  const { data: allProductsData, isFetching } = useGetProductsQuery();

  if (isFetching) return <Loader />;

  if (cart.length === 0) {
    return <EmptyState message="Your cart is empty" icon={ShoppingCart} />;
  }

  return (
    <ul className={styles.list}>
      {cart.map((cartItem) => {
        const product = allProductsData?.products.find(
          (p) => p.id === cartItem.id,
        );

        if (!product) {
          return null;
        }

        return (
          <li key={cartItem.id}>
            <CartItem product={product} quantity={cartItem.quantity} />
          </li>
        );
      })}
    </ul>
  );
}
