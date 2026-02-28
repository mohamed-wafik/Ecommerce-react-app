import { useMemo, useReducer, useCallback } from "react";
import ProductCard from "../components/ui/ProductCard";
import type { IProduct } from "../interface";
import { Menu } from "lucide-react";
import useAuthentienticatedQuery from "../hook/useAuthentienticatedQuery";
import { ProductCardSkeleton } from "../components/Skeleton/ProductCardSkeleton";
import CategoriesFilter from "../components/CategoriesFilter";
import SkeletonPagination from "../components/Skeleton/SkeletonPagination";
import Pagination from "../components/ui/Pagnation";
import { useSearchParams } from "react-router-dom";

interface IShopState {
  page: number;
  category: number | null;
  priceRange: [number, number];
  onlyDiscounted: boolean;
  minRating: number;
  isOpen: boolean;
}

type ShopAction =
  | { type: "SET_PAGE"; payload: number }
  | { type: "SET_CATEGORY"; payload: number | null }
  | { type: "SET_PRICE_RANGE"; payload: [number, number] }
  | { type: "SET_ONLY_DISCOUNTED"; payload: boolean }
  | { type: "SET_MIN_RATING"; payload: number }
  | { type: "TOGGLE_SIDEBAR" }
  | { type: "RESET_FILTERS"; payload: number }; // maxPrice

function reducer(state: IShopState, action: ShopAction): IShopState {
  switch (action.type) {
    case "SET_PAGE":
      return { ...state, page: action.payload };
    case "SET_CATEGORY":
      return { ...state, category: action.payload, page: 1 };
    case "SET_PRICE_RANGE":
      return { ...state, priceRange: action.payload, page: 1 };
    case "SET_ONLY_DISCOUNTED":
      return { ...state, onlyDiscounted: action.payload, page: 1 };
    case "SET_MIN_RATING":
      return { ...state, minRating: action.payload, page: 1 };
    case "TOGGLE_SIDEBAR":
      return { ...state, isOpen: !state.isOpen };
    case "RESET_FILTERS":
      return {
        ...state,
        category: null,
        onlyDiscounted: false,
        minRating: 0,
        priceRange: [0, action.payload],
        page: 1,
      };
    default:
      return state;
  }
}

const ProductsPage = () => {
  const [params] = useSearchParams();
  const searchParam = params.get("search") || "";

  const [state, dispatch] = useReducer(reducer, {
    page: 1,
    category: null,
    priceRange: [0, 2500],
    onlyDiscounted: false,
    minRating: 0,
    isOpen: false,
  });

  const { page, category, priceRange, onlyDiscounted, minRating, isOpen } =
    state;

  const queryParams = useMemo(() => {
    const params: string[] = [`page=${page}`];

    if (searchParam) params.push(`search=${encodeURIComponent(searchParam)}`);
    if (category !== null) params.push(`category=${category}`);
    if (priceRange[0] > 0) params.push(`min_price=${priceRange[0]}`);
    if (priceRange[1] < 2500) params.push(`max_price=${priceRange[1]}`);
    if (onlyDiscounted) params.push(`only_discounted=1`);
    if (minRating > 0) params.push(`min_rating=${minRating}`);

    return `?${params.join("&")}`;
  }, [category, priceRange, onlyDiscounted, minRating, searchParam, page]);

  const { data, isLoading } = useAuthentienticatedQuery({
    queryKey: ["products", queryParams],
    url: `/products${queryParams}`,
  });

  const maxPrice = useMemo(() => {
    if (!data?.data?.data) return 2500;
    const prices = data.data.data.map((p: IProduct) => p.price);
    return prices.length > 0 ? Math.max(...prices) : 2500;
  }, [data]);

  // Check if filters are active
  const hasActiveFilters =
    category !== null ||
    onlyDiscounted ||
    minRating > 0 ||
    priceRange[0] > 0 ||
    priceRange[1] < maxPrice ||
    searchParam.trim() !== "";

  const clearAllFilters = useCallback(() => {
    dispatch({ type: "RESET_FILTERS", payload: maxPrice });
  }, [maxPrice]);

  const toggleSidebar = useCallback(() => {
    dispatch({ type: "TOGGLE_SIDEBAR" });
  }, []);

  const handlePriceChange = useCallback(
    (index: 0 | 1, value: number) => {
      const newRange: [number, number] =
        index === 0 ? [value, priceRange[1]] : [priceRange[0], value];
      dispatch({ type: "SET_PRICE_RANGE", payload: newRange });
    },
    [priceRange],
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-gray-300">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Our Products</h1>
              <p className="text-gray-600 mt-1">
                Discover amazing products at great prices
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="flex gap-8">
          {/* Sidebar Overlay */}
          {isOpen && (
            <div
              className="fixed inset-0 bg-black/5 backdrop-blur-sm z-50 lg:hidden"
              onClick={toggleSidebar}
              aria-label="Close sidebar"
            />
          )}

          {/* Sidebar Filters */}
          <aside className="lg:w-80 flex-shrink-0">
            <button
              className="lg:hidden p-2 text-gray-700 hover:text-primary transition cursor-pointer"
              onClick={toggleSidebar}
              aria-label="Toggle filters"
            >
              <Menu size={28} />
            </button>

            <div
              className={`w-[300px] lg:w-full h-full bg-white rounded-xl shadow-sm border border-gray-200 p-6 fixed inset-0 overflow-y-auto lg:sticky lg:top-24 z-50 lg:z-0 transition-transform duration-300 ${
                isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
              }`}
            >
              {/* Filters Header */}
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-gray-900">Filters</h2>
                {hasActiveFilters && (
                  <button
                    onClick={clearAllFilters}
                    className="text-sm text-blue-600 hover:text-blue-700 font-medium transition-colors"
                  >
                    Clear all
                  </button>
                )}
              </div>

              {/* Categories */}
              <div className="mb-6">
                <h3 className="font-medium text-gray-900 mb-3">Categories</h3>
                <CategoriesFilter
                  selectedCategory={category}
                  setSelectedCategory={(val) =>
                    dispatch({ type: "SET_CATEGORY", payload: val })
                  }
                />
              </div>

              {/* Price Range */}
              <div className="mb-6">
                <h3 className="font-medium text-gray-900 mb-3">Price Range</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between text-sm text-gray-600">
                    <span>${priceRange[0]}</span>
                    <span>${priceRange[1]}</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max={maxPrice}
                    value={priceRange[0]}
                    onChange={(e) =>
                      handlePriceChange(0, Number(e.target.value))
                    }
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
                    aria-label="Minimum price"
                  />
                  <input
                    type="range"
                    min="0"
                    max={maxPrice}
                    value={priceRange[1]}
                    onChange={(e) =>
                      handlePriceChange(1, Number(e.target.value))
                    }
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
                    aria-label="Maximum price"
                  />
                </div>
              </div>

              {/* Discount */}
              <div className="mb-6">
                <h3 className="font-medium text-gray-900 mb-3">Discount</h3>
                <label className="flex items-center cursor-pointer group">
                  <input
                    type="checkbox"
                    checked={onlyDiscounted}
                    onChange={(e) =>
                      dispatch({
                        type: "SET_ONLY_DISCOUNTED",
                        payload: e.target.checked,
                      })
                    }
                    className="sr-only"
                  />
                  <div
                    className={`w-5 h-5 border-2 rounded mr-3 flex items-center justify-center transition-colors ${
                      onlyDiscounted
                        ? "border-blue-500 bg-blue-500"
                        : "border-gray-300 group-hover:border-gray-400"
                    }`}
                  >
                    {onlyDiscounted && (
                      <svg
                        className="w-3 h-3 text-white"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={3}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                    )}
                  </div>
                  <span className="text-gray-700 group-hover:text-gray-900">
                    On Sale Only
                  </span>
                </label>
              </div>

              {/* Rating */}
              <div className="mb-6">
                <h3 className="font-medium text-gray-900 mb-3">
                  Minimum Rating
                </h3>
                <select
                  value={minRating}
                  onChange={(e) =>
                    dispatch({
                      type: "SET_MIN_RATING",
                      payload: Number(e.target.value),
                    })
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm transition-shadow"
                >
                  <option value={0}>All ratings</option>
                  <option value={1}>⭐ 1 star & up</option>
                  <option value={2}>⭐⭐ 2 stars & up</option>
                  <option value={3}>⭐⭐⭐ 3 stars & up</option>
                  <option value={4}>⭐⭐⭐⭐ 4 stars & up</option>
                  <option value={5}>⭐⭐⭐⭐⭐ 5 stars only</option>
                </select>
              </div>
            </div>
          </aside>

          {/* Main Content */}
          <main className="flex-1">
            {isLoading ? (
              <>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                  {Array.from({ length: 10 }).map((_, idx) => (
                    <ProductCardSkeleton key={idx} />
                  ))}
                </div>
                <SkeletonPagination />
              </>
            ) : data?.data?.data?.length > 0 ? (
              <>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                  {data.data.data.map((product: IProduct) => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>
                <Pagination
                  setPage={(val) =>
                    dispatch({ type: "SET_PAGE", payload: val })
                  }
                  page={data.data.current_page}
                  isLoading={isLoading}
                  pageSize={data.data.last_page}
                />
              </>
            ) : (
              <div className="text-center py-12">
                <div className="w-24 h-24 mx-auto mb-4 text-gray-300">
                  <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1}
                      d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"
                    />
                  </svg>
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  No products found
                </h3>
                <p className="text-gray-600 mb-4">
                  Try adjusting your filters or search terms
                </p>
                {hasActiveFilters && (
                  <button
                    onClick={clearAllFilters}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    Clear all filters
                  </button>
                )}
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
};

export default ProductsPage;
