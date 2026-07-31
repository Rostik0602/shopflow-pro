import { useNavigate } from "react-router-dom";
import {
  useCreateProductMutation,
  useGetProductsQuery,
} from "../../services/productApi";
import type { CreateProductRequest } from "../../types/product";
import ProductForm from "../../features/products/ProductForm/ProductForm";
import Loader from "../../components/Loader/Loader";

export default function CreateProductPage() {
  const { data: allProductsData, isFetching } = useGetProductsQuery();
  const categories = [
    ...new Set(allProductsData?.products.map((p) => p.category) ?? []),
  ];

  const [createProduct] = useCreateProductMutation();
  const navigate = useNavigate();

  if (isFetching) return <Loader />;

  const handleSubmit = async (data: CreateProductRequest) => {
    try {
      await createProduct(data).unwrap();
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <ProductForm
      product={null}
      mode="create"
      categories={categories}
      onSubmit={handleSubmit}
    />
  );
}
