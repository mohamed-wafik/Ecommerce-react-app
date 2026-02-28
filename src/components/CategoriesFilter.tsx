import useAuthentienticatedQuery from "../hook/useAuthentienticatedQuery";
import type { ICategory } from "../interface";
interface IProps {
  selectedCategory: number | null;
  setSelectedCategory: (val: number | null) => void;
}
const CategoriesFilter = ({
  selectedCategory,
  setSelectedCategory,
}: IProps) => {
  const { data, isLoading } = useAuthentienticatedQuery({
    queryKey: ["categories"],
    url: "/categories",
  });
  const renderSkeleton = Array.from({ length: 5 }).map((_, idx) => (
    <div key={idx} className="h-4 bg-gray-200 rounded animate-pulse mb-2" />
  ));
  return (
    <div className="space-y-2">
      {isLoading ? (
        renderSkeleton
      ) : data && data.data.length ? (
        data.data.map((category: ICategory) => (
          <label
            key={category.id}
            className="flex items-center cursor-pointer group"
          >
            <input
              type="radio"
              name="category"
              checked={selectedCategory === category.id}
              onChange={() =>
                setSelectedCategory(
                  selectedCategory === category.id ? null : category.id
                )
              }
              className="sr-only"
            />
            <div
              className={`w-4 h-4 border-2 rounded-full mr-3 flex items-center justify-center ${
                selectedCategory === category.id
                  ? "border-blue-500 bg-blue-500"
                  : "border-gray-300 group-hover:border-gray-400"
              }`}
            >
              {selectedCategory === category.id && (
                <div className="w-2 h-2 bg-white rounded-full" />
              )}
            </div>
            <span className="text-gray-700 group-hover:text-gray-900">
              {category.title}
            </span>
          </label>
        ))
      ) : (
        <p className="text-blue-500 text-center font-medium ">
          Not found Category
        </p>
      )}
    </div>
  );
};

export default CategoriesFilter;
