export interface IUser {
  id: number;
  name: string;
  email: string;
  avatar: string | null;
  role: string;
  created_at: string;
  updated_at: string;
}

export interface ShippingFormState {
  customer_name: string;
  customer_email: string;
  customer_phone: string;
  shipping_address: string;
  city: string;
  postal_code?: string;
  shipping_method: string;
  payment_method: string;
}

export interface ICategory {
  id: number;
  title: string;
  description?: string | null;
  image: string;
  created_at: string;
  updated_at: string;
}

export interface IProduct {
  id: number;
  title: string;
  description: string;
  image: string;
  price: number; // API gives string → convert to number in frontend
  stock: number;
  discount: number | null;
  category_id: number;

  orders_count?: number; // added
  reviews_avg_rating: number | null; // added
  reviews_count?: number; // added

  created_at: string;
  updated_at: string;

  category?: ICategory; // optional relationship if fetched with include()
}

export interface ICartItem {
  id: number;
  user_id: number;
  product_id: number;
  quantity: number;
  created_at: string;
  updated_at: string;
  product: IProduct;
}

export interface ICartResponse {
  message: string;
  data: ICartItem[];
  status: number;
}

export interface IRegisterInput {
  name: "email" | "name" | "password";
  placeholder: string;
  type: string;
  validation: {
    required?: boolean;
    minLength?: number;
    pattern?: RegExp;
  };
}

export interface ILoginInput {
  name: "email" | "password";
  placeholder: string;
  type: string;
  validation: {
    required?: boolean;
    minLength?: number;
    pattern?: RegExp;
  };
}

export interface IReview {
  id: number;
  user_id: number;
  product_id: number;
  rating: number;
  comment: string | null;
  created_at: string;
  updated_at: string;

  user: IUser;
}

interface IOrderItem {
  id: number;
  order_id: number;
  product_id: number;
  quantity: number;
  price: string;
  total: string;
  created_at: string;
  updated_at: string;
  product: IProduct;
}
export interface IResponseOrderCreate {
  id: number;
  user_id: number;
  customer_name: string;
  customer_email: string;
  customer_phone: string;
  shipping_address: string;
  city: string;
  postal_code: string;
  shipping_method: string;
  shipping_cost: string;
  subtotal: string;
  discount: string;
  tax: string;
  total: string;
  payment_method: string;
  payment_status: string;
  order_status: string;
  order_number: string;
  created_at: string;
  updated_at: string;
}
export interface IOrder extends IResponseOrderCreate {
  payment_session_id: string | null;
  payment_intent_id: string | null;
  payment_id: string | null;
  transaction_id: string | null;
  paid_at?: string | null;
  items: IOrderItem[];
}

export interface IForgetPassword {
  email: string;
}
export interface IVerifyOtp {
  email: string;
  otp: string;
}

export interface IChangePassword {
  email: string;
  token: string;
  password: string;
}
