// categories.ts
import {
  Star,
  ShoppingBag,
  Shirt,
  Smartphone,
  Monitor,
  Home,
  Lamp,
  Gift,
  Wrench,
  Plane,
  Cookie,
} from "lucide-react";
import type { ReactNode } from "react";

export interface ICategory {
  icon: ReactNode;
  name: string;
}

export const categories: ICategory[] = [
  { icon: <Star size={26} />, name: "Deals" },
  { icon: <ShoppingBag size={26} />, name: "Grocery" },
  { icon: <Shirt size={26} />, name: "Fashion" },
  { icon: <Smartphone size={26} />, name: "Mobile" },
  { icon: <Monitor size={26} />, name: "Electronics" },
  { icon: <Home size={26} />, name: "Home" },
  { icon: <Lamp size={26} />, name: "Dining" },
  { icon: <Gift size={26} />, name: "Gifts" },
  { icon: <Wrench size={26} />, name: "Tools" },
  { icon: <Plane size={26} />, name: "Travel" },
  { icon: <Cookie size={26} />, name: "Others" },
];

const Categories = () => {
  return (
    <div className="flex gap-8 md:gap-12 overflow-x-auto py-7 md:justify-center container mx-auto px-3 ">
      {categories.map((cat, index) => (
        <div key={index} className="flex flex-col items-center gap-2 group">
          <div className="text-6xl p-5  rounded-xl bg-gray-100 group-hover:bg-yellow-100 cursor-pointer transition duration-300">
            {cat.icon}
          </div>
          <div className="text-sm transition duration-300 group-hover:underline">
            {cat.name}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Categories;
