import type { Product } from "../../../types/product";
import ProductCard from "../ProductCard/ProductCard";
import styles from "./ProductList.module.scss";
interface ProductListProps {
  products: Product[];
  onDelete?: (id: number) => void;
}
export default function ProductList({ products, onDelete }: ProductListProps) {
  return (
    <ul className={styles.list}>
      {products.map((product) => (
        <li key={product.id} className={styles.item}>
          <ProductCard product={product} onDelete={onDelete} />
        </li>
      ))}
    </ul>
  );
}
