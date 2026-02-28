import { Heart, ShoppingCart, Star } from "lucide-react";
import { useState } from "react";
import type { IProduct } from "../../interface";
import AddProductToCart from "../AddProductToCart";
import { Link } from "react-router-dom";
import Image from "./Image";

interface IProps {
  product: IProduct;
}

const ProductCard = ({ product }: IProps) => {
  const [isLiked, setIsLiked] = useState(false);

  console.log(product);
  const discountedPrice = product.discount
    ? product.price - (product.price * product.discount) / 100
    : product.price;

  return (
    <div className="group relative bg-white rounded-2xl p-4 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border border-gray-100 mx-2">
      {/* Discount Badge */}
      {product.discount && (
        <div className="absolute top-4 left-4 z-20">
          <div className="relative">
            <div className="bg-gradient-to-r from-red-500 to-pink-600 text-white px-3 py-1 rounded-full text-sm font-bold shadow-lg [animation:2s_ease-in-out_infinite_bounce-subtle]">
              -{product.discount}% OFF
            </div>
            <div className="absolute inset-0 bg-gradient-to-r from-red-500 to-pink-600 rounded-full blur-sm opacity-50 -z-10"></div>
          </div>
        </div>
      )}

      {/* Wishlist Button */}
      <button
        onClick={() => setIsLiked(!isLiked)}
        className={`absolute top-4 right-4 z-20 w-10 h-10 rounded-full backdrop-blur-sm flex items-center justify-center transition-all duration-300 ${
          isLiked
            ? "bg-red-500 text-white shadow-lg"
            : "bg-white/80 text-gray-600 hover:bg-white hover:text-red-500"
        } [animation:0.3s_ease-out_heart-pop]`}
      >
        <Heart className={`w-5 h-5 ${isLiked ? "fill-current" : ""}`} />
      </button>

      {/* Product Image */}
      <div className="relative overflow-hidden rounded-xl mb-4">
        <Image
          src={product.image}
          alt={product.title}
          className="w-full h-48 object-cover rounded-xl transition-transform duration-700 group-hover:scale-110"
        />

        {/* Quick View Overlay */}
        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
          <Link
            to={`/product/${product.id}`}
            className="bg-white text-gray-900 px-4 py-2 rounded-lg font-semibold transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300"
          >
            Quick View
          </Link>
        </div>
      </div>

      {/* Product Info */}
      <div className="space-y-3">
        {/* Rating */}
        {product?.reviews_avg_rating && (
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`w-4 h-4 ${
                    i < Math.floor(product?.reviews_avg_rating!)
                      ? "fill-yellow-400 text-yellow-400"
                      : "fill-gray-300 text-gray-300"
                  }`}
                />
              ))}
            </div>
            <span className="text-sm text-gray-600">
              ({product?.reviews_count})
            </span>
          </div>
        )}

        {/* Title */}
        <h3 className="font-semibold text-gray-900 line-clamp-2 group-hover:text-blue-600 transition-colors leading-tight">
          {product.title}
        </h3>

        {/* Description */}
        <p className="text-gray-600 text-sm line-clamp-2 leading-relaxed">
          {product.description}
        </p>

        {/* Price & Add to Cart */}
        <div className="flex items-center justify-between pt-2">
          <div className="flex items-center gap-2">
            <span className="text-xl font-bold text-gray-900">
              ${(+discountedPrice).toFixed(2)}
            </span>
            {product.discount && (
              <span className="text-sm text-gray-500 line-through">
                ${(+product.price).toFixed(2)}
              </span>
            )}
          </div>
          <AddProductToCart id={product.id} />
        </div>
      </div>

      {/* Hover Gradient Border */}
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-blue-500 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10">
        <div className="absolute inset-[2px] bg-white rounded-2xl"></div>
      </div>
    </div>
  );
};

export default ProductCard;
