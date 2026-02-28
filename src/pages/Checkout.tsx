import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import toast from "react-hot-toast";
import ShippingForm from "../components/Checkout/ShippingForm";
import StepIndicator from "../components/Checkout/StepIndicator";
import PaymentStep from "../components/Checkout/PaymentStep";
import OrderReview from "../components/Checkout/OrderReview";
import { useCart } from "../store/useCart";
import axiosInstance from "../config/axiosInstance";
import type { IResponseOrderCreate, ShippingFormState } from "../interface";

export default function Checkout() {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [shippingData, setShippingData] = useState<ShippingFormState | null>(
    null,
  );
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(false);
  const { cartItems } = useCart();

  useEffect(() => {
    if (cartItems.length === 0) {
      navigate("/cart");
    }
  }, [cartItems, navigate]);

  if (cartItems.length === 0) {
    return null;
  }

  const handleShippingSubmit = (data: ShippingFormState) => {
    setShippingData(data);
    setCurrentStep(2);
  };

  const handleCreateOrder = async () => {
    setLoading(true);
    try {
      const response = await axiosInstance.post("/orders", shippingData);
      setOrder(response.data.data);
      setCurrentStep(3);
      toast.success("Order created successfully!");
    } catch (error: any) {
      console.error("Error creating order:", error);
      toast.error(error.response?.data?.error || "Failed to create order");
    } finally {
      setLoading(false);
    }
  };

  const handlePaymentComplete = (completedOrder: IResponseOrderCreate) => {
    navigate("/payment/success", {
      state: { order: completedOrder },
    });
  };

  return (
    <div className="min-h-screen py-8">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold mb-8 text-center">Checkout</h1>

        <StepIndicator currentStep={currentStep} />

        <div className="max-w-4xl mx-auto">
          {currentStep === 1 && (
            <div className="bg-white rounded-lg shadow-lg p-8">
              <ShippingForm onSubmit={handleShippingSubmit} />
            </div>
          )}

          {currentStep === 2 && shippingData && (
            <OrderReview
              items={cartItems}
              shippingData={shippingData}
              onBack={() => setCurrentStep(1)}
              onConfirm={handleCreateOrder}
              loading={loading}
            />
          )}

          {currentStep === 3 && order && (
            <PaymentStep
              order={order}
              onPaymentComplete={handlePaymentComplete}
            />
          )}
        </div>
      </div>
    </div>
  );
}
