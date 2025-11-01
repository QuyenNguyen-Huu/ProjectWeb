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
  {
    id: 301,
    slug: "bo-quan-ao-ba-mon-nu-zoot-womens-ltd-tri-aero-fz-racesuit-bella-p39113173",
    name: "Bộ Quần Áo Ba Môn Nữ Zoot Women's LTD Tri Aero FZ Racesuit - Bella",
    brand: "Zoot",
    sku: "SV-ZFT350990",
    price: "6,990,000 VNĐ",
    oldPrice: null,
    salePercent: null,
    category: 'clothing',
    images_card: [
      "https://pos.nvncdn.com/be3294-43017/ps/20251020_RTBesDbTCn.jpeg?v=1760934854",
      "https://pos.nvncdn.com/be3294-43017/ps/20251018_llY0feKjFK.jpeg?v=1760771662"
    ],
    images_detail: [
      "https://pos.nvncdn.com/be3294-43017/ps/20251020_RTBesDbTCn.jpeg?v=1760934854",
      "https://pos.nvncdn.com/be3294-43017/ps/20251018_llY0feKjFK.jpeg?v=1760771662",
      "https://pos.nvncdn.com/be3294-43017/ps/20251018_EGa4aTsdxm.jpeg?v=1760771660",
      "https://pos.nvncdn.com/be3294-43017/ps/20251018_oL1U7S0BeY.jpeg?v=1760771664",
      "https://pos.nvncdn.com/be3294-43017/ps/20251018_oL1U7S0BeY.jpeg?v=1760771664",
      "https://pos.nvncdn.com/be3294-43017/ps/20251018_oL1U7S0BeY.jpeg?v=1760771664"
    ],
    sizes: ["S", "M"],
    highlights: [
      "Vento Aero Fabric: giảm lực cản gió, tối ưu tốc độ",
      "Cool Storage Pockets: giúp làm mát cơ thể trong điều kiện nóng",
      "PRO Carbon Tri Chamois: đệm mỏng nhẹ, êm ái ở tư thế aero",
      "Cam Lock Zipper: khóa kéo toàn thân dễ thao tác khi thi đấu",
      "Italian Shield Fabric: co giãn 4 chiều, thoáng khí và bảo vệ UPF 50+"
    ],
    description_content: [
      {
        type: 'paragraph',
        title: "Thiết Kế Đột Phá - ZOOT LTD TRI AERO FZ RACESUIT",
        content: "Được tinh chỉnh để đạt sự cân bằng hoàn hảo giữa khí động học và sự thoải mái, Zoot LTD Tri Aero Full Zip Racesuit là trang bị lý tưởng cho những vận động viên theo đuổi thành tích cao trong ba môn phối hợp."
      },
      {
        type: 'image',
        src: "https://pos.nvncdn.com/be3294-43017/ps/20251018_llY0feKjFK.jpeg?v=1760771662",
        alt: "Ảnh mô tả chi tiết sản phẩm"
      },
      {
        type: 'paragraph',
        title: "Công Nghệ Vải Vượt Trội",
        content: "Cấu trúc khí động học mới giúp giảm lực cản và tiết kiệm năng lượng, trong khi các túi chứa đồ bên trong giúp điều hòa thân nhiệt hiệu quả. Zoot thiết kế theo RACE FIT – ôm sát để tối ưu tốc độ và hiệu suất khí động học. Nếu bạn muốn cảm giác thoải mái hơn, hãy chọn lớn hơn 1 size. Zoot LTD Tri Aero Fz Racesuit – Khi từng giây trên đường đua đều có giá trị. Hiệu suất đỉnh cao, thiết kế tinh tế, dành cho những vận động viên dám bứt phá giới hạn."
      }
    ],
  },
  {
    id: 302,
    slug: "ao-chay-bo-nam-compressport-pro-racing-ss-tshirt-m-fluo-redtr-p39113893",
    name: "Áo Chạy Bộ Nam Compressport Pro Racing SS TShirt M- Fluo Red-TR",
    brand: "Compressport",
    sku: "SV-ATSM3613090",
    price: "2,850,000 VNĐ",
    oldPrice: null,
    salePercent: null,
    category: 'clothing',
    images_card: [
      "https://pos.nvncdn.com/be3294-43017/ps/20251016_SlgOHpasXk.jpeg?v=1760621156",
      "https://pos.nvncdn.com/be3294-43017/ps/20251016_wNE9U4b2l7.webp?v=1760583135"
    ],
    images_detail: [
      "https://pos.nvncdn.com/be3294-43017/ps/20251016_SlgOHpasXk.jpeg?v=1760621156",
      "https://pos.nvncdn.com/be3294-43017/ps/20251016_wNE9U4b2l7.webp?v=1760583135",
      "https://pos.nvncdn.com/be3294-43017/ps/20251016_9SdaivYyJ5.webp?v=1760583140",
      "https://pos.nvncdn.com/be3294-43017/ps/20251016_GaS21BxHh4.webp?v=1760583159"
    ],
    sizes: ["S", "M", "L"],
    highlights: [
      "Trọng lượng: 59g",
      "Thành phần: 90% Polyamide, 10% Elastane",
      "Thoáng khí tối đa",
      "Không ma sát, không kích ứng",
      "Cử động linh hoạt, hiện đại",
      "Chi tiết phản quang ở lưng và hai bên"
    ],
    description_content: [
      {
        type: 'paragraph',
        title: "Mô tả sản phẩm - Compressport Pro Racing SS Tshirt",
        content: "Compressport Pro Racing SS Tshirt là mẫu áo chạy bộ cao cấp dành cho những vận động viên theo đuổi hiệu suất tối đa. Với trọng lượng siêu nhẹ và khả năng thoáng khí vượt trội, chiếc áo này giúp bạn cảm nhận được sự tự do tuyệt đối trên từng sải chân, từ vạch xuất phát đến khi cán đích."
      },
      {
        type: 'image',
        src: "https://pos.nvncdn.com/be3294-43017/ps/20251016_2diOSksWA0.jpeg?v=1760583140",
        alt: "Ảnh mô tả chi tiết sản phẩm"
      },
      {
        type: 'paragraph',
        title: "Đặc điểm nổi bật",
        content: "Siêu nhẹ: Chất liệu “featherweight” khiến áo gần như không trọng lượng, mang lại cảm giác như không mặc gì, lý tưởng cho các vận động viên chạy đường dài hoặc thi đấu."
      }
    ],
  },
  {
    id: 303,
    slug: "bo-quan-ao-ba-mon-nu-zoot-womens-elite-tri-aero-fz-racesuit-chromoflow-p39113968",
    name: "Bộ Quần Áo Ba Môn Nữ Zoot Women's Elite Tri Aero Fz Racesuit - Chromoflow",
    brand: "Zoot",
    sku: "SV-EFT300000",
    price: "8,490,000 VNĐ",
    oldPrice: "9,990,000 VNĐ",
    salePercent: 15,
    category: 'clothing',
    images_card: [
      "https://pos.nvncdn.com/be3294-43017/ps/20251020_Sq8Etp6H1H.jpeg?v=1761295843",
      "https://pos.nvncdn.com/be3294-43017/ps/20251020_1lbnBSLroM.webp?v=1760932752"
    ],
    images_detail: [
      "https://pos.nvncdn.com/be3294-43017/ps/20251020_Sq8Etp6H1H.jpeg?v=1761295843",
      "https://pos.nvncdn.com/be3294-43017/ps/20251020_1lbnBSLroM.webp?v=1760932752",
      "https://pos.nvncdn.com/be3294-43017/ps/20251020_z1ibb79nQQ.webp?v=1760932748",
      "https://pos.nvncdn.com/be3294-43017/ps/20251020_G4NN1btOt9.webp?v=1760932750"
    ],
    sizes: ["S", "M", "L"],
    highlights: [
      "Vải nén Exos™ cao cấp",
      "Thiết kế khí động học Highway Ribbed",
      "Đệm PRO Carbon Tri Chamois",
      "Khóa kéo Cam Lock toàn thân",
      "Chống nắng UPF 50+ và viền silicon Ý"
    ],
    description_content: [
      {
        type: 'paragraph',
        title: "Zoot Elite Tri Aero Fz Racesuit",
        content: "Sự kết hợp hoàn hảo giữa tốc độ, độ thoải mái và phong cách, bộ trisuit Zoot Elite Tri Aero được thiết kế cho những vận động viên hướng tới bục podium."
      },
      {
        type: 'image',
        src: "https://pos.nvncdn.com/be3294-43017/ps/20251020_aaGdcmOIpZ.webp?v=1760932746",
        alt: "Ảnh mô tả chi tiết sản phẩm"
      },
      {
        type: 'paragraph',
        title: "Tính năng nổi bật",
        content: "Vải nén Exos™ High Thread Count: hỗ trợ cơ bắp và tăng lưu thông máu, có bề mặt chống mài mòn, đàn hồi cao."
      }
    ],
  },
  {
    id: 304,
    slug: "ao-khoac-chay-bo-nam-on-running-mens-weather-jacket-desertcinder-p39113601",
    name: "Áo Khoác Chạy Bộ Nam On Running Men's Weather Jacket - Desert/Cinder",
    brand: "On Running",
    sku: "SV-1ME1031315",
    price: "5,648,000 VNĐ",
    oldPrice: "7,060,000 VNĐ",
    salePercent: 20,
    category: 'clothing',
    images_card: [
      "https://pos.nvncdn.com/be3294-43017/ps/20250905_CmmW3bkZ0I.jpeg?v=1757127220",
      "https://pos.nvncdn.com/be3294-43017/ps/20250905_EskMG6S41F.png?v=1757064126"
    ],
    images_detail: [
      "https://pos.nvncdn.com/be3294-43017/ps/20250905_CmmW3bkZ0I.jpeg?v=1757127220",
      "https://pos.nvncdn.com/be3294-43017/ps/20250905_EskMG6S41F.png?v=1757064126",
      "https://pos.nvncdn.com/be3294-43017/ps/20250905_yhExyjAfU4.png?v=1757064132",
      "https://pos.nvncdn.com/be3294-43017/ps/20250905_m3r2Vy1SWS.png?v=1757064138"
    ],
    sizes: ["S", "M", "L"],
    highlights: [
      "Chống gió vượt trội",
      "Trọng lượng siêu nhẹ: chỉ 230g",
      "Hệ thống thoát khí ẩn",
      "Gấp gọn vào túi áo",
      "Thiết kế khuỷu tay xoắn",
      "Chi tiết phản quang",
      "Cấu trúc vạt chồng phía trước và sau"
    ],
    description_content: [
      {
        type: 'paragraph',
        title: "Áo khoác chạy bộ ON Running Weather Jacket. Siêu nhẹ, chống gió, cho mọi điều kiện thời tiết",
        content: "ON Weather Jacket là chiếc áo khoác lý tưởng cho những buổi chạy trong điều kiện thời tiết thay đổi. Siêu nhẹ, chống gió, thoáng khí và dễ gấp gọn, sản phẩm này giúp bạn sẵn sàng đối mặt với mọi cung đường, từ phố thị đến núi rừng."
      },
      {
        type: 'image',
        src: "https://pos.nvncdn.com/be3294-43017/ps/content/Ao-Khoac-Chay-Bo-Nu-On-Running-Women-s-Weather-Jacket-Nimbus-Lilac_155.jpg",
        alt: "Ảnh mô tả chi tiết sản phẩm"
      },
      {
        type: 'paragraph',
        title: "Hướng dẫn bảo quản",
        content: "Giặt tay hoặc giặt máy chế độ nhẹ, nước lạnh. Không tẩy, không giặt khô, không ủi."
      }
    ],
  },
  {
    id: 305,
    slug: "ao-khoac-chong-nuoc-nam-nnormal-trail-rain-jacket-black-men-black-p39113423",
    name: "Áo Khoác Chống Nước Nam NNormal Trail Rain Jacket Black Men - Black",
    brand: "NNormal",
    sku: "N2CMRJ1-001-L",
    price: "6,360,000 VNĐ",
    oldPrice: " 7,950,000 VNĐ",
    salePercent: 20,
    category: 'clothing',
    images_card: [
      "https://pos.nvncdn.com/be3294-43017/ps/20250827_lYBAuUQNjy.jpeg?v=1756364127",
      "https://pos.nvncdn.com/be3294-43017/ps/20250827_acXRo6kzbn.png?v=1756294041"
    ],
    images_detail: [
      "https://pos.nvncdn.com/be3294-43017/ps/20250827_lYBAuUQNjy.jpeg?v=1756364127",
      "https://pos.nvncdn.com/be3294-43017/ps/20250827_acXRo6kzbn.png?v=1756294041",
      "https://pos.nvncdn.com/be3294-43017/ps/20250827_dm0ThqDbqR.png?v=1756294046",
      "https://pos.nvncdn.com/be3294-43017/ps/20250827_rYK3Ld4oYa.png?v=1756294048"
    ],
    sizes: ["S", "M", "L"],
    highlights: [
      "Chống mưa vượt trội với công nghệ PERTEX® SHIELD REVOLVE và cột nước 20.000mm",
      "Áo có độ thoáng khí 20.000g/m², giúp bạn luôn khô thoáng khi vận động cường độ cao",
      "Thiết kế siêu nhẹ, linh hoạt và dễ gấp gọn, phù hợp cho chạy trail đường dài",
      "Sản phẩm được làm từ 100% polyester tái chế, không chứa PFCs và thân thiện với môi trường",
      "Được các vận động viên elite như Dakota Jones đánh giá là một game-changer cho mọi runner"
    ],
    description_content: [
      {
        type: 'paragraph',
        title: "Áo khoác chống nước chạy trail NNormal Trail Rain Jacket",
        content: "Công nghệ tuần hoàn | Hiệu năng vượt trội | Bảo vệ tối đa"
      },
      {
        type: 'image',
        src: "https://pos.nvncdn.com/be3294-43017/ps/content/20250829_l58REOB2.jpg",
        alt: "Ảnh mô tả chi tiết sản phẩm"
      },
      {
        type: 'paragraph',
        title: "Giới thiệu",
        content: "NNormal Trail Rain Jacket là lớp giáp chống chọi với thiên nhiên, được thiết kế riêng cho những người yêu chạy trail muốn bảo vệ toàn diện mà vẫn thoải mái. Đây không chỉ là một chiếc áo khoác mưa mà là sự kết hợp hoàn hảo giữa công nghệ tiên tiến, thiết kế tối ưu cho hiệu suất và cam kết bền vững với môi trường."
      }
    ],
  },
  {
    id: 101,
    slug: "giay-chay-bo-nam-on-running-cloudboom-max-limeraspberry-p39113276",
    name: "Giày Chạy Bộ Nam On Running Cloudboom Max - Lime/Raspberry",
    brand: "On Running",
    sku: "SV-ZFT39113276",
    price: "5,890,000 VNĐ",
    oldPrice: null,
    salePercent: null,
    category: 'shoes',
    images_card: [
      "https://pos.nvncdn.com/be3294-43017/ps/20250814_4MOvOkyePH.jpeg?v=1755141499",
      "https://pos.nvncdn.com/be3294-43017/ps/Giay-Chay-Bo-Nam-On-Running-Cloudboom-Max-Lime-Raspberry.jpg?v=1755083235"
    ],
    images_detail: [
      "https://pos.nvncdn.com/be3294-43017/ps/20250814_4MOvOkyePH.jpeg?v=1755141576",
      "https://pos.nvncdn.com/be3294-43017/ps/Giay-Chay-Bo-Nam-On-Running-Cloudboom-Max-Lime-Raspberry.jpg?v=1755083235",
      "https://pos.nvncdn.com/be3294-43017/ps/20250814_r2olNjdf5M.webp?v=1755141565",
      "https://pos.nvncdn.com/be3294-43017/ps/20250814_xibDjo6Xeg.webp?v=1755141567",
      "https://pos.nvncdn.com/be3294-43017/ps/20250814_Ig8q7jajJu.webp?v=1755141569",
      "https://pos.nvncdn.com/be3294-43017/ps/20250814_VmhgPy0IMH.webp?v=1755141571",
      "https://pos.nvncdn.com/be3294-43017/ps/20250814_DXs0VPJ83P.webp?v=1755141573"
    ],
    sizes: ["40", "41", "42", "42.5", "43", "44"],
    highlights: [
      "Trọng lượng siêu nhẹ 250g, tối ưu tốc độ",
      "Hai lớp Helion™ HF hyper foam hoàn trả năng lượng tối đa",
      "Tấm Speedboard® sợi thủy tinh tăng hiệu suất đẩy chân",
      "Thân giày siêu thoáng khí, ôm sát bàn chân",
      "Đế cao su bám đường vượt trội cho chạy road"
    ],
    description_content: [
      { 
        type: 'paragraph', 
        title: "Đệm Tối Đa, Hiệu Suất Cực Đại", 
        content: "..." },
      { 
        type: 'image', 
        src: "...", 
        alt: "..." },
      { 
        type: 'paragraph', 
        title: "Đệm Tối Đa, Hiệu Suất Cực Đại", 
        content: "..." },
    ],
  },
    {
    id: 102,
    slug: "norda-001-giay-chay-dia-hinh-nam-norda-001-glitch-p39111159",
    name: "Norda 001 | Giày Chạy Địa Hình Nam Norda 001 - Glitch",
    brand: "Norda",
    sku: "SV-Norda001-GLC-M",
    price: "5,907,500 VNĐ",
    oldPrice: "6,950,000 VNĐ",
    salePercent: 15,
    category: 'shoes',
    images_card: [
      "https://pos.nvncdn.com/be3294-43017/ps/20250903_n1EurAs95u.jpeg?v=1756891886",
      "https://pos.nvncdn.com/be3294-43017/ps/20250309_gplY7BXFHj.jpeg?v=1741507007"
    ],
    images_detail: [
      "https://pos.nvncdn.com/be3294-43017/ps/20250903_n1EurAs95u.jpeg?v=1756891886",
      "https://pos.nvncdn.com/be3294-43017/ps/20250309_gplY7BXFHj.jpeg?v=1741507007",
      "https://pos.nvncdn.com/be3294-43017/ps/20250309_7E6QxYuSej.jpeg?v=1741507009",
      "https://pos.nvncdn.com/be3294-43017/ps/20250309_e5z1v8N45W.jpeg?v=1741507013"
    ],
    sizes: ["40 2/3", "41 1/3", "42 2/3", "43 1/3", "44", "44 2/3"],
    highlights: [
      "Sử dụng chất liệu Dyneema gốc sinh học nhẹ và bền nhất thế giới",
      "Đế giữa và đế ngoài được sản xuất độc quyền từ Vibram, chất liệu đế tốt nhất thế thới",
      "Trọng lượng: 232g",
      "Drop: 5mm",
      "Đế trong eTPU được thiết kế tùy chỉnh để có khả năng hấp thụ và hoàn trả năng lượng cao nhất có thể."
    ],
    description_content: [
      {
        type: 'paragraph',
        title: "Norda 001 - Đột phá trong tầm tay",
        content: "Một cuộc cách mạng đối với dòng sản phẩm giày chạy trail. Norda 001 là giày chạy địa hình liền mạch, đầu tiên trên thế giới được làm bằng Bio-Dyneema®, vật liệu nhẹ nhất và bền nhất thế giới"
      },
      {
        type: 'image',
        src: "https://pos.nvncdn.com/be3294-43017/ps/content/20240404_SlPI0zY8.jpg",
        alt: "Ảnh mô tả chi tiết sản phẩm"
      },
      {
        type: 'paragraph',
        title: "",
        content: "Norda 001 được chế tạo từ đế giữa và mặt để Vibram® độc quyền cùng với sợi Bio-Dyneema® liền mạch, là đôi giày đầu tiên trên thế giới đạt đến cảnh giới tối cao của sự sáng tạo"
      }
    ],
  },
    {
    id: 103,
    slug: "speedgoat-6-wide-giay-chay-dia-hinh-nu-hoka-speedgoat-6-wide-gmc-p39113346",
    name: "Speedgoat 6 Wide | Giày Chạy Địa Hình Nữ Hoka Speedgoat 6 Wide - GMC",
    brand: "HOKA",
    sku: "1147832-GMC",
    price: "3,399,150 VNĐ",
    oldPrice: "3,999,000 VNĐ",
    salePercent: 20,
    category: 'shoes',
    images_card: [
      "https://pos.nvncdn.com/be3294-43017/ps/20250904_Jgzv1RW7SJ.jpeg?v=1756979161",
      "https://pos.nvncdn.com/be3294-43017/ps/20250824_sp0ywqV3iN.jpeg?v=1756050545"
    ],
    images_detail: [
      "https://pos.nvncdn.com/be3294-43017/ps/20250904_Jgzv1RW7SJ.jpeg?v=1756979161",
      "https://pos.nvncdn.com/be3294-43017/ps/20250824_sp0ywqV3iN.jpeg?v=1756050545",
      "https://pos.nvncdn.com/be3294-43017/ps/20250824_aHflL9GjBY.jpeg?v=1756050547",
      "https://pos.nvncdn.com/be3294-43017/ps/20250824_1sUwA4jszq.jpeg?v=1756050549"
    ],
    sizes: ["S", "M", "L"],
    highlights: [
      "Upper dệt siêu nhẹ, thoáng khí",
      "Đế Vibram® Megagrip với gai 5mm",
      "Foam mới nhẹ hơn, phản hồi nhanh hơn",
      "Khung đỡ ôm chân + lưỡi gà kép êm ái",
      "Phù hợp đa địa hình và cự ly",
      "Trọng lượng: 232g (size nữ), 278g (size nam)"
    ],
    description_content: [
      {
        type: 'paragraph',
        title: "Hoka Speedgoat 6 – Tự tin chinh phục mọi cung đường trail",
        content: "Speedgoat 6 được mệnh danh là “GOAT” (Greatest of All Time) trong thế giới giày trail, sinh ra để chinh phục địa hình khắc nghiệt. Kết hợp đệm êm trứ danh của HOKA với độ bám Vibram® Megagrip vượt trội và vật liệu siêu nhẹ, Speedgoat 6 mang đến hành trình vừa nhanh, ổn định, an toàn."
      },
      {
        type: 'image',
        src: "https://pos.nvncdn.com/be3294-43017/ps/content/20250826_PmYqbKuw.jpg",
        alt: "Ảnh mô tả chi tiết sản phẩm"
      },
      {
        type: 'paragraph',
        title: "",
        content: "Được tinh chỉnh từ những phản hồi của các elite runner, phiên bản mới nhất sở hữu upper dệt thoáng khí, hệ thống chassis ôm gọn bàn chân, lưỡi gà kép dày dặn hơn, cùng đế ngoài lấy cảm hứng từ móng dê để tăng độ bám trên mọi địa hình."
      }
    ],
  },
    {
    id: 104,
    slug: "mafate-x-giay-chay-dia-hinh-nam-hoka-mafate-x-bksk-p39113031",
    name: "Mafate X | Giày Chạy Địa Hình Nam Hoka Mafate X - BKSK",
    brand: "HOKA",
    sku: "SV-1161990-BKSK",
    price: "4,349,250 VNĐ",
    oldPrice: "2,850,000 VNĐ",
    salePercent: 25,
    category: 'shoes',
    images_card: [
      "https://pos.nvncdn.com/be3294-43017/ps/20250723_oHY6jCfkW5.jpeg?v=1760606439",
      "https://pos.nvncdn.com/be3294-43017/ps/20250723_11iNp2hpTK.webp?v=1753254595"
    ],
    images_detail: [
      "https://pos.nvncdn.com/be3294-43017/ps/20250723_oHY6jCfkW5.jpeg?v=1760606439",
      "https://pos.nvncdn.com/be3294-43017/ps/20250723_11iNp2hpTK.webp?v=1753254595",
      "https://pos.nvncdn.com/be3294-43017/ps/20250723_Y763SAgUfO.jpeg?v=1753254596",
      "https://pos.nvncdn.com/be3294-43017/ps/20250723_7IXcf8qZQr.png?v=1753254599",
      "https://pos.nvncdn.com/be3294-43017/ps/20250723_rxkiRE6QHL.webp?v=1753254605"
    ],
    sizes: ["40 2/3", "41 1/3", "42 2/3", "43 1/3", "44", "44 2/3"],
    highlights: [
      "Trọng lượng: ~344g (size 44)",
      "Độ dày đế: 49mm gót / 41mm mũi (drop 8mm)",
      "Đế ngoài: Vibram® Megagrip với gai 3.5mm",
      "Tấm carbon: Forked carbon fiber plate (tấm carbon chia nhánh)",
      "Đệm giữa: Lớp PEBA phía trên, EVA siêu nhẹ phía dưới",
      "Upper: Lưới dệt siêu nhẹ, thoáng khí, thoát nước tốt"
    ],
    description_content: [
      {
        type: 'paragraph',
        title: "HOKA MAFATE X – Siêu phẩm trail cho ultra runner",
        content: "Hoka Mafate X là mẫu giày trail cao cấp mới nhất của Hoka, được thiết kế dành riêng cho những cung đường dài, địa hình đa dạng và các giải ultra trail khắc nghiệt. Với sự kết hợp giữa công nghệ đệm tiên tiến và tấm carbon, Mafate X mang đến trải nghiệm chạy mượt mà, ổn định và đầy năng lượng."
      },
      {
        type: 'image',
        src: "https://pos.nvncdn.com/be3294-43017/ps/content/20250506_fjjGlz8O.png",
        alt: "Ảnh mô tả chi tiết sản phẩm"
      },
      {
        type: 'paragraph',
        title: "Phù hợp với ai?",
        content: "Ultra runner: Những người chạy cự ly dài, cần sự êm ái và ổn định trong suốt hành trình. Trail runner: Người thường xuyên chạy trên địa hình đa dạng, từ đường mòn đến núi đá. Người tìm kiếm sự đổi mới: Runner muốn trải nghiệm công nghệ tấm carbon trong giày trail."
      }
    ],
  },
    {
    id: 105,
    slug: "giay-di-bo-duong-dai-hoka-transport-wwh-eegg-p38897308",
    name: "Giày Đi Bộ Đường Dài HOKA Transport - WWH - EEGG",
    brand: "HOKA",
    sku: "1123154-EEGG",
    price: "1,999,500 VNĐ",
    oldPrice: "3,999,000 VNĐ",
    salePercent: 50,
    category: 'shoes',
    images_card: [
      "https://pos.nvncdn.com/be3294-43017/ps/20230221_rVW6DZfRH782XYJ4.jpeg?v=1676948919",
      "https://pos.nvncdn.com/be3294-43017/ps/20230220_BVzX2iMBBwFboEa6.jpeg?v=1676907217"
    ],
    images_detail: [
      "https://pos.nvncdn.com/be3294-43017/ps/20230221_rVW6DZfRH782XYJ4.jpeg?v=1676948919",
      "https://pos.nvncdn.com/be3294-43017/ps/20230220_BVzX2iMBBwFboEa6.jpeg?v=1676907217",
      "https://pos.nvncdn.com/be3294-43017/ps/20230220_v9ELtlBS4RQZjrO0.jpeg?v=1676907219",
      "https://pos.nvncdn.com/be3294-43017/ps/20230220_cJlxQSpz65J2iEvF.jpeg?v=1676907220",
      "https://pos.nvncdn.com/be3294-43017/ps/20230220_O7k2USLVrDqXPCM3.jpeg?v=1676907215"
    ],
    sizes: ["40 2/3", "41 1/3", "42 2/3", "43 1/3", "44", "44 2/3"],
    highlights: [
      "Địa hình: Mọi địa hình",
      "Sử dụng luyện tập: đi hằng ngày, dã ngoại, outdoor",
      "Trọng lượng: 257g",
      "Drop: 5mm",
    ],
    description_content: [
      {
        type: 'paragraph',
        title: "Hoka Transport",
        content: "Đôi giày Hoka Transport là sự kết hợp hoàn hảo giữa phong cách lifestyle và hiệu suất trong quá trình di chuyển. Hoka Transport mang lại một thiết kế bền vững và năng động cho người đi trong từng phần của đôi giày."
      },
      {
        type: 'image',
        src: "https://pos.nvncdn.com/be3294-43017/ps/20230220_BVzX2iMBBwFboEa6.jpeg?v=1676907217",
        alt: "Ảnh mô tả chi tiết sản phẩm"
      },
      {
        type: 'paragraph',
        title: "Tính năng",
        content: "Địa hình, công dụng: Mọi địa hình, đi hằng ngày hoặc trekking"
      }
    ],
  }
];