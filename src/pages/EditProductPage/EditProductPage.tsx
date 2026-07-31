import { useNavigate, useParams } from "react-router-dom";
import {
  useGetProductQuery,
  useGetProductsQuery,
  useUpdateProductMutation,
} from "../../services/productApi";
import type { CreateProductRequest } from "../../types/product";
import ProductForm from "../../features/products/ProductForm/ProductForm";
import Loader from "../../components/Loader/Loader";

export default function EditProductPage() {
  const { id } = useParams();

  const [updateProduct] = useUpdateProductMutation();

  const { data: productData, isFetching: productFetching } = useGetProductQuery(
    Number(id),
  );
  const { data: allProductData, isFetching: isAllProductsFetching } =
    useGetProductsQuery();

  const navigate = useNavigate();

  const categories = [
    ...new Set(allProductData?.products.map((p) => p.category) ?? []),
  ];

  const handleSubmit = async (data: CreateProductRequest) => {
    try {
      await updateProduct({ id: Number(id), ...data }).unwrap();
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  const isLoading = productFetching || isAllProductsFetching;

  if (isLoading) return <Loader />;

  return (
    <ProductForm
      product={productData ?? null}
      mode="edit"
      categories={categories}
      onSubmit={handleSubmit}
    />
  );
}
