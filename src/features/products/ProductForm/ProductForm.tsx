import { useState } from "react";
import styles from "./ProductForm.module.scss";
import type {
  CreateProductRequest,
  FormMode,
  Product,
} from "../../../types/product";
import Input from "../../../components/Input/Input";
import Button from "../../../components/Button/Button";

interface ProductFormProps {
  product: Product | null;
  onSubmit: (data: CreateProductRequest) => void;
  mode: FormMode;
  categories: string[];
}

export default function ProductForm({
  onSubmit,
  mode,
  product,
  categories,
}: ProductFormProps) {
  const [title, setTitle] = useState(product?.title ?? "");
  const [price, setPrice] = useState(
    product?.price ? String(product.price) : "",
  );
  const [category, setCategory] = useState(product?.category ?? "");
  const [description, setDescription] = useState(product?.description ?? "");
  const [stock, setStock] = useState(
    product?.stock ? String(product.stock) : "",
  );
  const [thumbnail, setThumbnail] = useState(product?.thumbnail ?? "");
  const [rating, setRating] = useState(
    product?.rating ? String(product.rating) : "",
  );
  const [error, setError] = useState("");

  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!title.trim()) {
      setError("Title is required");
      return;
    }

    const numericRating = Number(rating) || 0;
    if (numericRating < 0 || numericRating > 5) {
      setError("Rating must be between 0 and 5");
      return;
    }

    if (!category.trim()) {
      setError("Category is required");
      return;
    }

    setError("");
    onSubmit({
      title,
      price: Number(price) || 0,
      category,
      description,
      stock: Number(stock) || 0,
      thumbnail,
      brand: product?.brand ?? "",
      images: product?.images ?? [],
      rating: Number(rating) || 0,
      tags: product?.tags ?? [],
      availabilityStatus: product?.availabilityStatus ?? "In Stock",
      returnPolicy: product?.returnPolicy ?? "",
    });
  };

  const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;

    if (value === "" || /^\d*\.?\d{0,2}$/.test(value)) {
      setPrice(value);
    }
  };

  return (
    <form className={styles.form} onSubmit={handleFormSubmit}>
      <h2 className={styles.title}>
        {mode === "create" ? "Add Product" : "Edit Product"}
      </h2>

      {error && <p className={styles.error}>{error}</p>}

      <Input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Title"
      />
      <Input
        type="number"
        value={price}
        onChange={handlePriceChange}
        placeholder="Price"
        step={0.1}
      />
      <Input
        type="text"
        list="categories-datalist"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        placeholder="Category"
      />
      <datalist id="categories-datalist">
        {categories.map((cat) => (
          <option value={cat} key={cat} />
        ))}
      </datalist>
      <Input
        type="text"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Description"
      />
      <Input
        type="number"
        value={stock}
        onChange={(e) => setStock(e.target.value)}
        placeholder="Stock"
      />
      <Input
        type="text"
        placeholder="Image URL"
        value={thumbnail}
        onChange={(e) => setThumbnail(e.target.value)}
      />
      <Input
        type="number"
        placeholder="Rating (0-5)"
        value={rating}
        onChange={(e) => setRating(e.target.value)}
        min={0}
        max={5}
        step={0.1}
      />

      <Button type="submit" className={styles.submitButton}>
        {mode === "create" ? "Create" : "Save"}
      </Button>
    </form>
  );
}
