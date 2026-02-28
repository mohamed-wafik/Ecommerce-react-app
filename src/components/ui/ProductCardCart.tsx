import { Heart, Trash2, Plus, Minus } from "lucide-react";
import type { IProduct } from "../../interface";
import { useCart } from "../../store/useCart";
import toast from "react-hot-toast";
import Image from "./Image";

interface IProps {
  id: number;
  quantity: number;
  product: IProduct;
  isLoading?: boolean;
  setIsLoading?: (value: boolean) => void;
}

const ProductCardCart = ({
  id,
  quantity,
  product,
  isLoading,
  setIsLoading,
}: IProps) => {
  const { removeItem, updateItem } = useCart();

  const handlerUpdateItem = async (type: "plus" | "minus") => {
    if (isLoading) return;

    let updatedQuantity = quantity;
    setIsLoading?.(true);

    if (type === "plus") {
      updatedQuantity++;

      if (updatedQuantity > product.stock) {
        setIsLoading?.(false);
        toast.error("Not enough stock available");
        return;
      }
    }

    if (type === "minus") {
      updatedQuantity--;

      if (updatedQuantity <= 0) {
        setIsLoading?.(false);
        toast.error("Quantity can’t be less than 1");
        return;
      }
    }

    await updateItem(id, updatedQuantity);

    setIsLoading?.(false);
  };

  const handlerRemoveItem = async () => {
    if (isLoading) return;

    setIsLoading?.(true);
    await removeItem(id);
    setIsLoading?.(false);
  };

  return (
    <div className="cart-item p-6 border-b border-gray-200 flex flex-col md:flex-row">
      <div className="md:w-1/4 mb-4 md:mb-0">
        <Image
          src={product.image}
          alt={product.title}
          className="w-full h-40 object-cover rounded-lg"
        />
      </div>

      <div className="md:w-3/4 md:pl-6">
        <div className="flex justify-between">
          <div>
            <h3 className="text-lg font-semibold text-dark">{product.title}</h3>

            {/* Rating */}
            <div className="flex items-center mt-2 text-amber-400 text-sm">
              {[...Array(5)].map((_, i) => (
                <span key={i}>
                  {i < Math.round(product.reviews_avg_rating || 0) ? "★" : "☆"}
                </span>
              ))}

              <span className="text-gray-500 text-sm ml-2">
                ({product.reviews_count})
              </span>
            </div>
          </div>

          <div className="text-right">
            <p className="text-lg font-bold text-dark">
              ${(+product.price).toFixed(2)}
            </p>

            {product.discount && (
              <p className="text-green-600 text-sm font-semibold mt-1">
                You save ${(+product.discount).toFixed(2)}
              </p>
            )}
          </div>
        </div>

        {/* Quantity + Actions */}
        <div className="flex justify-between items-center mt-4">
          {/* Quantity Selector */}
          <div className="flex items-center">
            <span className="text-gray-700 mr-3">Quantity:</span>
            <div className="flex items-center border border-gray-300 rounded-lg">
              <button
                onClick={() => handlerUpdateItem("minus")}
                disabled={isLoading}
                className="px-3 py-1 text-gray-600 hover:bg-gray-100 rounded-l-lg cursor-pointer"
              >
                <Minus className="w-4 h-4" />
              </button>

              <span className="px-4 py-1 border-l border-r border-gray-300">
                {quantity}
              </span>

              <button
                onClick={() => handlerUpdateItem("plus")}
                disabled={isLoading}
                className="px-3 py-1 text-gray-600 hover:bg-gray-100 rounded-r-lg cursor-pointer"
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Actions */}
          <div className="flex space-x-4">
            <button
              disabled={isLoading}
              className="text-primary hover:text-secondary transition-colors flex items-center cursor-pointer"
            >
              <Heart className="w-4 h-4 mr-1" /> Save for later
            </button>

            <button
              disabled={isLoading}
              onClick={handlerRemoveItem}
              className="text-red-500 hover:text-red-700 transition-colors flex items-center cursor-pointer"
            >
              <Trash2 className="w-4 h-4 mr-1" /> Remove
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCardCart;
