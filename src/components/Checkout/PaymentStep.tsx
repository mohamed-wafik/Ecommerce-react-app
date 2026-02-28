import { useState } from "react";
import {
  CreditCard,
  Wallet,
  Banknote,
  ExternalLink,
  Loader2,
} from "lucide-react";
import toast from "react-hot-toast";
import { paymentService } from "../../Service/payment.service";
import axiosInstance from "../../config/axiosInstance";
import type { IResponseOrderCreate } from "../../interface";
import { getErrorMessage } from "../../lib/utils";
interface IProps {
  order: any;
  onPaymentComplete: (order: IResponseOrderCreate) => void;
}
export default function PaymentStep({ order, onPaymentComplete }: IProps) {
  const [paymentMethod, setPaymentMethod] = useState("card");
  const [loading, setLoading] = useState(false);

  const handleCardPayment = async () => {
    setLoading(true);
    try {
      const { url } = await paymentService.createCheckoutSession(order.id);

      window.location.href = url;
    } catch (err: any) {
      console.error("Payment initiation error:", err);
      toast.error(getErrorMessage(err) || "Failed to initiate payment");
      setLoading(false);
    }
  };

  const handleCODConfirm = async () => {
    setLoading(true);
    try {
      await axiosInstance.patch(`/orders/${order.id}/payment-status`, {
        payment_status: "pending",
      });

      toast.success("Order confirmed! You will pay on delivery.");
      onPaymentComplete(order);
    } catch (err) {
      toast.error("Failed to confirm order");
      setLoading(false);
    }
  };

  const handleWalletPayment = () => {
    toast.error("Mobile wallet integration coming soon!");
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="bg-white rounded-lg shadow-lg p-8">
        <h2 className="text-2xl font-bold mb-6">Payment Method</h2>

        {/* Payment Method Selection */}
        <div className="space-y-4 mb-8">
          {/* Card Payment */}
          <div
            onClick={() => !loading && setPaymentMethod("card")}
            className={`p-4 border-2 rounded-lg cursor-pointer transition-all ${
              paymentMethod === "card"
                ? "border-blue-600 bg-blue-50"
                : "border-gray-200 hover:border-gray-300"
            } ${loading ? "opacity-50 cursor-not-allowed" : ""}`}
          >
            <div className="flex items-center">
              <CreditCard className="w-6 h-6 mr-3 text-blue-600" />
              <div className="flex-1">
                <h3 className="font-semibold">Credit / Debit Card</h3>
                <p className="text-sm text-gray-600">
                  Secure payment via Stripe
                </p>
              </div>
              <div className="flex gap-2">
                <img
                  src="https://upload.wikimedia.org/wikipedia/commons/0/04/Visa.svg"
                  alt="Visa"
                  className="h-6"
                />
                <img
                  src="https://upload.wikimedia.org/wikipedia/commons/2/2a/Mastercard-logo.svg"
                  alt="Mastercard"
                  className="h-6"
                />
              </div>
            </div>
          </div>

          {/* Mobile Wallet */}
          <div
            onClick={() => !loading && setPaymentMethod("wallet")}
            className={`p-4 border-2 rounded-lg cursor-pointer transition-all ${
              paymentMethod === "wallet"
                ? "border-blue-600 bg-blue-50"
                : "border-gray-200 hover:border-gray-300"
            } ${loading ? "opacity-50 cursor-not-allowed" : ""}`}
          >
            <div className="flex items-center">
              <Wallet className="w-6 h-6 mr-3 text-purple-600" />
              <div className="flex-1">
                <h3 className="font-semibold">Mobile Wallet</h3>
                <p className="text-sm text-gray-600">
                  Vodafone Cash, Fawry, Instapay
                </p>
              </div>
              <span className="text-xs bg-yellow-100 text-yellow-800 px-2 py-1 rounded">
                Coming Soon
              </span>
            </div>
          </div>

          {/* Cash on Delivery */}
          <div
            onClick={() => !loading && setPaymentMethod("cod")}
            className={`p-4 border-2 rounded-lg cursor-pointer transition-all ${
              paymentMethod === "cod"
                ? "border-blue-600 bg-blue-50"
                : "border-gray-200 hover:border-gray-300"
            } ${loading ? "opacity-50 cursor-not-allowed" : ""}`}
          >
            <div className="flex items-center">
              <Banknote className="w-6 h-6 mr-3 text-green-600" />
              <div className="flex-1">
                <h3 className="font-semibold">Cash on Delivery</h3>
                <p className="text-sm text-gray-600">Pay when you receive</p>
              </div>
            </div>
          </div>
        </div>

        {/* Payment Action Area */}
        <div className="bg-gray-50 p-6 rounded-lg">
          {paymentMethod === "card" && (
            <div>
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
                <p className="text-sm text-blue-800">
                  <strong>🔒 Secure Checkout:</strong> You will be redirected to
                  Stripe's secure payment page to complete your purchase safely.
                </p>
              </div>
              <button
                onClick={handleCardPayment}
                disabled={loading}
                className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center gap-2"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Redirecting to Stripe...
                  </>
                ) : (
                  <>
                    Proceed to Payment
                    <ExternalLink className="w-5 h-5" />
                  </>
                )}
              </button>
            </div>
          )}

          {paymentMethod === "wallet" && (
            <div className="text-center py-8">
              <Wallet className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-600 mb-4">
                Mobile wallet integration is coming soon!
              </p>
              <p className="text-sm text-gray-500">
                We're working on integrating Vodafone Cash, Fawry, and other
                payment methods.
              </p>
              <button
                onClick={handleWalletPayment}
                className="mt-4 bg-gray-400 text-white py-3 px-6 rounded-lg cursor-not-allowed"
              >
                Not Available Yet
              </button>
            </div>
          )}

          {paymentMethod === "cod" && (
            <div>
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
                <p className="text-sm text-yellow-800">
                  <strong>💰 Cash Payment:</strong> You will pay{" "}
                  <strong className="text-lg">{order.total} EGP</strong> in cash
                  when your order is delivered to your address.
                </p>
              </div>
              <div className="bg-gray-100 p-4 rounded-lg mb-6">
                <h4 className="font-semibold mb-2">Important Notes:</h4>
                <ul className="text-sm text-gray-700 space-y-1 list-disc list-inside">
                  <li>Please have exact change ready</li>
                  <li>Inspect your items before payment</li>
                  <li>Payment receipt will be provided</li>
                </ul>
              </div>
              <button
                onClick={handleCODConfirm}
                disabled={loading}
                className="w-full bg-green-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center gap-2"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Processing...
                  </>
                ) : (
                  "Confirm Order (Cash on Delivery)"
                )}
              </button>
            </div>
          )}
        </div>

        {/* Order Summary */}
        <div className="mt-8 bg-white border border-gray-200 rounded-lg p-6">
          <h3 className="font-semibold mb-4">Order Summary</h3>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-600">Order Number</span>
              <span className="font-semibold">{order.order_number}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Subtotal</span>
              <span>{order.subtotal} EGP</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Shipping</span>
              <span>{order.shipping_cost} EGP</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Tax (14%)</span>
              <span>{order.tax} EGP</span>
            </div>
            {order.discount > 0 && (
              <div className="flex justify-between text-green-600">
                <span>Discount</span>
                <span>-{order.discount} EGP</span>
              </div>
            )}
            <div className="border-t pt-2 mt-2">
              <div className="flex justify-between font-bold text-lg">
                <span>Total</span>
                <span className="text-blue-600">{order.total} EGP</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
