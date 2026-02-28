import { ShoppingCart } from "lucide-react";

const LoadingPage = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen gap-8 bg-gradient-to-br from-slate-50 to-blue-50 px-4">
      {/* Main Animation Container */}
      <div className="relative flex flex-col items-center gap-8">
        {/* Cart Animation */}
        <div className="relative w-24 h-24 flex items-center justify-center">
          {/* Pulsing Background */}
          <div className="absolute animate-ping rounded-full bg-blue-200/30 size-20 [animation-duration:2s]"></div>

          {/* Rotating Background Circle */}
          <div className="absolute animate-spin rounded-full border-2 border-dashed border-blue-300/50 size-16 [animation-duration:3s]"></div>

          {/* Bouncing Cart Icon */}
          <div className="relative [animation:bounce-subtle_2s_ease-in-out_infinite]">
            <ShoppingCart
              className="text-blue-600 size-12 drop-shadow-lg"
              strokeWidth={2.2}
            />

            {/* Cart Items Indicator */}
            <div className="absolute -top-2 -right-2 size-5 bg-red-500 rounded-full flex items-center justify-center">
              <div className="size-1.5 bg-white rounded-full animate-pulse"></div>
            </div>
          </div>
        </div>

        {/* Loading Text */}
        <div className="text-center space-y-3">
          <h2 className="text-2xl font-bold text-gray-800 [animation:fade-in-up_0.8s_ease-out]">
            Loading Your Cart
          </h2>

          <p className="text-gray-600 text-sm [animation:fade-in-up_0.8s_ease-out_0.3s_both]">
            Preparing your shopping experience...
          </p>
        </div>

        {/* Progress Bar */}
        <div className="w-48 bg-gray-200 rounded-full h-1.5 overflow-hidden">
          <div className="h-full bg-gradient-to-r from-blue-500 to-blue-600 rounded-full [animation:progress-bar_2s_ease-in-out_infinite]"></div>
        </div>

        {/* Dots Animation */}
        <div className="flex gap-1.5">
          {[1, 2, 3].map((dot) => (
            <div
              key={dot}
              className="size-2 bg-blue-500 rounded-full animate-bounce"
              style={{
                animationDelay: `${dot * 0.2}s`,
                animationDuration: "1s",
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default LoadingPage;
