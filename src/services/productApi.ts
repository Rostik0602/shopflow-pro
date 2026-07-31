import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type {
  CreateProductRequest,
  Product,
  ProductResponse,
  UpdateProductRequest,
} from "../types/product";
import type { RootState } from "../app/store";

interface ProductsParams {
  limit?: number;
  skip?: number;
}

export const productApi = createApi({
  reducerPath: "productApi",

  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_API_URL,

    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as RootState).auth.token;

      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),

  tagTypes: ["Products"],

  endpoints: (builder) => ({
    getProducts: builder.query<ProductResponse, ProductsParams | void>({
      query: (params) => {
        const limit = params?.limit ?? 16;
        const skip = params?.skip ?? 0;
        return `/products?limit=${limit}&skip=${skip}`;
      },
      providesTags: ["Products"],
    }),

    getProduct: builder.query<Product, number>({
      query: (id) => `/products/${id}`,
      providesTags: ["Products"],
    }),

    searchProducts: builder.query<ProductResponse, string>({
      query: (search) => `/products/search?q=${encodeURIComponent(search)}`,
      providesTags: ["Products"],
    }),

    createProduct: builder.mutation<Product, CreateProductRequest>({
      query: (product) => ({
        url: "/products",
        method: "POST",
        body: product,
      }),

      invalidatesTags: ["Products"],
    }),

    updateProduct: builder.mutation<Product, UpdateProductRequest>({
      query: (product) => ({
        url: `/products/${product.id}`,
        method: "PUT",
        body: product,
      }),

      invalidatesTags: ["Products"],
    }),

    deleteProduct: builder.mutation<void, number>({
      query: (id) => ({
        url: `/products/${id}`,
        method: "DELETE",
      }),

      async onQueryStarted(id, { dispatch, queryFulfilled }) {
        const patchResult = dispatch(
          productApi.util.updateQueryData("getProducts", undefined, (draft) => {
            draft.products = draft.products.filter((p) => p.id !== id);
          }),
        );

        try {
          await queryFulfilled;
        } catch {
          patchResult.undo();
        }
      },
    }),
  }),
});

export const {
  useGetProductsQuery,
  useGetProductQuery,
  useSearchProductsQuery,
  useCreateProductMutation,
  useUpdateProductMutation,
  useDeleteProductMutation,
} = productApi;
