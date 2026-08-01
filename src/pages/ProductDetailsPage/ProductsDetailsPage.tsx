import { Link, useParams } from "react-router-dom";
import { useGetProductQuery } from "../../services/productApi";
import Loader from "../../components/Loader/Loader";
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage";
import { useDispatch, useSelector } from "react-redux";
import Button from "../../components/Button/Button";
import { add } from "../../features/cart/cartSlice";
import FavoriteButton from "../../features/favorites/FavoriteButton/FavoriteButton";
import styles from "./ProductDetailsPage.module.scss";
import { ShoppingCart } from "lucide-react";
import type { RootState } from "../../app/store";
export default function ProductsDetails() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { data, isFetching, isError } = useGetProductQuery(Number(id));

  const cart = useSelector((state: RootState) => state.cart);
  const isInCart = data ? cart.some((item) => item.id === data.id) : false;

  return (
    <div className={styles.wrapper}>
      <Link to="/" className={styles.backLink}>
        ← Back to products
      </Link>

      {isFetching && <Loader />}
      {isError && <ErrorMessage />}

      {data && (
        <div className={styles.layout}>
          <div className={styles.imageWrapper}>
            <img
              src={data.thumbnail}
              alt={data.title}
              className={styles.image}
               loading="lazy"
            />
          </div>

          <div className={styles.info}>
            <h2 className={styles.title}>{data.title}</h2>
            <p className={styles.price}>${data.price}</p>
            <p className={styles.rating}>
              <span className={styles.star}>★</span> {data.rating} ·{" "}
              {data.brand}
            </p>
            <p className={styles.description}>{data.description}</p>

            <div className={styles.metaRow}>
              <span>Category: {data.category}</span>
              <span>Stock: {data.stock}</span>
              <span>{data.availabilityStatus}</span>
            </div>

            <div className={styles.actions}>
              <Button
                onClick={() => dispatch(add(data.id))}
                icon={ShoppingCart}
                disabled={isInCart}
              >
                {isInCart ? "In Cart" : "Add to Cart"}
              </Button>
              <FavoriteButton productId={data.id} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
