import { useState, useEffect } from "react";
import ProductCard from "./ui/ProductCard";
import type { IProduct } from "../interface";

interface IProps {
  products: IProduct[];
  Count: number;
}

const SliderProducts = ({ products, Count }: IProps) => {
  const [index, setIndex] = useState(0);
  const [visibleCount, setVisibleCount] = useState(Count);

  const updateVisibleCount = () => {
    if (window.innerWidth < 640) setVisibleCount(1);
    else if (window.innerWidth < 1024) setVisibleCount(2);
    else setVisibleCount(Count);
  };

  useEffect(() => {
    updateVisibleCount();
    window.addEventListener("resize", updateVisibleCount);
    return () => window.removeEventListener("resize", updateVisibleCount);
  }, []);

  const maxIndex = Math.max(0, products.length - visibleCount);

  const next = () => setIndex((i) => (i < maxIndex ? i + 1 : i));
  const prev = () => setIndex((i) => (i > 0 ? i - 1 : i));

  return (
    <div className="relative">
      {/* Slider Container */}
      <div className="overflow-x-hidden">
        <div
          className="flex transition-transform duration-500"
          style={{
            transform: `translateX(-${index * (100 / visibleCount)}%)`,
          }}
        >
          {products.map((product) => (
            <div
              key={product.id}
              style={{ width: `${100 / visibleCount}%` }}
              className="shrink-0"
            >
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      </div>

      {/* Prev Button */}
      <button
        onClick={prev}
        className={`${
          index === 0 ? "hidden" : ""
        } absolute top-1/2 -left-3 -translate-y-1/2 
        bg-white shadow-lg w-10 h-10 rounded-full 
        flex justify-center items-center text-lg font-bold 
        hover:bg-gray-200 transition`}
      >
        ❮
      </button>

      <button
        onClick={next}
        className={`${
          index === maxIndex ? "hidden" : ""
        } absolute top-1/2 -right-3 -translate-y-1/2 
        bg-white shadow-lg w-10 h-10 rounded-full 
        flex justify-center items-center text-lg font-bold 
        hover:bg-gray-200 transition`}
      >
        ❯
      </button>
    </div>
  );
};

export default SliderProducts;
