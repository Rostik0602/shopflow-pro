import type { RootState } from "../../../app/store";
import { useDispatch, useSelector } from "react-redux";
import { add, remove } from "../favoritesSlice";
import Button from "../../../components/Button/Button";
import { Heart } from "lucide-react";
import styles from "./FavoriteButton.module.scss";
interface FavoriteButtonProps {
  productId: number;
}

export default function FavoriteButton({ productId }: FavoriteButtonProps) {
  const dispatch = useDispatch();
  const favorites = useSelector((state: RootState) => state.favorites);

  const isFavorites = favorites.includes(productId);

  const handleClick = () => {
    if (isFavorites) {
      dispatch(remove(productId));
    } else {
      dispatch(add(productId));
    }
  };

  return (
    <div className={styles.favoriteWrapper}>
      <Button onClick={handleClick} variant="secondary">
        <Heart
          size={15}
          fill={isFavorites ? "#B94A3F" : "none"}
          color={isFavorites ? "#B94A3F" : "currentColor"}
        />
        {isFavorites ? "Remove from Favorites" : "Add to Favorites"}
      </Button>
    </div>
  );
}
