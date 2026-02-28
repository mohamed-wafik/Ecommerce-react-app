import { useState } from "react";
import { Lock } from "lucide-react";
import Image from "./ui/Image";
import { Link } from "react-router-dom";

interface RecentlyViewedItem {
  id: number;
  title: string;
  price: number;
  image: string;
}

interface IProps {
  subtotal: number;
  shipping?: number;
  tax?: number;
  discount?: number;
  recentlyViewed?: RecentlyViewedItem[];
  onApplyPromo?: (code: string) => void;
  onCheckout?: () => void;
}

const OrderSummary = ({
  subtotal,
  shipping = 0,
  tax = 0,
  discount = 0,
  onApplyPromo,
}: IProps) => {
  const [promoCode, setPromoCode] = useState("");

  const total = subtotal + shipping + tax - discount;

  const handleApplyPromo = () => {
    onApplyPromo?.(promoCode);
    setPromoCode("");
  };

  return (
    <div className="lg:w-1/3 space-y-6">
      {/* Order Summary */}
      <div className="bg-white rounded-xl shadow-md p-6 sticky top-20">
        <h2 className="text-xl font-semibold text-dark mb-4">Order Summary</h2>

        <div className="space-y-3 mb-6">
          <div className="flex justify-between">
            <span className="text-gray-600">Subtotal</span>
            <span className="font-semibold">${subtotal.toFixed(2)}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Shipping</span>
            <span
              className={`font-semibold ${
                shipping === 0 ? "text-green-600" : ""
              }`}
            >
              {shipping === 0 ? "FREE" : `$${shipping.toFixed(2)}`}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Tax</span>
            <span className="font-semibold">${tax.toFixed(2)}</span>
          </div>
          {discount > 0 && (
            <div className="flex justify-between">
              <span className="text-gray-600">Discount</span>
              <span className="font-semibold text-green-600">
                -${discount.toFixed(2)}
              </span>
            </div>
          )}
          <div className="border-t border-gray-200 pt-3 mt-3">
            <div className="flex justify-between text-lg font-bold">
              <span>Total</span>
              <span>${total.toFixed(2)}</span>
            </div>
          </div>
        </div>

        {/* Promo Code */}
        <div className="mb-6">
          <label htmlFor="promo-code" className="block text-gray-700 mb-2">
            Promo Code
          </label>
          <div className="flex">
            <input
              type="text"
              id="promo-code"
              placeholder="Enter code"
              className="flex-1 py-2 px-4 border border-gray-300 rounded-l-lg focus:outline-none focus:ring-1 focus:ring-primary"
              value={promoCode}
              onChange={(e) => setPromoCode(e.target.value)}
            />
            <button
              onClick={handleApplyPromo}
              className="bg-primary text-white px-4 py-2 rounded-r-lg hover:bg-secondary transition-colors"
            >
              Apply
            </button>
          </div>
        </div>

        {/* Checkout Button */}
        <Link
          to="/checkout"
          className="w-full flex justify-center items-center bg-primary text-white py-3 rounded-lg font-semibold hover:bg-secondary transition-colors mb-4"
        >
          Proceed to Checkout
        </Link>

        {/* Security Note */}
        <div className="text-center text-sm text-gray-500 flex items-center justify-center gap-1">
          <Lock className="w-4 h-4" />
          Your personal data is securely encrypted
        </div>

        {/* Trust Badges */}
        <div className="mt-6 pt-6 border-t border-gray-200">
          <p className="text-gray-600 text-sm mb-3">We accept:</p>
          <div className="flex justify-between">
            <Image
              src="https://www.freepnglogos.com/uploads/visa-card-logo-9.png"
              alt="Visa"
              className="h-8"
            />
            <Image
              src="https://www.freepnglogos.com/uploads/mastercard-png/mastercard-logo-png-transparent-svg-vector-bie-supply-0.png"
              alt="Mastercard"
              className="h-8"
            />
            <Image
              src="https://www.freepnglogos.com/uploads/paypal-logo-png-8.png"
              alt="PayPal"
              className="h-8"
            />
            <Image
              src="https://www.freepnglogos.com/uploads/american-express-png-logo/american-express-png-logo-credit-card-vector-logo-download-1.png"
              alt="American Express"
              className="h-8"
            />
          </div>
        </div>
      </div>

      {/* Recently Viewed */}
      {/* {recentlyViewed.length > 0 && (
        <div className="bg-white rounded-xl shadow-md p-6">
          <h2 className="text-xl font-semibold text-dark mb-4">
            Recently Viewed
          </h2>
          <div className="space-y-4">
            {recentlyViewed.map((item) => (
              <div key={item.id} className="flex">
                <Image
                  src={item.image}
                  alt={item.title}
                  className="w-16 h-16 object-cover rounded-lg"
                />
                <div className="ml-4">
                  <h3 className="font-semibold text-dark">{item.title}</h3>
                  <p className="text-gray-600 text-sm">
                    ${item.price.toFixed(2)}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )} */}
    </div>
  );
};

export default OrderSummary;
