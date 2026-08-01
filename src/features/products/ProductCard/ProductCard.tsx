import { useDispatch, useSelector } from "react-redux";
import type { Product } from "../../../types/product";
import { add } from "../../cart/cartSlice";
import {
  remove as removeFavorite,
  add as addFavorite,
} from "../../favorites/favoritesSlice";
import Button from "../../../components/Button/Button";
import { Link } from "react-router-dom";
import { useState } from "react";
import Modal from "../../../components/Modal/Modal";
import type { RootState } from "../../../app/store";
import { ShoppingCart, Trash2, Heart } from "lucide-react";
import styles from "./ProductCard.module.scss";

interface ProductCardProps {
  product: Product;
  onDelete?: (id: number) => void;
}

export default function ProductCard({ product, onDelete }: ProductCardProps) {
  const dispatch = useDispatch();
  const cart = useSelector((state: RootState) => state.cart);
  const favorites = useSelector((state: RootState) => state.favorites);
  const isInCart = cart.some((item) => item.id === product.id);
  const isFavorite = favorites.includes(product.id);
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);

  const handleAddToCart = () => {
    dispatch(add(product.id));
  };

  const handleToggleFavorite = () => {
    dispatch(isFavorite ? removeFavorite(product.id) : addFavorite(product.id));
  };

  const handleDeleteClick = () => {
    setIsConfirmOpen(true);
  };

  const handleConfirmDelete = () => {
    onDelete?.(product.id);
    setIsConfirmOpen(false);
  };

  return (
    <div className={styles.card}>
      <div className={styles.imageWrapper}>
        <img
          src={product.thumbnail}
          alt={product.title}
          className={styles.image}
           loading="lazy"
        />

        <div className={styles.floatingActions}>
          {onDelete && (
            <button
              className={styles.deleteFloat}
              onClick={handleDeleteClick}
              aria-label="Delete product"
            >
              <Trash2 size={16} />
            </button>
          )}
          <button
            className={styles.favoriteFloat}
            onClick={handleToggleFavorite}
            aria-label="Toggle favorite"
          >
            <Heart
              size={17}
              fill={isFavorite ? "#B94A3F" : "none"}
              color={isFavorite ? "#B94A3F" : "#27272A"}
            />
          </button>
        </div>

        {product.category && (
          <span className={styles.categoryBadge}>{product.category}</span>
        )}
      </div>

      <div className={styles.content}>
        <h3 className={styles.title}>{product.title}</h3>

        <div className={styles.meta}>
          <span className={styles.price}>${product.price}</span>
          <span className={styles.rating}>
            <span className={styles.star}>★</span> {product.rating}
          </span>
        </div>

        <div className={styles.links}>
          <Link to={`/products/${product.id}`}>Details</Link>
          <span className={styles.divider}>·</span>
          <Link to={`/products/edit/${product.id}`}>Edit</Link>
        </div>

        <Button
          onClick={handleAddToCart}
          disabled={isInCart}
          icon={ShoppingCart}
          className={styles.addToCart}
        >
          {isInCart ? "In Cart" : "Add to Cart"}
        </Button>
      </div>

      {isConfirmOpen && (
        <Modal onClose={() => setIsConfirmOpen(false)}>
          <p>Are you sure you want to delete this product?</p>
          <Button onClick={handleConfirmDelete} variant="danger-solid">
            Yes, delete
          </Button>
          <Button onClick={() => setIsConfirmOpen(false)} variant="secondary">
            Cancel
          </Button>
        </Modal>
      )}
    </div>
  );
}
