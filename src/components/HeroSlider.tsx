import React, { useState, useEffect } from "react";
import {
  ChevronLeft,
  ChevronRight,
  Play,
  Pause,
  ArrowRight,
} from "lucide-react";

interface Slide {
  title: string;
  description: string;
  buttonText: string;
  gradient: string;
  image?: string;
}

const slides: Slide[] = [
  {
    title: "Summer Sale Up To 50% Off",
    description:
      "Get the best deals on top brands. Limited time offer! Don't miss out on incredible savings.",
    buttonText: "Shop Now",
    gradient: "bg-gradient-to-r from-blue-500 to-purple-600",
    image: "🛍️",
  },
  {
    title: "New Collection Just Arrived",
    description:
      "Discover the latest trends in fashion and electronics. Fresh styles for every season.",
    buttonText: "Explore",
    gradient: "bg-gradient-to-r from-green-500 to-teal-600",
    image: "🌟",
  },
  {
    title: "Free Shipping On Orders Over $50",
    description:
      "Shop with confidence with our 30-day return policy. Fast delivery guaranteed.",
    buttonText: "Learn More",
    gradient: "bg-gradient-to-r from-red-500 to-pink-600",
    image: "🚚",
  },
  {
    title: "Exclusive Member Benefits",
    description:
      "Join our loyalty program and get access to special discounts and early product releases.",
    buttonText: "Join Now",
    gradient: "bg-gradient-to-r from-orange-500 to-yellow-600",
    image: "👑",
  },
];

const HeroSlider: React.FC = () => {
  const [current, setCurrent] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const length = slides.length;

  // Auto-slide with pause control
  useEffect(() => {
    const timer = setInterval(() => {
      handleNext();
    }, 5000);

    return () => clearInterval(timer);
  }, [length]);

  const handleNext = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrent((prev) => (prev + 1) % length);
    setTimeout(() => setIsTransitioning(false), 700);
  };

  const handlePrev = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrent((prev) => (prev - 1 + length) % length);
    setTimeout(() => setIsTransitioning(false), 700);
  };

  const goToSlide = (index: number) => {
    if (isTransitioning || current === index) return;
    setIsTransitioning(true);
    setCurrent(index);
    setTimeout(() => setIsTransitioning(false), 700);
  };

  return (
    <section className="container mx-auto px-3">
      <div className="relative w-full overflow-hidden rounded-3xl shadow-2xl mx-auto group">
        <div className="relative h-[600px] overflow-hidden">
          {slides.map((slide, index) => (
            <div
              key={index}
              className={`absolute inset-0 ${
                slide.gradient
              } transition-all duration-700 ease-in-out ${
                current === index
                  ? "opacity-100 transform translate-x-0"
                  : index < current
                  ? "opacity-0 transform -translate-x-full"
                  : "opacity-0 transform translate-x-full"
              }`}
            >
              {/* Background Pattern */}
              <div className="absolute inset-0 opacity-10">
                <div className="absolute top-0 left-0 w-72 h-72 bg-white rounded-full -translate-x-1/2 -translate-y-1/2"></div>
                <div className="absolute bottom-0 right-0 w-96 h-96 bg-white rounded-full translate-x-1/2 translate-y-1/2"></div>
              </div>

              {/* Content */}
              <div className="relative h-full flex items-center">
                <div className="container mx-auto px-8">
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                    {/* Text Content */}
                    <div
                      className={`space-y-6 text-white ${
                        index % 2 === 0 ? "lg:order-1" : "lg:order-2"
                      } [animation:0.8s_ease-out_0.3s_both_fade-in-up]`}
                    >
                      <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-medium mb-4">
                        <span className="w-2 h-2 bg-white rounded-full animate-pulse"></span>
                        Special Offer
                      </div>

                      <h1 className="text-5xl lg:text-6xl xl:text-7xl font-black leading-tight">
                        {slide.title}
                      </h1>

                      <p className="text-xl lg:text-2xl opacity-90 leading-relaxed">
                        {slide.description}
                      </p>

                      <div className="flex flex-col sm:flex-row gap-4 pt-4">
                        <button className="group/btn bg-white text-gray-900 px-8 py-4 rounded-2xl font-bold text-lg hover:bg-gray-100 transition-all duration-300 hover:scale-105 shadow-2xl hover:shadow-3xl flex items-center gap-3">
                          {slide.buttonText}
                          <ArrowRight className="w-5 h-5 group-hover/btn:translate-x-1 transition-transform" />
                        </button>

                        <button className="border-2 border-white/50 text-white px-8 py-4 rounded-2xl font-bold text-lg hover:bg-white/10 transition-all duration-300 backdrop-blur-sm">
                          View Details
                        </button>
                      </div>
                    </div>

                    {/* Image/Icon Content */}
                    <div
                      className={`flex justify-center ${
                        index % 2 === 0 ? "lg:order-2" : "lg:order-1"
                      } [animation:1s_ease-out_0.5s_both_scale-in]`}
                    >
                      <div className="relative">
                        <div className="text-8xl lg:text-9xl xl:text-[10rem] transform hover:scale-110 transition-transform duration-500">
                          {slide.image}
                        </div>

                        {/* Floating Elements */}
                        <div className="absolute -top-4 -right-4 w-8 h-8 bg-yellow-400 rounded-full animate-bounce [animation-delay:0.2s]"></div>
                        <div className="absolute -bottom-2 -left-4 w-6 h-6 bg-pink-400 rounded-full animate-bounce [animation-delay:0.4s]"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Navigation Buttons */}
        <button
          onClick={handlePrev}
          className="absolute left-6 top-1/2 transform -translate-y-1/2 bg-black/20 backdrop-blur-sm p-4 rounded-2xl hover:bg-black/40 transition-all duration-300 opacity-0 group-hover:opacity-100 hover:scale-110 cursor-pointer"
        >
          <ChevronLeft className="w-6 h-6 text-white" />
        </button>

        <button
          onClick={handleNext}
          className="absolute right-6 top-1/2 transform -translate-y-1/2 bg-black/20 backdrop-blur-sm p-4 rounded-2xl hover:bg-black/40 transition-all duration-300 opacity-0 group-hover:opacity-100 hover:scale-110 cursor-pointer"
        >
          <ChevronRight className="w-6 h-6 text-white" />
        </button>

        {/* Controls Container */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex items-center gap-6 bg-black/20 backdrop-blur-sm px-6 py-3 rounded-2xl">
          {/* Indicators */}
          <div className="flex gap-3">
            {slides.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`relative overflow-hidden rounded-full transition-all duration-300 cursor-pointer ${
                  current === index
                    ? "w-8 bg-white"
                    : "w-3 bg-white/50 hover:bg-white/70"
                } h-3`}
              >
                {/* Progress Bar for Active Slide */}
                {current === index && (
                  <div className="absolute top-0 left-0 h-full bg-white/30 rounded-full [animation:5s_linear_progress-bar]" />
                )}
              </button>
            ))}
          </div>

          {/* Slide Counter */}
          <div className="text-white text-sm font-medium min-w-16 text-center">
            {current + 1} / {length}
          </div>
        </div>

        {/* Gradient Overlay */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black/20 to-transparent pointer-events-none"></div>
      </div>
    </section>
  );
};

export default HeroSlider;
