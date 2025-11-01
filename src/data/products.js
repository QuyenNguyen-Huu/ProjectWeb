// --- Bảng Size (Tách riêng để tái sử dụng cho nhanh) ---
export const CLOTHING_SIZE_CHART_HTML = `
  <h4 class="font-bold text-lg my-3">Bảng size (cm)</h4>
  <div class="overflow-x-auto">
    <table class="w-full text-left border-collapse border border-gray-300">
      <thead>
        <tr class="bg-gray-100">
          <th class="p-2 border border-gray-300">Size</th>
          <th class="p-2 border border-gray-300">Ngực</th>
          <th class="p-2 border border-gray-300">Eo</th>
          <th class="p-2 border border-gray-300">Hông</th>
        </tr>
      </thead>
      <tbody>
        <tr><td class="p-2 border border-gray-300">XS</td><td class="p-2 border border-gray-300">86 – 91</td><td class="p-2 border border-gray-300">71 – 76</td><td class="p-2 border border-gray-300">81 – 86</td></tr>
        <tr><td class="p-2 border border-gray-300">S</td><td class="p-2 border border-gray-300">91 – 97</td><td class="p-2 border border-gray-300">76 – 81</td><td class="p-2 border border-gray-300">86 – 91</td></tr>
        <tr><td class="p-2 border border-gray-300">M</td><td class="p-2 border border-gray-300">97 – 102</td><td class="p-2 border border-gray-300">81 – 86</td><td class="p-2 border border-gray-300">91 – 97</td></tr>
        <tr><td class="p-2 border border-gray-300">L</td><td class="p-2 border border-gray-300">102 – 107</td><td class="p-2 border border-gray-300">86 – 91</td><td class="p-2 border border-gray-300">97 – 102</td></tr>
      </tbody>
    </table>
  </div>
`;

export const SHOES_SIZE_CHART_HTML = `
  <h4 class="font-bold text-lg my-3">Bảng quy đổi size giày nam (US - UK - EU - CM)</h4>
  <div class="overflow-x-auto">
    <table class="w-full text-left border-collapse border border-gray-300">
      <thead>
        <tr class="bg-gray-100">
          <th class="p-2 border border-gray-300">US Size</th>
          <th class="p-2 border border-gray-300">UK Size</th>
          <th class="p-2 border border-gray-300">EU Size</th>
          <th class="p-2 border border-gray-300">Chiều dài chân (CM)</th>
        </tr>
      </thead>
      <tbody>
        <tr><td class="p-2 border border-gray-300">6</td><td class="p-2 border border-gray-300">5.5</td><td class="p-2 border border-gray-300">39</td><td class="p-2 border border-gray-300">24.5cm</td></tr>
        <tr><td class="p-2 border border-gray-300">6.5</td><td class="p-2 border border-gray-300">6</td><td class="p-2 border border-gray-300">39.5</td><td class="p-2 border border-gray-300">25cm</td></tr>
        <tr><td class="p-2 border border-gray-300">7</td><td class="p-2 border border-gray-300">6.5</td><td class="p-2 border border-gray-300">40</td><td class="p-2 border border-gray-300">25.3cm</td></tr>
        <tr><td class="p-2 border border-gray-300">7.5</td><td class="p-2 border border-gray-300">7</td><td class="p-2 border border-gray-300">40.5</td><td class="p-2 border border-gray-300">25.5cm</td></tr>
        <tr><td class="p-2 border border-gray-300">8</td><td class="p-2 border border-gray-300">7.5</td><td class="p-2 border border-gray-300">41</td><td class="p-2 border border-gray-300">26cm</td></tr>
        <tr><td class="p-2 border border-gray-300">8.5</td><td class="p-2 border border-gray-300">8</td><td class="p-2 border border-gray-300">42</td><td class="p-2 border border-gray-300">26.5 cm</td></tr>
        <tr><td class="p-2 border border-gray-300">9</td><td class="p-2 border border-gray-300">8.5</td><td class="p-2 border border-gray-300">42.5</td><td class="p-2 border border-gray-300">27cm</td></tr>
        <tr><td class="p-2 border border-gray-300">9.5</td><td class="p-2 border border-gray-300">9</td><td class="p-2 border border-gray-300">43</td><td class="p-2 border border-gray-300">27.5cm</td></tr>
      </tbody>
    </table>
  </div>
`;

// --- DATABASE SẢN PHẨM TRUNG TÂM ---

export const ALL_PRODUCTS = [
  // --- MOCKUP QUẦN ÁO (Sản phẩm đang xem) ---
  {
    id: 301,
    slug: "bo-quan-ao-ba-mon-nu-zoot-womens-ltd-tri-aero-fz-racesuit-bella-p39113173",
    name: "Bộ Quần Áo Ba Môn Nữ Zoot Women's LTD Tri Aero FZ Racesuit - Bella",
    brand: "Zoot",
    sku: "SV-ZFT350990",
    price: "6,990,000 VNĐ",
    oldPrice: null,
    salePercent: null,
    category: 'clothing', // <-- QUAN TRỌNG
    images_card: [
      "https://pos.nvncdn.com/be3294-43017/ps/20251020_RTBesDbTCn.jpeg?v=1760934854",
      "https://pos.nvncdn.com/be3294-43017/ps/20251018_llY0feKjFK.jpeg?v=1760771662"
    ],
    images_detail: [
      "https://pos.nvncdn.com/be3294-43017/ps/20251020_RTBesDbTCn.jpeg?v=1760934854",
      "https://pos.nvncdn.com/be3294-43017/ps/20251018_llY0feKjFK.jpeg?v=1760771662",
      "https://pos.nvncdn.com/be3294-43017/ps/20251018_EGa4aTsdxm.jpeg?v=1760771660",
      "https://pos.nvncdn.com/be3294-43017/ps/20251018_oL1U7S0BeY.jpeg?v=1760771664"
    ],
    sizes: ["S", "M"],
    highlights: [
      "Vento Aero Fabric: giảm lực cản gió, tối ưu tốc độ",
      "Cool Storage Pockets: giúp làm mát cơ thể trong điều kiện nóng",
      "PRO Carbon Tri Chamois: đệm mỏng nhẹ, êm ái ở tư thế aero",
    ],
    description_content: [
      {
        type: 'paragraph',
        title: "Thiết Kế Đột Phá",
        content: "Được tinh chỉnh để đạt sự cân bằng hoàn hảo giữa khí động học và sự thoải mái, Zoot LTD Tri Aero Full Zip Racesuit là trang bị lý tưởng cho những vận động viên."
      },
      {
        type: 'image',
        src: "https://pos.nvncdn.com/be3294-43017/ps/20251018_llY0feKjFK.jpeg?v=1760771662",
        alt: "Ảnh mô tả chi tiết sản phẩm"
      },
      {
        type: 'paragraph',
        title: "Công Nghệ Vải Vượt Trội",
        content: "Cấu trúc khí động học mới giúp giảm lực cản và tiết kiệm năng lượng, trong khi các túi chứa đồ bên trong giúp điều hòa thân nhiệt hiệu quả."
      }
    ],
    composition_content: {
      size_details: [
        "S (Ngực 91-97, Eo 76-81, Hông 86-91)",
        "M (Ngực 97-102, Eo 81-86, Hông 91-97)"
      ],
      feature_details: [
        "Chất liệu: Vento Aero Fabric",
        "Khóa kéo: Cam Lock Zipper toàn thân",
        "Chống nắng: UPF 50+"
      ]
    }
  },

  // --- MOCKUP GIÀY ---
  {
    id: 101,
    slug: "giay-chay-bo-nam-on-running-cloudboom-max-limeraspberry-p39113276",
    name: "Giày Chạy Bộ Nam On Running Cloudboom Max - Lime/Raspberry",
    brand: "On Running",
    sku: "SV-ZFT39113276",
    price: "5,890,000 VNĐ",
    oldPrice: null,
    salePercent: null,
    category: 'shoes', // <-- QUAN TRỌNG
    images_card: [
      "https://pos.nvncdn.com/be3294-43017/ps/20250814_4MOvOkyePH.jpeg?v=1755141499",
      "https://pos.nvncdn.com/be3294-43017/ps/Giay-Chay-Bo-Nam-On-Running-Cloudboom-Max-Lime-Raspberry.jpg?v=1755083235"
    ],
    images_detail: [
      "https://pos.nvncdn.com/be3294-43017/ps/20250814_4MOvOkyePH.jpeg?v=1755141499",
      "https.://pos.nvncdn.com/be3294-43017/ps/Giay-Chay-Bo-Nam-On-Running-Cloudboom-Max-Lime-Raspberry.jpg?v=1755083235",
      "https://pos.nvncdn.com/be3294-43017/ps/20250814_WqL7sA2pS0.jpeg?v=1755141503",
      "https://pos.nvncdn.com/be3294-43017/ps/20250814_V3lEa2xVHY.jpeg?v=1755141502"
    ],
    sizes: ["40", "41", "42", "43", "44"],
    highlights: [
      "Công nghệ đế CloudTec Phase®",
      "Đệm Helion™ HF siêu mềm",
      "Tấm Speedboard® nylon-blend",
    ],
    description_content: [
      {
        type: 'paragraph',
        title: "Đệm Tối Đa, Hiệu Suất Cực Đại",
        content: "Cloudboom Max là đôi giày chạy bộ có đệm dày nhất của On, được thiết kế để mang lại sự thoải mái và hoàn trả năng lượng vượt trội cho các cự ly dài."
      },
      {
        type: 'image',
        src: "https://pos.nvncdn.com/be3294-43017/ps/20250814_WqL7sA2pS0.jpeg?v=1755141503",
        alt: "Ảnh đế giày Cloudboom Max"
      }
    ],
    composition_content: {
      size_details: [
        "US 7 (EU 40)",
        "US 8 (EU 41)",
        "US 9 (EU 42.5)",
      ],
      feature_details: [
        "Trọng lượng: 270g (size 9 US)",
        "Độ dốc (Heel-toe drop): 6mm",
        "Địa hình: Đường nhựa (Road)"
      ]
    }
  },

  // --- 8 SẢN PHẨM PLACEHOLDER (Bạn tự điền) ---
  // ... (Thêm 4 quần áo và 4 giày nữa ở đây) ...
  // Ví dụ:
  {
    id: 102,
    slug: "placeholder-shoe-2-p102",
    name: "Placeholder Giày 2",
    brand: "Hoka",
    sku: "SKU-102",
    price: "3,000,000 VNĐ",
    oldPrice: "4,000,000 VNĐ",
    salePercent: 25,
    category: 'shoes',
    images_card: ["https://via.placeholder.com/300/FF0000/FFFFFF?text=Shoe+2+A", "https://via.placeholder.com/300/FF0000/FFFFFF?text=Shoe+2+B"],
    images_detail: ["https://via.placeholder.com/500/FF0000/FFFFFF?text=Shoe+2+A", "https://via.placeholder.com/500/FF0000/FFFFFF?text=Shoe+2+B", "https://via.placeholder.com/500/FF0000/FFFFFF?text=Shoe+2+C", "https://via.placeholder.com/500/FF0000/FFFFFF?text=Shoe+2+D"],
    sizes: ["40", "41"],
    highlights: ["Highlight A", "Highlight B"],
    description_content: [{ type: 'paragraph', title: "Title", content: "Content" }],
    composition_content: { size_details: ["Size info"], feature_details: ["Feature info"] }
  },
  {
    id: 202,
    slug: "placeholder-clothing-2-p202",
    name: "Placeholder Áo 2",
    brand: "On Running",
    sku: "SKU-202",
    price: "1,500,000 VNĐ",
    oldPrice: null,
    salePercent: null,
    category: 'clothing',
    images_card: ["https://via.placeholder.com/300/0000FF/FFFFFF?text=Clothing+2+A", "https://via.placeholder.com/300/0000FF/FFFFFF?text=Clothing+2+B"],
    images_detail: ["https://via.placeholder.com/500/0000FF/FFFFFF?text=Clothing+2+A", "https://via.placeholder.com/500/0000FF/FFFFFF?text=Clothing+2+B", "https://via.placeholder.com/500/0000FF/FFFFFF?text=Clothing+2+C", "https://via.placeholder.com/500/0000FF/FFFFFF?text=Clothing+2+D"],
    sizes: ["M", "L"],
    highlights: ["Highlight C", "Highlight D"],
    description_content: [{ type: 'paragraph', title: "Title", content: "Content" }],
    composition_content: { size_details: ["Size info"], feature_details: ["Feature info"] }
  },
  // ... (thêm 6 cái nữa)
];