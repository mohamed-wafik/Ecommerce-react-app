import { Suspense, lazy, useEffect, useMemo } from "react";
import { Toaster } from "react-hot-toast";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import NotFoundPage from "./components/ui/NotFoundPage";
import LoadingPage from "./components/ui/loadingPage";
import RootLayout from "./layout/RootLayout";
import { useAuthStore } from "./store/useAuth";
import { useCart } from "./store/useCart";
import ProtectedRoute from "./components/auth/ProtectRoute";
import ErrorPage from "./components/ui/ErrorHandler";
import Checkout from "./pages/Checkout";
import OrderTracking from "./pages/OrderTracking";
import PaymentSuccess from "./pages/Payment/PaymentSuccess";
import PaymentCancel from "./pages/Payment/PaymentCancel";
import ForgotPasswordPage from "./pages/Auth/ForgotPassword";
import OtpPage from "./pages/Auth/OtpPage";
import ChangePasswordPage from "./pages/Auth/ChangePassword";

// Lazy loaded components
const HomePage = lazy(() => import("./pages"));
const SingleProduct = lazy(() => import("./pages/SingleProduct"));
const ProductsPage = lazy(() => import("./pages/Shop"));
const CartPage = lazy(() => import("./pages/cart"));
const LoginPage = lazy(() => import("./pages/Auth/login"));
const RegisterPage = lazy(() => import("./pages/Auth/register"));

function App() {
  const { check, user } = useAuthStore();
  const { fetchCart } = useCart();

  // Initialize auth and cart on mount
  useEffect(() => {
    check();
    fetchCart();
  }, [check, fetchCart]);

  // Memoize authentication status
  const isAuthenticated = useMemo(() => !!user, [user]);

  // Reusable route wrappers
  const RequireAuth = ({ children }: { children: React.ReactNode }) => (
    <ProtectedRoute redirectPath="/login" isAllowed={isAuthenticated}>
      {children}
    </ProtectedRoute>
  );

  const RequireGuest = ({ children }: { children: React.ReactNode }) => (
    <ProtectedRoute redirectPath="/" isAllowed={!isAuthenticated}>
      {children}
    </ProtectedRoute>
  );

  return (
    <BrowserRouter>
      <Suspense fallback={<LoadingPage />}>
        <Routes>
          {/* Main layout with nested routes */}
          <Route path="/" element={<RootLayout />} errorElement={<ErrorPage />}>
            <Route index element={<HomePage />} />
            <Route path="shop" element={<ProductsPage />} />
            <Route path="product/:id" element={<SingleProduct />} />

            {/* Protected routes */}
            <Route
              path="cart"
              element={
                <RequireAuth>
                  <CartPage />
                </RequireAuth>
              }
            />
            <Route
              path="orders/:orderNumber"
              element={
                <RequireAuth>
                  <OrderTracking />
                </RequireAuth>
              }
            />
          </Route>

          {/* Checkout flow - consider adding protection */}
          <Route
            path="checkout"
            element={
              <RequireAuth>
                <Checkout />
              </RequireAuth>
            }
          />
          <Route path="payment/success" element={<PaymentSuccess />} />
          <Route path="payment/cancel" element={<PaymentCancel />} />

          {/* Guest-only routes */}
          <Route
            path="login"
            element={
              <RequireGuest>
                <LoginPage />
              </RequireGuest>
            }
          />
          <Route
            path="register"
            element={
              <RequireGuest>
                <RegisterPage />
              </RequireGuest>
            }
          />
          <Route
            path="/forget-password"
            element={
              <RequireGuest>
                <ForgotPasswordPage />
              </RequireGuest>
            }
          />
          <Route
            path="/otp"
            element={
              <RequireGuest>
                <OtpPage />
              </RequireGuest>
            }
          />
          <Route
            path="/change-password"
            element={
              <RequireGuest>
                <ChangePasswordPage />
              </RequireGuest>
            }
          />

          {/* 404 fallback */}
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Suspense>

      <Toaster position="bottom-right" />
    </BrowserRouter>
  );
}

export default App;
