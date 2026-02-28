import React, { useState } from "react";
import {
  Star,
  StarHalf,
  Eye,
  Minus,
  Plus,
  ShoppingCart,
  Bolt,
  Heart,
  Shield,
  Truck,
  Undo2,
  Headphones,
  Flag,
  ThumbsUp,
} from "lucide-react";
import { useParams } from "react-router-dom";
import useAuthentienticatedQuery from "../hook/useAuthentienticatedQuery";
import ReviewModel from "../components/ui/ReviewModel";
import type { IReview } from "../interface";
import Button from "../components/ui/Button";
import { useCart } from "../store/useCart";
import SingleProductSkeleton from "../components/Skeleton/SingleProductSkeleton";
import Image from "../components/ui/Image";

const SingleProduct = () => {
  const { id } = useParams();
  const { addItem, isLoadingCart } = useCart();
  const [isChange, setIsChange] = useState<boolean>(false);
  const { data, isLoading } = useAuthentienticatedQuery({
    queryKey: [`single_product ${isChange}`],
    url: `products/${id}`,
  });

  const gallery = [
    "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=500&q=80",
    "https://images.unsplash.com/photo-1484704849700-f032a568e944?auto=format&fit=crop&w=500&q=80",
    "https://images.unsplash.com/photo-1583394838336-acd977736f90?auto=format&fit=crop&w=500&q=80",
    "https://images.unsplash.com/photo-1521334884684-d80222895322?auto=format&fit=crop&w=500&q=80",
  ];

  const [selectedColor, setSelectedColor] = useState("Black");
  const colors = [
    { name: "Black", class: "bg-black" },
    { name: "Silver", class: "bg-gray-400" },
    { name: "Navy Blue", class: "bg-blue-900" },
    { name: "Burgundy", class: "bg-red-700" },
  ];

  const [quantity, setQuantity] = useState(1);

  const decreaseQuantity = () => {
    if (quantity > 1) setQuantity(quantity - 1);
  };

  const increaseQuantity = () => {
    setQuantity(quantity + 1);
  };

  const [activeTab, setActiveTab] = useState("reviews");

  if (isLoading) return <SingleProductSkeleton />;

  const [mainImage, setMainImage] = useState(
    data.data.image ||
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=1000&q=80",
  );

  const discountedPrice = data.data.discount
    ? data.data.price - (data.data.price * data.data.discount) / 100
    : data.data.price;

  return (
    <section className="py-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row gap-8">
          <div className="lg:w-1/2">
            <div className="bg-white rounded-xl shadow-md p-4 mb-4">
              <Image
                src={mainImage}
                alt="Product"
                className="w-full h-96 object-cover rounded-lg"
              />
            </div>

            {/* IMAGE GALLERY */}
            <div className="grid grid-cols-4 gap-4">
              {gallery.map((img, index) => (
                <Image
                  key={index}
                  src={img}
                  onClick={() => setMainImage(img)}
                  className={`w-full h-24 object-cover rounded-lg border-2 cursor-pointer ${
                    img === mainImage ? "border-primary" : "border-transparent"
                  }`}
                />
              ))}
            </div>
          </div>

          {/* -------------------------- */}
          {/* PRODUCT INFO */}
          {/* -------------------------- */}
          <div className="lg:w-1/2">
            <div className="bg-white rounded-xl shadow-md p-6">
              {/* Badges */}
              <div className="mb-4">
                <span className="bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded">
                  In Stock ({data.data.stock})
                </span>
                <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded ml-2">
                  Free Shipping
                </span>
              </div>

              <h1 className="text-3xl font-bold text-dark mb-2">
                {data.data.title}
              </h1>

              {/* Ratings */}
              <div className="flex items-center mb-4">
                <div className="flex text-amber-400">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 ${
                        i < Math.floor(data.data?.reviews_avg_rating!)
                          ? "fill-yellow-400 text-yellow-400"
                          : "fill-gray-300 text-gray-300"
                      }`}
                    />
                  ))}
                </div>
                <span className="text-gray-500 text-sm ml-2">
                  ({data.data.reviews_count || 0} reviews)
                </span>
                <span className="text-gray-500 text-sm ml-4 flex items-center">
                  <Eye className="mr-1 w-4 h-4" /> 2.5k views
                </span>
              </div>

              {/* Price */}
              <div className="mb-6">
                <span className="text-3xl font-bold text-dark">
                  ${Number(discountedPrice).toFixed(2)}
                </span>
                {data.data.discount && (
                  <>
                    <span className="text-lg text-gray-500 line-through ml-2">
                      ${data.data.price}
                    </span>
                    <span className="text-green-600 font-semibold ml-2">
                      Save {Number(data.data.discount).toFixed(2)}%
                    </span>
                  </>
                )}
              </div>

              <p className="text-gray-600 mb-6">{data.data.description}</p>

              {/* Color Select */}
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-dark mb-3">
                  Color: <span>{selectedColor}</span>
                </h3>

                <div className="flex space-x-3">
                  {colors.map((c) => (
                    <div
                      key={c.name}
                      onClick={() => setSelectedColor(c.name)}
                      className={`w-10 h-10 rounded-full border-2 cursor-pointer ${
                        c.class
                      } ${
                        selectedColor === c.name
                          ? "border-primary"
                          : "border-gray-300"
                      }`}
                    ></div>
                  ))}
                </div>
              </div>

              {/* Quantity */}
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-dark mb-3">
                  Quantity
                </h3>
                <div className="flex items-center">
                  <button
                    onClick={decreaseQuantity}
                    className="w-10 h-10 flex items-center justify-center border border-gray-300 rounded-l-lg hover:bg-gray-100"
                  >
                    <Minus />
                  </button>

                  <span className="w-12 h-10 flex items-center justify-center border-t border-b border-gray-300">
                    {quantity}
                  </span>

                  <button
                    onClick={increaseQuantity}
                    className="w-10 h-10 flex items-center justify-center border border-gray-300 rounded-r-lg hover:bg-gray-100"
                  >
                    <Plus />
                  </button>

                  <span className="text-gray-500 text-sm ml-4">
                    Only 12 left
                  </span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col items-center sm:flex-row gap-4 mb-6">
                <Button
                  width={"full"}
                  size={"lg"}
                  loading={isLoadingCart}
                  onClick={() => addItem(data.data.id, quantity)}
                >
                  <ShoppingCart className="mr-2" /> Add to Cart
                </Button>

                <Button
                  className="bg-accent hover:bg-yellow-500"
                  width={"full"}
                  size={"lg"}
                >
                  <Bolt className="mr-2" /> Buy Now
                </Button>

                <Button size={"lg"} variant={"outline"}>
                  <Heart />
                </Button>
              </div>

              {/* Features */}
              <div className="border-t border-gray-200 pt-4 grid grid-cols-2 gap-4">
                <div className="flex items-center">
                  <Shield className="text-primary mr-2" />{" "}
                  <span>2-Year Warranty</span>
                </div>
                <div className="flex items-center">
                  <Truck className="text-primary mr-2" />{" "}
                  <span>Free Shipping</span>
                </div>
                <div className="flex items-center">
                  <Undo2 className="text-primary mr-2" />{" "}
                  <span>30-Day Returns</span>
                </div>
                <div className="flex items-center">
                  <Headphones className="text-primary mr-2" />{" "}
                  <span>24/7 Support</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12 bg-white rounded-xl shadow-md overflow-hidden">
          <div className="border-b border-gray-200">
            <ul className="flex flex-wrap text-sm font-medium">
              {["description", "specifications", "reviews", "shipping"].map(
                (tab) => (
                  <li key={tab}>
                    <button
                      onClick={() => setActiveTab(tab)}
                      className={`p-4 border-b-2 ${
                        activeTab === tab
                          ? "border-primary text-primary"
                          : "border-transparent"
                      }`}
                    >
                      {tab === "reviews"
                        ? `Reviews (${data.data.reviews_count || 0})`
                        : tab.charAt(0).toUpperCase() + tab.slice(1)}
                    </button>
                  </li>
                ),
              )}
            </ul>
          </div>

          {/* CONTENT */}
          <div className="p-6">
            {activeTab === "description" && (
              <p className="text-gray-600">Full product description...</p>
            )}
            {activeTab === "specifications" && (
              <p className="text-gray-600">
                Technical specification table here...
              </p>
            )}
            {activeTab === "shipping" && (
              <p className="text-gray-600">Shipping & return details...</p>
            )}

            {/* REVIEWS TAB */}
            {activeTab === "reviews" && (
              <div>
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-xl font-semibold text-dark ">
                    Customer Reviews
                  </h3>
                  <ReviewModel
                    id={data.data.id}
                    isChange={isChange}
                    setIsChange={setIsChange}
                  />
                </div>

                <div className="bg-white border rounded-lg p-6 mb-6">
                  {data.data && data.data.reviews.length ? (
                    data.data.reviews.map((rev: IReview) => (
                      <div
                        key={rev.id}
                        className="mb-6 border-b pb-4 last:border-0"
                      >
                        <div className="flex justify-between mb-2">
                          <div>
                            <h4 className="font-semibold text-dark">
                              {rev.user?.name || "Anonymous"}
                            </h4>

                            {/* Rating Stars */}
                            <div className="flex text-amber-400 text-sm mt-1">
                              {[...Array(5)].map((_, i) => (
                                <Star
                                  key={i}
                                  className={`w-4 h-4 ${
                                    i < rev.rating
                                      ? "fill-yellow-400 text-yellow-400"
                                      : "fill-gray-300 text-gray-300"
                                  }`}
                                />
                              ))}
                            </div>
                          </div>

                          <span className="text-gray-500 text-sm">
                            {new Date(rev.created_at).toLocaleDateString()}
                          </span>
                        </div>

                        {/* Review text */}
                        {rev.comment && (
                          <p className="text-gray-600 mb-3">{rev.comment}</p>
                        )}

                        {/* Actions */}
                        <div className="flex mt-2">
                          <span className="text-sm text-gray-500 flex items-center mr-4">
                            <ThumbsUp className="mr-1" size={14} /> Helpful (24)
                          </span>
                          <span className="text-sm text-gray-500 flex items-center">
                            <Flag className="mr-1" size={14} /> Report
                          </span>
                        </div>
                      </div>
                    ))
                  ) : (
                    <p className="text-gray-500">No reviews yet.</p>
                  )}
                </div>

                <button className="bg-white border border-gray-300 px-6 py-2 rounded-lg hover:bg-gray-50">
                  Load More Reviews
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default SingleProduct;
