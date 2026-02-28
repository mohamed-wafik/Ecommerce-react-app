/**
 * Order Status Types
 */
export type OrderStatus =
  | "pending"
  | "processing"
  | "shipped"
  | "delivered"
  | "cancelled";

/**
 * Payment Status Types
 */
export type PaymentStatus = "pending" | "paid" | "failed";

/**
 * Payment Method Types
 */
export type PaymentMethod = "cod" | "card" | "wallet";

/**
 * Shipping Method Types
 */
export type ShippingMethod = "standard" | "express" | "pickup";

/**
 * Order Item Interface
 * Represents a single item in an order
 */
export interface IOrderItem {
  id: number;
  order_id: number;
  product_id: number;
  quantity: number;
  price: number | string; // Price per unit
  total: number | string; // Total for this item (quantity × price)
  created_at: string;
  updated_at: string;

  // Relationships (optional, populated when fetched with include)
  product?: IProduct;
  order?: IOrder;
}

/**
 * Order Interface
 * Main order data structure
 */
export interface IOrder {
  id: number;
  order_number: string; // Format: ORD-XXXXX
  user_id: number;

  // Customer Information
  customer_name: string;
  customer_email: string;
  customer_phone: string;

  // Shipping Information
  shipping_address: string;
  city: string;
  postal_code: string | null;
  shipping_method: ShippingMethod;
  shipping_cost: number | string;

  // Financial Information
  subtotal: number | string; // Sum of all items
  discount: number | string; // Discount amount
  tax: number | string; // Tax amount
  total: number | string; // Final total

  // Payment Information
  payment_method: PaymentMethod;
  payment_status: PaymentStatus;
  payment_session_id: string | null; // Stripe session ID
  payment_intent_id: string | null; // Stripe payment intent ID
  payment_id: string | null; // Generic payment ID
  transaction_id: string | null; // Transaction reference
  paid_at: string | null; // Payment completion timestamp

  // Order Status
  order_status: OrderStatus;

  // Timestamps
  created_at: string;
  updated_at: string;

  // Relationships (optional, populated when fetched with include)
  items?: IOrderItem[];
  user?: IUser;
}

/**
 * Order Create/Update Request Payload
 * Used when creating a new order from cart
 */
export interface IOrderCreateRequest {
  customer_name: string;
  customer_email: string;
  customer_phone: string;
  shipping_address: string;
  city: string;
  postal_code?: string;
  shipping_method: ShippingMethod;
  payment_method: PaymentMethod;
  coupon_code?: string; // Optional coupon code
}

/**
 * Order Response Wrapper
 * API response when fetching a single order
 */
export interface IOrderResponse {
  message: string;
  data: IOrder;
  status: number;
}

/**
 * Orders List Response Wrapper
 * API response when fetching multiple orders
 */
export interface IOrdersListResponse {
  message: string;
  data: IOrder[];
  status: number;
}

/**
 * Payment Status Update Request
 * Used to update order payment status
 */
export interface IPaymentStatusUpdateRequest {
  payment_status: PaymentStatus;
}

/**
 * Checkout Session Response
 * Stripe checkout session creation response
 */
export interface ICheckoutSessionResponse {
  payment_session_id: string;
  url: string;
}

/**
 * Payment Verification Request
 * Used to verify payment after Stripe redirect
 */
export interface IPaymentVerificationRequest {
  session_id: string;
  order_id: number;
}

/**
 * Payment Verification Response
 * Response after payment verification
 */
export interface IPaymentVerificationResponse {
  success: boolean;
  message: string;
  order?: IOrder;
  payment_status?: PaymentStatus;
}

/**
 * Payment Cancel Request
 * Used when user cancels payment
 */
export interface IPaymentCancelRequest {
  order_id: number;
}

/**
 * Stripe Public Key Response
 * Response when fetching Stripe public key
 */
export interface IStripePublicKeyResponse {
  publicKey: string;
}

/**
 * Order Summary (For display purposes)
 * Simplified order data for lists/cards
 */
export interface IOrderSummary {
  id: number;
  order_number: string;
  customer_name: string;
  total: number | string;
  order_status: OrderStatus;
  payment_status: PaymentStatus;
  created_at: string;
  items_count?: number;
}

/**
 * Order Filter Options
 * Used for filtering orders in list views
 */
export interface IOrderFilterOptions {
  status?: OrderStatus;
  payment_status?: PaymentStatus;
  payment_method?: PaymentMethod;
  sort_by?: "created_at" | "total" | "status";
  sort_order?: "asc" | "desc";
  page?: number;
  per_page?: number;
}

/**
 * Coupon/Discount Information
 * For coupon validation
 */
export interface ICouponInfo {
  code: string;
  discount_amount: number;
  discount_percent?: number;
  is_valid: boolean;
  message?: string;
}

/**
 * Order Statistics
 * Summary statistics for orders
 */
export interface IOrderStatistics {
  total_orders: number;
  total_revenue: number | string;
  pending_orders: number;
  completed_orders: number;
  failed_payments: number;
  average_order_value: number | string;
}

// Re-export commonly used types from main interface file
export interface IUser {
  id: number;
  name: string;
  email: string;
  avatar: string | null;
  role: string;
  created_at: string;
  updated_at: string;
}

export interface IProduct {
  id: number;
  title: string;
  description: string;
  image: string;
  price: number;
  stock: number;
  discount: number | null;
  category_id: number;
  orders_count?: number;
  reviews_avg_rating: number | null;
  reviews_count?: number;
  created_at: string;
  updated_at: string;
  category?: any;
}
