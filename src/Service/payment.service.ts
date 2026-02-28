import axiosInstance from "../config/axiosInstance";

export const paymentService = {
  async createCheckoutSession(orderId: number) {
    const response = await axiosInstance.post(
      "/payment/create-checkout-session",
      {
        order_id: orderId,
        payment_method: "stripe", // or "paypal" based on your implementation
      },
    );
    console.log("Checkout session response:", response.data);
    return response.data;
  },

  async verifyPayment(sessionId: string, orderId: number) {
    const response = await axiosInstance.post("/payment/verify", {
      session_id: sessionId,
      order_id: orderId,
    });
    return response.data;
  },

  async cancelPayment(orderId: number) {
    const response = await axiosInstance.post("/payment/cancel", {
      order_id: orderId,
    });
    return response.data;
  },
};
