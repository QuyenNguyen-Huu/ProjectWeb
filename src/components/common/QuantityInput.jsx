import React from 'react';
// (Bạn có thể cần chạy: npm install lucide-react)
import { Minus, Plus } from 'lucide-react'; 

const QuantityInput = ({ quantity, onDecrease, onIncrease }) => {
  return (
    <div className="flex items-center border border-gray-600 w-fit">
      <button
        onClick={onDecrease}
        className="px-2 py-1 text-gray-400 hover:text-white disabled:opacity-50"
        disabled={quantity <= 1} // Vô hiệu hóa khi số lượng là 1
      >
        <Minus size={16} />
      </button>
      <input
        type="text"
        readOnly
        value={quantity}
        className="w-10 text-center bg-transparent text-white outline-none"
      />
      <button
        onClick={onIncrease}
        className="px-2 py-1 text-gray-400 hover:text-white"
      >
        <Plus size={16} />
      </button>
    </div>
  );
};

export default QuantityInput;