import { ChevronRight, Divide, Zap } from "lucide-react";
import SliderProducts from "./SliderProduct";
import useAuthentienticatedQuery from "../hook/useAuthentienticatedQuery";
import { ProductCardSkeleton } from "./Skeleton/ProductCardSkeleton";
import { Link } from "react-router-dom";

const TopDealsToday = () => {
  const { isLoading, data } = useAuthentienticatedQuery({
    queryKey: ["TogEealToday"],
    url: "/product/top-deal",
  });
  const renderProductSkeleton = Array.from({ length: 4 }).map((_, idx) => (
    <div key={idx} className="shrink-0 w-full md:w-1/3 lg:w-1/4 px-3">
      <ProductCardSkeleton />
    </div>
  ));
  return (
    <section className="py-16 md:py-20 bg-gradient-to-b from-gray-50 to-white">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-12 md:mb-16 [animation:0.8s_ease-out_fade-in-up]">
          <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-600 px-3 py-1.5 md:px-4 md:py-2 rounded-full text-sm font-semibold mb-4">
            <Zap className="w-4 h-4" />
            Hot Deals
          </div>

          <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-4 md:mb-6">
            Today's{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
              Top Deals
            </span>
          </h2>

          <p className="text-base md:text-xl text-gray-600 max-w-2xl mx-auto">
            Don't miss out on these exclusive offers. Limited time only!
          </p>
        </div>

        {/* Layout: Slider + Banner */}
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Left: Slider */}
          <div className="flex-1 min-w-0">
            <div className="flex justify-between items-center mb-6 md:mb-8">
              {/* Title */}
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 md:w-12 md:h-12 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-xl flex items-center justify-center shadow-lg">
                  <Zap className="w-5 h-5 md:w-6 md:h-6 text-white" />
                </div>

                <h3 className="text-2xl md:text-3xl font-bold text-gray-900">
                  Flash Sales
                </h3>

                {/* Animated dots */}
                <div className="hidden sm:flex gap-1">
                  {[1, 2, 3].map((dot) => (
                    <div
                      key={dot}
                      className="w-2 h-2 bg-orange-500 rounded-full animate-pulse"
                      style={{ animationDelay: `${dot * 0.2}s` }}
                    />
                  ))}
                </div>
              </div>

              {/* View All */}
              <a
                href="#"
                className="group flex items-center gap-1 md:gap-2 text-sm md:text-lg font-semibold text-gray-700 hover:text-blue-600 transition-colors"
              >
                View All
                <ChevronRight className="w-4 h-4 md:w-5 md:h-5 transition-transform group-hover:translate-x-1" />
              </a>
            </div>

            {/* Slider responsive count */}
            {isLoading ? (
              <div className="flex overflow-hidden">
                {renderProductSkeleton}
              </div>
            ) : data && data.data.length ? (
              <SliderProducts
                products={data.data}
                Count={4} // Desktop
              />
            ) : (
              <div className="flex flex-col items-center justify-center py-10">
                <svg
                  className="w-12 h-12 text-gray-300 mb-3"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <p className="text-gray-400 font-medium text-center">
                  No top deals found today
                </p>
              </div>
            )}
          </div>

          {/* Right: Side Banner */}
          <div className="lg:w-1/5 flex-shrink-0 [animation:1s_ease-out_0.3s_both_fade-in-up]">
            <div className="relative h-full bg-gradient-to-br from-orange-500 to-red-600 rounded-2xl p-8 text-white overflow-hidden">
              {/* BG Pattern */}
              <div className="absolute inset-0 opacity-10">
                <div className="absolute top-0 right-0 w-32 h-32 bg-white rounded-full -translate-y-16 translate-x-16"></div>
                <div className="absolute bottom-0 left-0 w-24 h-24 bg-white rounded-full translate-y-12 -translate-x-12"></div>
              </div>

              {/* Content */}
              <div className="relative z-10 h-full flex flex-col justify-center min-h-[250px]">
                <div className="bg-white/20 backdrop-blur-sm px-4 py-1.5 rounded-full text-sm font-semibold w-fit mb-4">
                  🔥 Limited Time
                </div>

                <h3 className="text-xl md:text-2xl font-bold mb-3 md:mb-4">
                  Extra 15% Off
                </h3>

                <p className="text-orange-100 mb-6">
                  Use code:{" "}
                  <span className="font-mono font-bold text-white">
                    FLASH15
                  </span>
                </p>

                <Link
                  to={"/shop"}
                  className="bg-white text-orange-600 px-6 py-3 rounded-xl font-bold hover:bg-gray-100 transition-colors w-fit"
                >
                  Shop Now
                </Link>
              </div>

              {/* Floating Animated Circles */}
              <div className="absolute top-4 right-4 w-7 h-7 md:w-8 md:h-8 bg-yellow-400 rounded-full animate-bounce [animation-delay:0.2s]"></div>
              <div className="absolute bottom-4 left-4 w-5 h-5 md:w-6 md:h-6 bg-white/30 rounded-full animate-bounce [animation-delay:0.4s]"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TopDealsToday;
