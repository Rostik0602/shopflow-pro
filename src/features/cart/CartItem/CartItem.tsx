import { useDispatch } from "react-redux";
import type { Product } from "../../../types/product";
import { decrease, increase, remove } from "../cartSlice";
import Button from "../../../components/Button/Button";
import styles from "./CartItem.module.scss";

interface CartItemProps {
  product: Product;
  quantity: number;
}

export default function CartItem({ product, quantity }: CartItemProps) {
  const dispatch = useDispatch();

  const increment = () => {
    dispatch(increase(product.id));
  };

  const decrement = () => {
    dispatch(decrease(product.id));
  };

  const removeQuantity = () => {
    dispatch(remove(product.id));
  };
  return (
    <div className={styles.item}>
      <img
        src={product.thumbnail}
        alt={product.title}
        className={styles.image}
         loading="lazy"
      />

      <div className={styles.info}>
        <h3 className={styles.title}>{product.title}</h3>
        <p className={styles.price}>${product.price}</p>
      </div>

      <div className={styles.controls}>
        <Button onClick={decrement} variant="secondary">
          -
        </Button>
        <span className={styles.quantity}>{quantity}</span>
        <Button onClick={increment} variant="secondary">
          +
        </Button>
        <Button onClick={removeQuantity} variant="danger">
          Remove
        </Button>
      </div>
    </div>
  );
}
