import { useState } from "react";
import { ArrowLeft } from "lucide-react";
import OrderSummary from "../components/OrderSummary";
import { useCart } from "../store/useCart";
import ProductCardCart from "../components/ui/ProductCardCart";
import ProductCartSkeleton from "../components/Skeleton/ProductCartSkeleton";

const CartPage = () => {
  const { cartItems, countItems, isLoadingCart } = useCart();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [promoCode, setPromoCode] = useState("");

  const handleApplyPromo = () => {
    alert(`Applied promo code: ${promoCode}`);
    setPromoCode("");
  };

  const handleCheckout = () => {
    alert("Proceeding to checkout");
  };

  // Calculate totals
  const subtotal = cartItems.reduce(
    (acc, item) => acc + item.product.price * item.quantity,
    0
  );
  const shipping = subtotal > 200 ? 0 : 15;
  const tax = subtotal * 0.08;
  const discount = cartItems.reduce(
    (acc, item) => acc + (item.product.discount || 0),
    0
  );

  const renderProductSkeleton = Array.from({ length: 4 }).map((_, idx) => (
    <ProductCartSkeleton key={idx} />
  ));

  return (
    <main className="py-8">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold text-dark mb-2">
          Your Shopping Cart
        </h1>
        <p className="text-gray-600 mb-8">
          Review your items and proceed to checkout
        </p>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Cart Items */}
          <div className="lg:w-2/3 space-y-6">
            <div className="bg-white rounded-xl shadow-md overflow-hidden">
              <div className="p-6 border-b border-gray-200">
                <h2 className="text-xl font-semibold text-dark">
                  Cart Items ({countItems})
                </h2>
              </div>

              {isLoadingCart || isLoading ? (
                renderProductSkeleton
              ) : countItems === 0 ? (
                <div className="flex flex-col items-center justify-center min-h-[400px] p-6">
                  {/* Large shopping cart illustration */}
                  <div className="relative mb-6">
                    <div className="w-24 h-24 rounded-full bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
                      <svg
                        className="w-12 h-12 text-gray-400"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={1.2}
                          d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                        />
                      </svg>
                    </div>
                    {/* Empty indicator */}
                    <div className="absolute -top-1 -right-1 w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
                      <span className="text-xs font-semibold text-gray-700">
                        0
                      </span>
                    </div>
                  </div>

                  {/* Text content */}
                  <h3 className="text-xl font-bold text-gray-800 mb-2">
                    Your shopping cart is empty
                  </h3>
                  <p className="text-gray-500 text-center mb-8 max-w-md">
                    Add items to your cart and they will appear here. Ready to
                    start shopping?
                  </p>
                </div>
              ) : (
                cartItems.map((item) => (
                  <ProductCardCart
                    isLoading={isLoading}
                    setIsLoading={setIsLoading}
                    product={item.product}
                    id={item.id}
                    quantity={item.quantity}
                  />
                ))
              )}
            </div>

            {/* Continue Shopping / Update Cart */}
            <div className="mt-6 flex justify-between items-center">
              <button className="text-primary hover:text-secondary font-semibold transition-colors flex items-center">
                <ArrowLeft className="w-4 h-4 mr-2" /> Continue Shopping
              </button>
              <button className="bg-gray-200 text-gray-700 px-6 py-2 rounded-lg font-semibold hover:bg-gray-300 transition-colors">
                Update Cart
              </button>
            </div>
          </div>

          {/* Order Summary */}
          <OrderSummary
            subtotal={subtotal}
            shipping={shipping}
            tax={tax}
            discount={+discount}
            onApplyPromo={handleApplyPromo}
            onCheckout={handleCheckout}
          />
        </div>
      </div>
    </main>
  );
};

export default CartPage;
