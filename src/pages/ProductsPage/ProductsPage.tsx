import { useState, useEffect } from "react";
import styles from "./ProductsPage.module.scss";
import {
  useDeleteProductMutation,
  useGetProductsQuery,
  useSearchProductsQuery,
} from "../../services/productApi";
import type {
  CategoryFilter,
  SortDirection,
  SortType,
} from "../../types/product";
import useDebounce from "../../hooks/useDebounce";
import ProductList from "../../features/products/ProductList/ProductList";
import SearchBar from "../../features/products/SearchBar/SearchBar";
import Sort from "../../features/products/Sort/Sort";
import Filters from "../../features/products/Filters/Filters";
import Loader from "../../components/Loader/Loader";
import EmptyState from "../../components/EmptyState/EmptyState";
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage";
import Button from "../../components/Button/Button";

const LIMIT = 16;

export default function ProductsPage() {
  const [query, setQuery] = useState("");
  const debounceSearch = useDebounce(query, 600);

  const [filter, setFilter] = useState<CategoryFilter>("all");
  const [sort, setSort] = useState<SortType>("title");
  const [sortDirection, setSortDirection] = useState<SortDirection>("asc");
  const [page, setPage] = useState(0);

  useEffect(() => {
    setPage(0);
  }, [debounceSearch]);

  const {
    data: allProductData,
    error: allProductsError,
    isFetching: isAllProductsFetching,
  } = useGetProductsQuery(
    { limit: LIMIT, skip: page * LIMIT },
    { skip: debounceSearch !== "" },
  );

  const {
    data: searchData,
    error: searchError,
    isFetching: isSearchFetching,
  } = useSearchProductsQuery(debounceSearch, {
    skip: debounceSearch === "",
  });

  const [deleteProduct] = useDeleteProductMutation();

  const handleDelete = (id: number) => {
    deleteProduct(id);
  };

  const handleFilterChange = (category: CategoryFilter) => {
    setFilter(category);
    setPage(0);
  };

  const handleSortClick = (newSort: SortType) => {
    if (newSort === "title") {
      setSort("title");
      setSortDirection("asc");
      return;
    }

    if (sort === newSort) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSort(newSort);
      setSortDirection("asc");
    }
  };

  const productToShow = debounceSearch
    ? searchData?.products
    : allProductData?.products;

  const filteredProduct = productToShow?.filter((item) => {
    if (filter === "all") return true;
    return item.category === filter;
  });

  const sortedProduct = [...(filteredProduct ?? [])].sort((a, b) => {
    let result = 0;

    if (sort === "title") {
      result = a.title.localeCompare(b.title);
    } else if (sort === "price") {
      result = a.price - b.price;
    } else if (sort === "rating") {
      result = a.rating - b.rating;
    }

    return sortDirection === "asc" ? result : -result;
  });

  const categories = [...new Set(productToShow?.map((p) => p.category) ?? [])];

  const isLoading = isAllProductsFetching || isSearchFetching;
  const isError = Boolean(allProductsError) || Boolean(searchError);
  const isEmpty = !isLoading && !isError && sortedProduct.length === 0;

  const total = allProductData?.total ?? 0;
  const totalPages = Math.ceil(total / LIMIT);
  const showPagination = !debounceSearch && totalPages > 1;

  return (
    <div className={styles.pageWrapper}>
      <div className={styles.toolbar}>
        <SearchBar value={query} onChange={(e) => setQuery(e.target.value)} />
        <Filters
          categories={categories}
          value={filter}
          onChange={handleFilterChange}
        />
        <Sort
          value={sort}
          direction={sortDirection}
          onClick={handleSortClick}
        />
      </div>

      {isLoading && <Loader />}
      {isError && <ErrorMessage />}
      {isEmpty && <EmptyState />}

      {!isLoading && !isError && !isEmpty && (
        <ProductList products={sortedProduct} onDelete={handleDelete} />
      )}

      {showPagination && !isLoading && !isError && (
        <div className={styles.pagination}>
          <Button
            onClick={() => setPage((p) => p - 1)}
            disabled={page === 0}
            variant="secondary"
          >
            ← Previous
          </Button>

          <span className={styles.pageInfo}>
            {page + 1} / {totalPages}
          </span>

          <Button
            onClick={() => setPage((p) => p + 1)}
            disabled={page >= totalPages - 1}
            variant="secondary"
          >
            Next →
          </Button>
        </div>
      )}
    </div>
  );
}
