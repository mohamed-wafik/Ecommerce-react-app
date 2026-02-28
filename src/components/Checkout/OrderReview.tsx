import { Package, MapPin, Truck } from "lucide-react";
import type { ICartItem, ShippingFormState } from "../../interface";

interface IProps {
  items: Array<ICartItem>;
  shippingData: ShippingFormState;
  onBack: () => void;
  onConfirm: () => void;
  loading: boolean;
}
export default function OrderReview({
  items,
  shippingData,
  onBack,
  onConfirm,
  loading,
}: IProps) {
  const subtotal = items.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0,
  );

  const shippingCost =
    shippingData.shipping_method === "standard"
      ? 30
      : shippingData.shipping_method === "express"
        ? 60
        : 0;

  const tax = subtotal * 0.14;
  const total = subtotal + shippingCost + tax;

  return (
    <div className="bg-white rounded-lg shadow-lg p-8">
      <h2 className="text-2xl font-bold mb-6">Review Your Order</h2>

      {/* Order Items */}
      <div className="mb-6">
        <h3 className="font-semibold mb-4 flex items-center gap-2">
          <Package className="w-5 h-5" />
          Order Items
        </h3>
        <div className="space-y-3">
          {items.map((item) => (
            <div
              key={item.id}
              className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg"
            >
              <img
                src={item.product.image || "https://via.placeholder.com/80"}
                alt={item.product.title}
                className="w-20 h-20 object-cover rounded"
              />
              <div className="flex-1">
                <h4 className="font-semibold">{item.product.title}</h4>
                <p className="text-sm text-gray-600">
                  Quantity: {item.quantity}
                </p>
              </div>
              <div className="text-right">
                <p className="font-bold">
                  {(item.product.price * item.quantity).toFixed(2)} EGP
                </p>
                <p className="text-sm text-gray-600">
                  {item.product.price} EGP each
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Shipping Info */}
      <div className="mb-6">
        <h3 className="font-semibold mb-4 flex items-center gap-2">
          <MapPin className="w-5 h-5" />
          Shipping Address
        </h3>
        <div className="p-4 bg-gray-50 rounded-lg">
          <p className="font-semibold">{shippingData.customer_name}</p>
          <p className="text-gray-600">{shippingData.customer_email}</p>
          <p className="text-gray-600">{shippingData.customer_phone}</p>
          <p className="text-gray-600 mt-2">{shippingData.shipping_address}</p>
          <p className="text-gray-600">
            {shippingData.city}
            {shippingData.postal_code && `, ${shippingData.postal_code}`}
          </p>
        </div>
      </div>

      {/* Shipping Method */}
      <div className="mb-6">
        <h3 className="font-semibold mb-4 flex items-center gap-2">
          <Truck className="w-5 h-5" />
          Shipping Method
        </h3>
        <div className="p-4 bg-gray-50 rounded-lg">
          <p className="font-semibold capitalize">
            {shippingData.shipping_method} Shipping
          </p>
          <p className="text-sm text-gray-600">
            {shippingData.shipping_method === "standard" &&
              "3-5 business days - 30 EGP"}
            {shippingData.shipping_method === "express" &&
              "1-2 business days - 60 EGP"}
            {shippingData.shipping_method === "pickup" && "Store pickup - FREE"}
          </p>
        </div>
      </div>

      {/* Order Summary */}
      <div className="border-t pt-6 mb-6">
        <h3 className="font-semibold mb-4">Order Summary</h3>
        <div className="space-y-2">
          <div className="flex justify-between">
            <span>Subtotal</span>
            <span>{subtotal.toFixed(2)} EGP</span>
          </div>
          <div className="flex justify-between">
            <span>Shipping</span>
            <span>{shippingCost.toFixed(2)} EGP</span>
          </div>
          <div className="flex justify-between">
            <span>Tax (14%)</span>
            <span>{tax.toFixed(2)} EGP</span>
          </div>
          <div className="border-t pt-2 mt-2">
            <div className="flex justify-between text-xl font-bold">
              <span>Total</span>
              <span className="text-blue-600">{total.toFixed(2)} EGP</span>
            </div>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-4">
        <button
          onClick={onBack}
          disabled={loading}
          className="flex-1 py-3 px-6 border border-gray-300 rounded-lg font-semibold hover:bg-gray-50 disabled:opacity-50 transition-colors"
        >
          Back
        </button>
        <button
          onClick={onConfirm}
          disabled={loading}
          className="flex-1 bg-blue-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-blue-700 disabled:opacity-50 transition-colors"
        >
          {loading ? "Creating Order..." : "Continue to Payment"}
        </button>
      </div>
    </div>
  );
}
