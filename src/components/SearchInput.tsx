import { Search } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const SearchInput = () => {
  const [input, setInput] = useState<string>("");
  const navigate = useNavigate();

  const handlerOnClick = () => {
    if (input.trim().length <= 2) {
      toast.error("Search term must be at least 3 characters.");
      return;
    }
    setInput("");
    navigate(`/shop?search=${encodeURIComponent(input.trim())}`);
  };

  return (
    <div className="relative w-full">
      <input
        type="text"
        placeholder="Search for products..."
        value={input}
        onChange={(e) => setInput(e.target.value)}
        className="w-full py-2 px-4 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-primary"
      />

      <button
        onClick={handlerOnClick}
        className="absolute right-0 top-0 h-full px-4 bg-primary text-white rounded-r-full hover:bg-secondary transition-colors flex items-center justify-center"
      >
        <Search size={18} />
      </button>
    </div>
  );
};

export default SearchInput;
