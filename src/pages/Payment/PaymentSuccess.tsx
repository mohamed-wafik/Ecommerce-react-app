import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { CheckCircle, Loader2, AlertCircle } from "lucide-react";
import { paymentService } from "../../Service/payment.service";
import type { IOrder } from "../../interface";

export default function PaymentSuccess() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [status, setStatus] = useState("verifying"); // verifying, success, error
  const [order, setOrder] = useState<IOrder | null>(null);
  const [error, setError] = useState(null as string | null);

  useEffect(() => {
    verifyPayment();
  }, []);

  const verifyPayment = async () => {
    const sessionId = searchParams.get("session_id");
    const orderId = searchParams.get("order_id");

    if (!sessionId || !orderId) {
      setStatus("error");
      setError("Invalid payment session");
      return;
    }

    try {
      const response = await paymentService.verifyPayment(
        sessionId,
        Number(orderId),
      );

      if (response.success) {
        setOrder(response.order);
        setStatus("success");
      } else {
        setStatus("error");
        setError(response.message || "Payment verification failed");
      }
    } catch (err: any) {
      setStatus("error");
      setError(err.response?.data?.error || "Failed to verify payment");
    }
  };

  if (status === "verifying") {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-16 h-16 text-blue-600 animate-spin mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Verifying Payment...
          </h2>
          <p className="text-gray-600">
            Please wait while we confirm your payment
          </p>
        </div>
      </div>
    );
  }

  if (status === "error") {
    return (
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="max-w-2xl mx-auto px-4">
          <div className="bg-white rounded-lg shadow-lg p-8 text-center">
            <AlertCircle className="w-20 h-20 text-red-500 mx-auto mb-4" />
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Payment Verification Failed
            </h1>
            <p className="text-gray-600 mb-6">{error}</p>
            <button
              onClick={() => navigate("/")}
              className="bg-blue-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
            >
              Return to Home
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-3xl mx-auto px-4">
        <div className="bg-white rounded-lg shadow-lg p-8 text-center">
          <CheckCircle className="w-20 h-20 text-green-500 mx-auto mb-4" />
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Payment Successful!
          </h1>
          <p className="text-gray-600 mb-6">
            Thank you for your payment. Your order has been confirmed.
          </p>

          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
            <p className="text-sm text-gray-600 mb-1">Order Number</p>
            <p className="text-2xl font-bold text-blue-600">
              {order?.order_number}
            </p>
          </div>

          {/* Order Details */}
          <div className="text-left bg-gray-50 rounded-lg p-6 mb-6">
            <h3 className="font-semibold mb-4">Order Summary</h3>
            <div className="space-y-3">
              {order?.items?.map((item) => (
                <div key={item.id} className="flex justify-between text-sm">
                  <span>
                    {item.product.title} x {item.quantity}
                  </span>
                  <span className="font-semibold">{item.total} EGP</span>
                </div>
              ))}
              <div className="border-t pt-3 mt-3">
                <div className="flex justify-between text-sm mb-1">
                  <span>Subtotal</span>
                  <span>{order?.subtotal} EGP</span>
                </div>
                <div className="flex justify-between text-sm mb-1">
                  <span>Shipping</span>
                  <span>{order?.shipping_cost} EGP</span>
                </div>
                <div className="flex justify-between text-sm mb-1">
                  <span>Tax</span>
                  <span>{order?.tax} EGP</span>
                </div>
                <div className="flex justify-between font-bold text-lg mt-2">
                  <span>Total Paid</span>
                  <span className="text-green-600">{order?.total} EGP</span>
                </div>
              </div>
            </div>
          </div>

          {/* Shipping Info */}
          <div className="text-left bg-gray-50 rounded-lg p-6 mb-6">
            <h3 className="font-semibold mb-4">Delivery Information</h3>
            <p className="text-sm text-gray-600 mb-2">
              <strong>Name:</strong> {order?.customer_name}
            </p>
            <p className="text-sm text-gray-600 mb-2">
              <strong>Email:</strong> {order?.customer_email}
            </p>
            <p className="text-sm text-gray-600 mb-2">
              <strong>Phone:</strong> {order?.customer_phone}
            </p>
            <p className="text-sm text-gray-600 mb-2">
              <strong>Address:</strong> {order?.shipping_address}, {order?.city}
            </p>
            <p className="text-sm text-gray-600">
              <strong>Estimated Delivery:</strong>{" "}
              {order?.shipping_method === "express" ? "1-2 days" : "3-5 days"}
            </p>
          </div>

          <div className="flex gap-4">
            <button
              onClick={() => navigate("/")}
              className="flex-1 bg-gray-200 text-gray-800 py-3 px-6 rounded-lg font-semibold hover:bg-gray-300 transition-colors"
            >
              Continue Shopping
            </button>
            <button
              onClick={() => navigate(`/orders/${order?.order_number}`)}
              className="flex-1 bg-blue-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
            >
              Track Order
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
