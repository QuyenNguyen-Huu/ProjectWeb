import React, { useState, useRef, useLayoutEffect } from 'react';

// Chiều cao tối đa trước khi ẩn
const MAX_HEIGHT_PX = 400;

const CategoryDescription = ({ description }) => {
  // State để theo dõi trạng thái mở rộng/thu gọn
  const [isExpanded, setIsExpanded] = useState(false);
  
  // State để biết nội dung có thực sự dài hơn 400px hay không
  const [needsTruncation, setNeedsTruncation] = useState(false);

  // Ref để tham chiếu đến div chứa nội dung
  const contentRef = useRef(null);

  // Kiểm tra chiều cao sau khi render
  useLayoutEffect(() => {
    // Kiểm tra xem scrollHeight (chiều cao thật) có lớn hơn chiều cao tối đa không
    if (contentRef.current && contentRef.current.scrollHeight > MAX_HEIGHT_PX) {
      setNeedsTruncation(true);
    } else {
      setNeedsTruncation(false);
    }
  }, [description]); // Chạy lại khi nội dung mô tả thay đổi

  // Hàm xử lý click nút
  const toggleExpand = () => {
    setIsExpanded(prev => !prev);
  };

  // Nếu không có mô tả, không render gì cả
  if (!description) return null;

  return (
    
    <div className="w-full py-8 px-4 text-gray-300 bg-white">
      
      {/* Container chứa nội dung: */}
      <div 
        className={`
          relative transition-all duration-500 ease-in-out
          ${isExpanded ? 'max-h-none' : 'max-h-[400px] overflow-hidden'}
        `}
      >

        <div
          ref={contentRef}
          className="prose prose-invert max-w-none" // prose-invert cho nền tối
          dangerouslySetInnerHTML={{ __html: description }}
        />


      </div>

      {/* Nút "Đọc thêm"
        Chỉ hiển thị khi nội dung thực sự cần cắt bớt (needsTruncation)
      */}
      {needsTruncation && !isExpanded && (
        <div className="flex justify-center mt-6">
          <button
            onClick={toggleExpand}
            className="px-6 py-2 border border-[#3b82f6] text-[#3b82f6] rounded-md hover:bg-[#3b82f6] hover:text-white transition-colors duration-300"
          >
            Đọc thêm
          </button>
        </div>
      )}
    </div>
  );
};

export default CategoryDescription;
