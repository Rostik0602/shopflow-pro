import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../../../app/store";
import { useGetProductsQuery } from "../../../services/productApi";
import Loader from "../../../components/Loader/Loader";
import { useState } from "react";
import { clear } from "../cartSlice";
import Button from "../../../components/Button/Button";
import Modal from "../../../components/Modal/Modal";
import styles from "./CartSummary.module.scss";
export default function CartSummary() {
  const cart = useSelector((state: RootState) => state.cart);
  const dispatch = useDispatch();
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);

  const quant = cart.reduce((sum, item) => sum + item.quantity, 0);

  const { data: allProductsData, isFetching } = useGetProductsQuery();

  if (isFetching) return <Loader />;

  const total = cart.reduce((sum, cartItem) => {
    const product = allProductsData?.products.find((p) => p.id === cartItem.id);

    if (!product) {
      return sum;
    }

    return sum + product.price * cartItem.quantity;
  }, 0);

  const handleClearConfirm = () => {
    dispatch(clear());
    setIsConfirmOpen(false);
  };

  return (
    <div className={styles.summary}>
      <div className={styles.row}>
        <span className={styles.label}>Total items:</span>
        <span>{quant}</span>
      </div>
      <div className={styles.row}>
        <span className={styles.label}>Total price:</span>
        <span className={styles.total}>${total.toFixed(2)}</span>
      </div>
      <Button
        onClick={() => setIsConfirmOpen(true)}
        variant="danger"
        className={styles.clearButton}
      >
        Clear Cart
      </Button>

      {isConfirmOpen && (
        <Modal onClose={() => setIsConfirmOpen(false)}>
          <p>Are you sure you want to clear the cart?</p>
          <Button onClick={handleClearConfirm} variant="danger-solid">
            Yes, clear
          </Button>
          <Button onClick={() => setIsConfirmOpen(false)} variant="secondary">
            Cancel
          </Button>
        </Modal>
      )}
    </div>
  );
}
