import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Package, Truck, CheckCircle, Clock, XCircle } from "lucide-react";
import toast from "react-hot-toast";
import axiosInstance from "../config/axiosInstance";
import type { IOrder } from "../interface";

const OrderTracking = () => {
  const { orderNumber } = useParams();
  const navigate = useNavigate();
  const [order, setOrder] = useState<IOrder | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadOrder();
  }, [orderNumber]);

  const loadOrder = async () => {
    try {
      const data = await axiosInstance.get(`/orders/${orderNumber}`);
      setOrder(data.data.data);
    } catch (error) {
      toast.error("Order not found");
      navigate("/");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading order...</p>
        </div>
      </div>
    );
  }

  if (!order) return null;

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "pending":
        return <Clock className="w-8 h-8 text-yellow-500" />;
      case "processing":
        return <Package className="w-8 h-8 text-blue-500" />;
      case "shipped":
        return <Truck className="w-8 h-8 text-purple-500" />;
      case "delivered":
        return <CheckCircle className="w-8 h-8 text-green-500" />;
      case "cancelled":
        return <XCircle className="w-8 h-8 text-red-500" />;
      default:
        return <Clock className="w-8 h-8 text-gray-500" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "processing":
        return "bg-blue-100 text-blue-800";
      case "shipped":
        return "bg-purple-100 text-purple-800";
      case "delivered":
        return "bg-green-100 text-green-800";
      case "cancelled":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4 max-w-4xl">
        <h1 className="text-4xl font-bold mb-8">Order Tracking</h1>

        {/* Order Status */}
        <div className="bg-white rounded-lg shadow-lg p-8 mb-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <p className="text-sm text-gray-600">Order Number</p>
              <p className="text-2xl font-bold">{order.order_number}</p>
            </div>
            <div className="flex items-center gap-3">
              {getStatusIcon(order.order_status)}
              <span
                className={`px-4 py-2 rounded-full font-semibold ${getStatusColor(
                  order.order_status,
                )}`}
              >
                {order.order_status.charAt(0).toUpperCase() +
                  order.order_status.slice(1)}
              </span>
            </div>
          </div>

          {/* Timeline */}
          <div className="relative">
            <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-gray-200"></div>

            <div className="space-y-6">
              {/* Order Placed */}
              <div className="relative flex items-start gap-4">
                <div className="bg-green-500 w-8 h-8 rounded-full flex items-center justify-center z-10">
                  <CheckCircle className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="font-semibold">Order Placed</p>
                  <p className="text-sm text-gray-600">
                    {new Date(order.created_at).toLocaleString()}
                  </p>
                </div>
              </div>

              {/* Processing */}
              <div className="relative flex items-start gap-4">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center z-10 ${
                    ["processing", "shipped", "delivered"].includes(
                      order.order_status,
                    )
                      ? "bg-green-500"
                      : "bg-gray-300"
                  }`}
                >
                  <Package className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="font-semibold">Processing</p>
                  <p className="text-sm text-gray-600">
                    {["processing", "shipped", "delivered"].includes(
                      order.order_status,
                    )
                      ? "Your order is being prepared"
                      : "Waiting for confirmation"}
                  </p>
                </div>
              </div>

              {/* Shipped */}
              <div className="relative flex items-start gap-4">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center z-10 ${
                    ["shipped", "delivered"].includes(order.order_status)
                      ? "bg-green-500"
                      : "bg-gray-300"
                  }`}
                >
                  <Truck className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="font-semibold">Shipped</p>
                  <p className="text-sm text-gray-600">
                    {["shipped", "delivered"].includes(order.order_status)
                      ? "Your order is on the way"
                      : "Not shipped yet"}
                  </p>
                </div>
              </div>

              {/* Delivered */}
              <div className="relative flex items-start gap-4">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center z-10 ${
                    order.order_status === "delivered"
                      ? "bg-green-500"
                      : "bg-gray-300"
                  }`}
                >
                  <CheckCircle className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="font-semibold">Delivered</p>
                  <p className="text-sm text-gray-600">
                    {order.order_status === "delivered"
                      ? "Order delivered successfully"
                      : "Estimated delivery: 3-5 days"}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Order Details */}
        <div className="bg-white rounded-lg shadow-lg p-8 mb-6">
          <h2 className="text-xl font-bold mb-4">Order Details</h2>
          <div className="space-y-4">
            {order.items?.map((item) => (
              <div
                key={item.id}
                className="flex gap-4 p-4 bg-gray-50 rounded-lg"
              >
                <img
                  src={item.product.image || "https://via.placeholder.com/80"}
                  alt={item.product.title || "Product Image"}
                  className="w-20 h-20 object-cover rounded"
                />
                <div className="flex-1">
                  <h3 className="font-semibold">{item.product.title}</h3>
                  <p className="text-sm text-gray-600">
                    Quantity: {item.quantity}
                  </p>
                  <p className="text-sm text-gray-600">
                    Price: {item.price} EGP
                  </p>
                </div>
                <div className="text-right">
                  <p className="font-bold">{item.total} EGP</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Delivery Info */}
        <div className="bg-white rounded-lg shadow-lg p-8">
          <h2 className="text-xl font-bold mb-4">Delivery Information</h2>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-gray-600">Name:</span>
              <span className="font-semibold">{order.customer_name}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Phone:</span>
              <span className="font-semibold">{order.customer_phone}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Address:</span>
              <span className="font-semibold">{order.shipping_address}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">City:</span>
              <span className="font-semibold">{order.city}</span>
            </div>
          </div>

          <div className="mt-6 pt-6 border-t">
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-gray-600">Subtotal:</span>
                <span>{order.subtotal} EGP</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Shipping:</span>
                <span>{order.shipping_cost} EGP</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Tax:</span>
                <span>{order.tax} EGP</span>
              </div>
              <div className="flex justify-between font-bold text-lg">
                <span>Total:</span>
                <span className="text-blue-600">{order.total} EGP</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderTracking;
