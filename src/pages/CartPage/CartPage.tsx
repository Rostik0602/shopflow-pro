import { useSelector } from "react-redux";
import type { RootState } from "../../app/store";
import CartList from "../../features/cart/CartList/CartList";
import CartSummary from "../../features/cart/CartSummary/CartSummary";
import styles from "./CartPage.module.scss";

export default function CartPage() {
  const cart = useSelector((state: RootState) => state.cart);

  return (
    <div className={styles.page}>
      <CartList />
      {cart.length > 0 && <CartSummary />}
    </div>
  );
}
