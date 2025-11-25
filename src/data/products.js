// --- Bảng Size (Tách riêng để tái sử dụng cho nhanh) ---
// Function để tạo bảng size động theo ngôn ngữ
export const getClothingSizeChartHTML = (t) => `
  <h4 class="font-bold text-lg my-3">${t ? t('product.sizeChart.title') : 'Bảng size (cm)'}</h4>
  <div class="overflow-x-auto">
    <table class="w-full text-left border-collapse border border-gray-300">
      <thead>
        <tr class="bg-gray-100">
          <th class="p-2 border border-gray-300">Size</th>
          <th class="p-2 border border-gray-300">${t ? t('product.sizeChart.chest') : 'Ngực'}</th>
          <th class="p-2 border border-gray-300">${t ? t('product.sizeChart.waist') : 'Eo'}</th>
          <th class="p-2 border border-gray-300">${t ? t('product.sizeChart.hip') : 'Hông'}</th>
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

export const getShoesSizeChartHTML = (t) => `
  <h4 class="font-bold text-lg my-3">${t ? t('product.sizeChart.shoesTitle') : 'Bảng quy đổi size giày nam (US - UK - EU - CM)'}</h4>
  <div class="overflow-x-auto">
    <table class="w-full text-left border-collapse border border-gray-300">
      <thead>
        <tr class="bg-gray-100">
          <th class="p-2 border border-gray-300">US Size</th>
          <th class="p-2 border border-gray-300">UK Size</th>
          <th class="p-2 border border-gray-300">EU Size</th>
          <th class="p-2 border border-gray-300">${t ? t('product.sizeChart.footLength') : 'Chiều dài chân (CM)'}</th>
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

// Backward compatibility
export const CLOTHING_SIZE_CHART_HTML = getClothingSizeChartHTML();
export const SHOES_SIZE_CHART_HTML = getShoesSizeChartHTML();

// --- DATABASE SẢN PHẨM TRUNG TÂM ---
// export const ALL_PRODUCTS = [
//   {
//     id: 301,
//     slug: "bo-quan-ao-ba-mon-nu-zoot-womens-ltd-tri-aero-fz-racesuit-bella-p39113173",
//     name: "Bộ Quần Áo Ba Môn Nữ Zoot Women's LTD Tri Aero FZ Racesuit - Bella",
//     name_en: "Women's Zoot LTD Tri Aero FZ Racesuit - Bella",
//     brand: "Zoot",
//     sku: "SV-ZFT350990",
//     price: 6990000,
//     oldPrice: null,
//     salePercent: null,
//     category: 'clothing',
//     images_card: [
//       "https://pos.nvncdn.com/be3294-43017/ps/20251020_RTBesDbTCn.jpeg?v=1760934854",
//       "https://pos.nvncdn.com/be3294-43017/ps/20251018_llY0feKjFK.jpeg?v=1760771662"
//     ],
//     images_detail: [
//       "https://pos.nvncdn.com/be3294-43017/ps/20251020_RTBesDbTCn.jpeg?v=1760934854",
//       "https://pos.nvncdn.com/be3294-43017/ps/20251018_llY0feKjFK.jpeg?v=1760771662",
//       "https://pos.nvncdn.com/be3294-43017/ps/20251018_EGa4aTsdxm.jpeg?v=1760771660",
//       "https://pos.nvncdn.com/be3294-43017/ps/20251018_oL1U7S0BeY.jpeg?v=1760771664",
//       "https://pos.nvncdn.com/be3294-43017/ps/20251018_oL1U7S0BeY.jpeg?v=1760771664",
//       "https://pos.nvncdn.com/be3294-43017/ps/20251018_oL1U7S0BeY.jpeg?v=1760771664"
//     ],
//     sizes: ["S", "M"],
//     highlights: [
//       "Vento Aero Fabric: giảm lực cản gió, tối ưu tốc độ",
//       "Cool Storage Pockets: giúp làm mát cơ thể trong điều kiện nóng",
//       "PRO Carbon Tri Chamois: đệm mỏng nhẹ, êm ái ở tư thế aero",
//       "Cam Lock Zipper: khóa kéo toàn thân dễ thao tác khi thi đấu",
//       "Italian Shield Fabric: co giãn 4 chiều, thoáng khí và bảo vệ UPF 50+"
//     ],
//     highlights_en: [
//       "Vento Aero Fabric: reduces wind resistance, optimizes speed",
//       "Cool Storage Pockets: helps cool body in hot conditions",
//       "PRO Carbon Tri Chamois: thin, lightweight padding, comfortable in aero position",
//       "Cam Lock Zipper: full-body zipper easy to operate during competition",
//       "Italian Shield Fabric: 4-way stretch, breathable and UPF 50+ protection"
//     ],
//     description_content: [
//       {
//         type: 'paragraph',
//         title: "Thiết Kế Đột Phá - ZOOT LTD TRI AERO FZ RACESUIT",
//         title_en: "Breakthrough Design - ZOOT LTD TRI AERO FZ RACESUIT",
//         content: "Được tinh chỉnh để đạt sự cân bằng hoàn hảo giữa khí động học và sự thoải mái, Zoot LTD Tri Aero Full Zip Racesuit là trang bị lý tưởng cho những vận động viên theo đuổi thành tích cao trong ba môn phối hợp.",
//         content_en: "Refined to achieve the perfect balance between aerodynamics and comfort, the Zoot LTD Tri Aero Full Zip Racesuit is the ideal gear for athletes pursuing high performance in triathlon."
//       },
//       {
//         type: 'image',
//         src: "https://pos.nvncdn.com/be3294-43017/ps/20251018_llY0feKjFK.jpeg?v=1760771662",
//         alt: "Ảnh mô tả chi tiết sản phẩm"
//       },
//       {
//         type: 'paragraph',
//         title: "Công Nghệ Vải Vượt Trội",
//         title_en: "Superior Fabric Technology",
//         content: "Cấu trúc khí động học mới giúp giảm lực cản và tiết kiệm năng lượng, trong khi các túi chứa đồ bên trong giúp điều hòa thân nhiệt hiệu quả. Zoot thiết kế theo RACE FIT – ôm sát để tối ưu tốc độ và hiệu suất khí động học. Nếu bạn muốn cảm giác thoải mái hơn, hãy chọn lớn hơn 1 size. Zoot LTD Tri Aero Fz Racesuit – Khi từng giây trên đường đua đều có giá trị. Hiệu suất đỉnh cao, thiết kế tinh tế, dành cho những vận động viên dám bứt phá giới hạn.",
//         content_en: "New aerodynamic structure helps reduce drag and save energy, while internal storage pockets effectively regulate body temperature. Zoot designed with RACE FIT – form-fitting to optimize speed and aerodynamic performance. If you want a more comfortable feel, choose one size larger. Zoot LTD Tri Aero Fz Racesuit – When every second on the track counts. Peak performance, refined design, for athletes who dare to break limits."
//       }
//     ],
//   },
//   {
//     id: 302,
//     slug: "ao-chay-bo-nam-compressport-pro-racing-ss-tshirt-m-fluo-redtr-p39113893",
//     name: "Áo Chạy Bộ Nam Compressport Pro Racing SS TShirt M- Fluo Red-TR",
//     name_en: "Men's Compressport Pro Racing SS TShirt M- Fluo Red-TR",
//     brand: "Compressport",
//     sku: "SV-ATSM3613090",
//     price: 2850000,
//     oldPrice: null,
//     salePercent: null,
//     category: 'clothing',
//     images_card: [
//       "https://pos.nvncdn.com/be3294-43017/ps/20251016_SlgOHpasXk.jpeg?v=1760621156",
//       "https://pos.nvncdn.com/be3294-43017/ps/20251016_wNE9U4b2l7.webp?v=1760583135"
//     ],
//     images_detail: [
//       "https://pos.nvncdn.com/be3294-43017/ps/20251016_SlgOHpasXk.jpeg?v=1760621156",
//       "https://pos.nvncdn.com/be3294-43017/ps/20251016_wNE9U4b2l7.webp?v=1760583135",
//       "https://pos.nvncdn.com/be3294-43017/ps/20251016_9SdaivYyJ5.webp?v=1760583140",
//       "https://pos.nvncdn.com/be3294-43017/ps/20251016_GaS21BxHh4.webp?v=1760583159"
//     ],
//     sizes: ["S", "M", "L"],
//     highlights: [
//       "Trọng lượng: 59g",
//       "Thành phần: 90% Polyamide, 10% Elastane",
//       "Thoáng khí tối đa",
//       "Không ma sát, không kích ứng",
//       "Cử động linh hoạt, hiện đại",
//       "Chi tiết phản quang ở lưng và hai bên"
//     ],
//     highlights_en: [
//       "Weight: 59g",
//       "Material: 90% Polyamide, 10% Elastane",
//       "Maximum breathability",
//       "No friction, no irritation",
//       "Flexible, modern movement",
//       "Reflective details on back and sides"
//     ],
//     description_content: [
//       {
//         type: 'paragraph',
//         title: "Mô tả sản phẩm - Compressport Pro Racing SS Tshirt",
//         title_en: "Product Description - Compressport Pro Racing SS Tshirt",
//         content: "Compressport Pro Racing SS Tshirt là mẫu áo chạy bộ cao cấp dành cho những vận động viên theo đuổi hiệu suất tối đa. Với trọng lượng siêu nhẹ và khả năng thoáng khí vượt trội, chiếc áo này giúp bạn cảm nhận được sự tự do tuyệt đối trên từng sải chân, từ vạch xuất phát đến khi cán đích.",
//         content_en: "Compressport Pro Racing SS Tshirt is a premium running shirt designed for athletes pursuing maximum performance. With ultra-light weight and superior breathability, this shirt helps you feel absolute freedom with every stride, from start to finish."
//       },
//       {
//         type: 'image',
//         src: "https://pos.nvncdn.com/be3294-43017/ps/20251016_2diOSksWA0.jpeg?v=1760583140",
//         alt: "Ảnh mô tả chi tiết sản phẩm"
//       },
//       {
//         type: 'paragraph',
//         title: "Đặc điểm nổi bật",
//         title_en: "Key Features",
//         content: "Siêu nhẹ: Chất liệu \"featherweight\" khiến áo gần như không trọng lượng, mang lại cảm giác như không mặc gì, lý tưởng cho các vận động viên chạy đường dài hoặc thi đấu.",
//         content_en: "Ultra-light: The 'featherweight' material makes the shirt almost weightless, providing a feeling like wearing nothing, ideal for long-distance runners or competitors."
//       }
//     ],
//   },
//   {
//     id: 303,
//     slug: "bo-quan-ao-ba-mon-nu-zoot-womens-elite-tri-aero-fz-racesuit-chromoflow-p39113968",
//     name: "Bộ Quần Áo Ba Môn Nữ Zoot Women's Elite Tri Aero Fz Racesuit - Chromoflow",
//     name_en: "Women's Zoot Elite Tri Aero Fz Racesuit - Chromoflow",
//     brand: "Zoot",
//     sku: "SV-EFT300000",
//     price: 8490000,
//     oldPrice: 9990000,
//     salePercent: 15,
//     category: 'clothing',
//     images_card: [
//       "https://pos.nvncdn.com/be3294-43017/ps/20251020_Sq8Etp6H1H.jpeg?v=1761295843",
//       "https://pos.nvncdn.com/be3294-43017/ps/20251020_1lbnBSLroM.webp?v=1760932752"
//     ],
//     images_detail: [
//       "https://pos.nvncdn.com/be3294-43017/ps/20251020_Sq8Etp6H1H.jpeg?v=1761295843",
//       "https://pos.nvncdn.com/be3294-43017/ps/20251020_1lbnBSLroM.webp?v=1760932752",
//       "https://pos.nvncdn.com/be3294-43017/ps/20251020_z1ibb79nQQ.webp?v=1760932748",
//       "https://pos.nvncdn.com/be3294-43017/ps/20251020_G4NN1btOt9.webp?v=1760932750"
//     ],
//     sizes: ["S", "M", "L"],
//     highlights: [
//       "Vải nén Exos™ cao cấp",
//       "Thiết kế khí động học Highway Ribbed",
//       "Đệm PRO Carbon Tri Chamois",
//       "Khóa kéo Cam Lock toàn thân",
//       "Chống nắng UPF 50+ và viền silicon Ý"
//     ],
//     highlights_en: [
//       "Premium Exos™ compression fabric",
//       "Highway Ribbed aerodynamic design",
//       "PRO Carbon Tri Chamois padding",
//       "Full-body Cam Lock zipper",
//       "UPF 50+ sun protection and Italian silicone grippers"
//     ],
//     description_content: [
//       {
//         type: 'paragraph',
//         title: "Zoot Elite Tri Aero Fz Racesuit",
//         title_en: "Zoot Elite Tri Aero Fz Racesuit",
//         content: "Sự kết hợp hoàn hảo giữa tốc độ, độ thoải mái và phong cách, bộ trisuit Zoot Elite Tri Aero được thiết kế cho những vận động viên hướng tới bục podium.",
//         content_en: "The perfect combination of speed, comfort and style, the Zoot Elite Tri Aero trisuit is designed for athletes aiming for the podium."
//       },
//       {
//         type: 'image',
//         src: "https://pos.nvncdn.com/be3294-43017/ps/20251020_aaGdcmOIpZ.webp?v=1760932746",
//         alt: "Ảnh mô tả chi tiết sản phẩm"
//       },
//       {
//         type: 'paragraph',
//         title: "Tính năng nổi bật",
//         title_en: "Key Features",
//         content: "Vải nén Exos™ High Thread Count: hỗ trợ cơ bắp và tăng lưu thông máu, có bề mặt chống mài mòn, đàn hồi cao.",
//         content_en: "Exos™ High Thread Count compression fabric: supports muscles and increases blood circulation, with abrasion-resistant surface and high elasticity."
//       }
//     ],
//   },
//   {
//     id: 304,
//     slug: "ao-khoac-chay-bo-nam-on-running-mens-weather-jacket-desertcinder-p39113601",
//     name: "Áo Khoác Chạy Bộ Nam On Running Men's Weather Jacket - Desert/Cinder",
//     name_en: "Men's On Running Weather Jacket - Desert/Cinder",
//     brand: "On Running",
//     sku: "SV-1ME1031315",
//     price: 5648000,
//     oldPrice: 7060000,
//     salePercent: 20,
//     category: 'clothing',
//     images_card: [
//       "https://pos.nvncdn.com/be3294-43017/ps/20250905_CmmW3bkZ0I.jpeg?v=1757127220",
//       "https://pos.nvncdn.com/be3294-43017/ps/20250905_EskMG6S41F.png?v=1757064126"
//     ],
//     images_detail: [
//       "https://pos.nvncdn.com/be3294-43017/ps/20250905_CmmW3bkZ0I.jpeg?v=1757127220",
//       "https://pos.nvncdn.com/be3294-43017/ps/20250905_EskMG6S41F.png?v=1757064126",
//       "https://pos.nvncdn.com/be3294-43017/ps/20250905_yhExyjAfU4.png?v=1757064132",
//       "https://pos.nvncdn.com/be3294-43017/ps/20250905_m3r2Vy1SWS.png?v=1757064138"
//     ],
//     sizes: ["S", "M", "L"],
//     highlights: [
//       "Chống gió vượt trội",
//       "Trọng lượng siêu nhẹ: chỉ 230g",
//       "Hệ thống thoát khí ẩn",
//       "Gấp gọn vào túi áo",
//       "Thiết kế khuỷu tay xoắn",
//       "Chi tiết phản quang",
//       "Cấu trúc vạt chồng phía trước và sau"
//     ],
//     highlights_en: [
//       "Superior windproof",
//       "Ultra-light weight: only 230g",
//       "Hidden ventilation system",
//       "Packs into its own pocket",
//       "Twisted elbow design",
//       "Reflective details",
//       "Overlapping flap structure front and back"
//     ],
//     description_content: [
//       {
//         type: 'paragraph',
//         title: "Áo khoác chạy bộ ON Running Weather Jacket. Siêu nhẹ, chống gió, cho mọi điều kiện thời tiết",
//         title_en: "ON Running Weather Jacket. Ultra-light, windproof, for all weather conditions",
//         content: "ON Weather Jacket là chiếc áo khoác lý tưởng cho những buổi chạy trong điều kiện thời tiết thay đổi. Siêu nhẹ, chống gió, thoáng khí và dễ gấp gọn, sản phẩm này giúp bạn sẵn sàng đối mặt với mọi cung đường, từ phố thị đến núi rừng.",
//         content_en: "ON Weather Jacket is the ideal jacket for running in changing weather conditions. Ultra-light, windproof, breathable and easy to pack, this product helps you ready to face any route, from city streets to mountains."
//       },
//       {
//         type: 'image',
//         src: "https://pos.nvncdn.com/be3294-43017/ps/content/Ao-Khoac-Chay-Bo-Nu-On-Running-Women-s-Weather-Jacket-Nimbus-Lilac_155.jpg",
//         alt: "Ảnh mô tả chi tiết sản phẩm"
//       },
//       {
//         type: 'paragraph',
//         title: "Hướng dẫn bảo quản",
//         title_en: "Care Instructions",
//         content: "Giặt tay hoặc giặt máy chế độ nhẹ, nước lạnh. Không tẩy, không giặt khô, không ủi.",
//         content_en: "Hand wash or machine wash on gentle cycle, cold water. Do not bleach, do not dry clean, do not iron."
//       }
//     ],
//   },
//   {
//     id: 305,
//     slug: "ao-khoac-chong-nuoc-nam-nnormal-trail-rain-jacket-black-men-black-p39113423",
//     name: "Áo Khoác Chống Nước Nam NNormal Trail Rain Jacket Black Men - Black",
//     name_en: "Men's NNormal Trail Rain Jacket Black - Black",
//     brand: "NNormal",
//     sku: "N2CMRJ1-001-L",
//     price: 6360000,
//     oldPrice: 7950000,
//     salePercent: 20,
//     category: 'clothing',
//     images_card: [
//       "https://pos.nvncdn.com/be3294-43017/ps/20250827_lYBAuUQNjy.jpeg?v=1756364127",
//       "https://pos.nvncdn.com/be3294-43017/ps/20250827_acXRo6kzbn.png?v=1756294041"
//     ],
//     images_detail: [
//       "https://pos.nvncdn.com/be3294-43017/ps/20250827_lYBAuUQNjy.jpeg?v=1756364127",
//       "https://pos.nvncdn.com/be3294-43017/ps/20250827_acXRo6kzbn.png?v=1756294041",
//       "https://pos.nvncdn.com/be3294-43017/ps/20250827_dm0ThqDbqR.png?v=1756294046",
//       "https://pos.nvncdn.com/be3294-43017/ps/20250827_rYK3Ld4oYa.png?v=1756294048"
//     ],
//     sizes: ["S", "M", "L"],
//     highlights: [
//       "Chống mưa vượt trội với công nghệ PERTEX® SHIELD REVOLVE và cột nước 20.000mm",
//       "Áo có độ thoáng khí 20.000g/m², giúp bạn luôn khô thoáng khi vận động cường độ cao",
//       "Thiết kế siêu nhẹ, linh hoạt và dễ gấp gọn, phù hợp cho chạy trail đường dài",
//       "Sản phẩm được làm từ 100% polyester tái chế, không chứa PFCs và thân thiện với môi trường",
//       "Được các vận động viên elite như Dakota Jones đánh giá là một game-changer cho mọi runner"
//     ],
//     highlights_en: [
//       "Superior waterproof with PERTEX® SHIELD REVOLVE technology and 20,000mm water column",
//       "Breathability of 20,000g/m², keeps you dry during high-intensity activities",
//       "Ultra-light, flexible design, easy to pack, suitable for long trail runs",
//       "Made from 100% recycled polyester, PFC-free and environmentally friendly",
//       "Rated as a game-changer by elite athletes like Dakota Jones for all runners"
//     ],
//     description_content: [
//       {
//         type: 'paragraph',
//         title: "Áo khoác chống nước chạy trail NNormal Trail Rain Jacket",
//         title_en: "NNormal Trail Rain Jacket",
//         content: "Công nghệ tuần hoàn | Hiệu năng vượt trội | Bảo vệ tối đa",
//         content_en: "Circular technology | Superior performance | Maximum protection"
//       },
//       {
//         type: 'image',
//         src: "https://pos.nvncdn.com/be3294-43017/ps/content/20250829_l58REOB2.jpg",
//         alt: "Ảnh mô tả chi tiết sản phẩm"
//       },
//       {
//         type: 'paragraph',
//         title: "Giới thiệu",
//         title_en: "Introduction",
//         content: "NNormal Trail Rain Jacket là lớp giáp chống chọi với thiên nhiên, được thiết kế riêng cho những người yêu chạy trail muốn bảo vệ toàn diện mà vẫn thoải mái. Đây không chỉ là một chiếc áo khoác mưa mà là sự kết hợp hoàn hảo giữa công nghệ tiên tiến, thiết kế tối ưu cho hiệu suất và cam kết bền vững với môi trường.",
//         content_en: "NNormal Trail Rain Jacket is armor against nature, specially designed for trail runners who want comprehensive protection while staying comfortable. This is not just a rain jacket but a perfect combination of advanced technology, performance-optimized design, and environmental sustainability commitment."
//       }
//     ],
//   },
//   {
//     id: 101,
//     slug: "giay-chay-bo-nam-on-running-cloudboom-max-limeraspberry-p39113276",
//     name: "Giày Chạy Bộ Nam On Running Cloudboom Max - Lime/Raspberry",
//     name_en: "Men's On Running Cloudboom Max - Lime/Raspberry",
//     brand: "On Running",
//     sku: "SV-ZFT39113276",
//     price: 5890000,
//     oldPrice: null,
//     salePercent: null,
//     category: 'shoes',
//     images_card: [
//       "https://pos.nvncdn.com/be3294-43017/ps/20250814_4MOvOkyePH.jpeg?v=1755141499",
//       "https://pos.nvncdn.com/be3294-43017/ps/Giay-Chay-Bo-Nam-On-Running-Cloudboom-Max-Lime-Raspberry.jpg?v=1755083235"
//     ],
//     images_detail: [
//       "https://pos.nvncdn.com/be3294-43017/ps/20250814_4MOvOkyePH.jpeg?v=1755141576",
//       "https://pos.nvncdn.com/be3294-43017/ps/Giay-Chay-Bo-Nam-On-Running-Cloudboom-Max-Lime-Raspberry.jpg?v=1755083235",
//       "https://pos.nvncdn.com/be3294-43017/ps/20250814_r2olNjdf5M.webp?v=1755141565",
//       "https://pos.nvncdn.com/be3294-43017/ps/20250814_xibDjo6Xeg.webp?v=1755141567",
//       "https://pos.nvncdn.com/be3294-43017/ps/20250814_Ig8q7jajJu.webp?v=1755141569",
//       "https://pos.nvncdn.com/be3294-43017/ps/20250814_VmhgPy0IMH.webp?v=1755141571",
//       "https://pos.nvncdn.com/be3294-43017/ps/20250814_DXs0VPJ83P.webp?v=1755141573"
//     ],
//     sizes: ["40", "41", "42", "42.5", "43", "44"],
//     highlights: [
//       "Trọng lượng siêu nhẹ 250g, tối ưu tốc độ",
//       "Hai lớp Helion™ HF hyper foam hoàn trả năng lượng tối đa",
//       "Tấm Speedboard® sợi thủy tinh tăng hiệu suất đẩy chân",
//       "Thân giày siêu thoáng khí, ôm sát bàn chân",
//       "Đế cao su bám đường vượt trội cho chạy road"
//     ],
//     highlights_en: [
//       "Ultra-light weight 250g, optimizes speed",
//       "Dual-layer Helion™ HF hyper foam for maximum energy return",
//       "Fiberglass Speedboard® plate enhances propulsion efficiency",
//       "Ultra-breathable upper, snug fit on foot",
//       "Superior rubber outsole grip for road running"
//     ],
//     description_content: [
//       { 
//         type: 'paragraph', 
//         title: "Đệm Tối Đa, Hiệu Suất Cực Đại",
//         title_en: "Maximum Cushioning, Maximum Performance",
//         content: "On Running Cloudboom Max mang đến sự kết hợp hoàn hảo giữa đệm êm ái và khả năng hoàn trả năng lượng vượt trội. Với hai lớp Helion™ HF hyper foam và tấm Speedboard® sợi thủy tinh, đôi giày này được thiết kế cho những ai muốn chinh phục tốc độ và cự ly dài.",
//         content_en: "On Running Cloudboom Max delivers the perfect combination of plush cushioning and superior energy return. With dual-layer Helion™ HF hyper foam and fiberglass Speedboard®, this shoe is designed for those who want to conquer speed and long distances." },
//       { 
//         type: 'image', 
//         src: "https://pos.nvncdn.com/be3294-43017/ps/20250814_r2olNjdf5M.webp?v=1755141565", 
//         alt: "Ảnh mô tả chi tiết sản phẩm" },
//       { 
//         type: 'paragraph', 
//         title: "Công Nghệ Tiên Tiến",
//         title_en: "Advanced Technology",
//         content: "Cloudboom Max sử dụng công nghệ đệm kép độc quyền của On Running, kết hợp với tấm carbon sợi thủy tinh để tạo ra hiệu ứng đẩy mạnh mẽ ở mỗi bước chạy. Thân giày được thiết kế với vật liệu thoáng khí tối đa, giúp bàn chân luôn khô ráo và thoải mái suốt cả hành trình.",
//         content_en: "Cloudboom Max uses On Running's proprietary dual-cushioning technology, combined with a fiberglass carbon plate to create a powerful propulsion effect with every stride. The upper is designed with maximum breathable material, keeping feet dry and comfortable throughout the journey." },
//     ],
//   },
//     {
//     id: 102,
//     slug: "norda-001-giay-chay-dia-hinh-nam-norda-001-glitch-p39111159",
//     name: "Norda 001 | Giày Chạy Địa Hình Nam Norda 001 - Glitch",
//     name_en: "Men's Norda 001 Trail Running Shoes - Glitch",
//     brand: "Norda",
//     sku: "SV-Norda001-GLC-M",
//     price: 5907500,
//     oldPrice: 6950000,
//     salePercent: 15,
//     category: 'shoes',
//     images_card: [
//       "https://pos.nvncdn.com/be3294-43017/ps/20250903_n1EurAs95u.jpeg?v=1756891886",
//       "https://pos.nvncdn.com/be3294-43017/ps/20250309_gplY7BXFHj.jpeg?v=1741507007"
//     ],
//     images_detail: [
//       "https://pos.nvncdn.com/be3294-43017/ps/20250903_n1EurAs95u.jpeg?v=1756891886",
//       "https://pos.nvncdn.com/be3294-43017/ps/20250309_gplY7BXFHj.jpeg?v=1741507007",
//       "https://pos.nvncdn.com/be3294-43017/ps/20250309_7E6QxYuSej.jpeg?v=1741507009",
//       "https://pos.nvncdn.com/be3294-43017/ps/20250309_e5z1v8N45W.jpeg?v=1741507013"
//     ],
//     sizes: ["40 2/3", "41 1/3", "42 2/3", "43 1/3", "44", "44 2/3"],
//     highlights: [
//       "Sử dụng chất liệu Dyneema gốc sinh học nhẹ và bền nhất thế giới",
//       "Đế giữa và đế ngoài được sản xuất độc quyền từ Vibram, chất liệu đế tốt nhất thế thới",
//       "Trọng lượng: 232g",
//       "Drop: 5mm",
//       "Đế trong eTPU được thiết kế tùy chỉnh để có khả năng hấp thụ và hoàn trả năng lượng cao nhất có thể."
//     ],
//     highlights_en: [
//       "Uses Bio-Dyneema material, the lightest and most durable in the world",
//       "Midsole and outsole exclusively manufactured by Vibram, the world's best sole material",
//       "Weight: 232g",
//       "Drop: 5mm",
//       "Custom-designed eTPU insole for maximum energy absorption and return"
//     ],
//     description_content: [
//       {
//         type: 'paragraph',
//         title: "Norda 001 - Đột phá trong tầm tay",
//         title_en: "Norda 001 - Breakthrough Within Reach",
//         content: "Một cuộc cách mạng đối với dòng sản phẩm giày chạy trail. Norda 001 là giày chạy địa hình liền mạch, đầu tiên trên thế giới được làm bằng Bio-Dyneema®, vật liệu nhẹ nhất và bền nhất thế giới",
//         content_en: "A revolution in trail running shoes. Norda 001 is the world's first seamless trail running shoe made with Bio-Dyneema®, the lightest and most durable material in the world"
//       },
//       {
//         type: 'image',
//         src: "https://pos.nvncdn.com/be3294-43017/ps/content/20240404_SlPI0zY8.jpg",
//         alt: "Ảnh mô tả chi tiết sản phẩm"
//       },
//       {
//         type: 'paragraph',
//         title: "Đỉnh cao sáng tạo",
//         title_en: "Peak of Innovation",
//         content: "Norda 001 được chế tạo từ đế giữa và mặt để Vibram® độc quyền cùng với sợi Bio-Dyneema® liền mạch, là đôi giày đầu tiên trên thế giới đạt đến cảnh giới tối cao của sự sáng tạo",
//         content_en: "Norda 001 is crafted with exclusive Vibram® midsole and outsole combined with seamless Bio-Dyneema® upper, making it the world's first shoe to reach the pinnacle of innovation"
//       }
//     ],
//   },
//     {
//     id: 103,
//     slug: "speedgoat-6-wide-giay-chay-dia-hinh-nu-hoka-speedgoat-6-wide-gmc-p39113346",
//     name: "Speedgoat 6 Wide | Giày Chạy Địa Hình Nữ Hoka Speedgoat 6 Wide - GMC",
//     name_en: "Women's Hoka Speedgoat 6 Wide Trail Running Shoes - GMC",
//     brand: "HOKA",
//     sku: "1147832-GMC",
//     price: 3399150,
//     oldPrice: 3999000,
//     salePercent: 20,
//     category: 'shoes',
//     images_card: [
//       "https://pos.nvncdn.com/be3294-43017/ps/20250904_Jgzv1RW7SJ.jpeg?v=1756979161",
//       "https://pos.nvncdn.com/be3294-43017/ps/20250824_sp0ywqV3iN.jpeg?v=1756050545"
//     ],
//     images_detail: [
//       "https://pos.nvncdn.com/be3294-43017/ps/20250904_Jgzv1RW7SJ.jpeg?v=1756979161",
//       "https://pos.nvncdn.com/be3294-43017/ps/20250824_sp0ywqV3iN.jpeg?v=1756050545",
//       "https://pos.nvncdn.com/be3294-43017/ps/20250824_aHflL9GjBY.jpeg?v=1756050547",
//       "https://pos.nvncdn.com/be3294-43017/ps/20250824_1sUwA4jszq.jpeg?v=1756050549"
//     ],
//     sizes: ["S", "M", "L"],
//     highlights: [
//       "Upper dệt siêu nhẹ, thoáng khí",
//       "Đế Vibram® Megagrip với gai 5mm",
//       "Foam mới nhẹ hơn, phản hồi nhanh hơn",
//       "Khung đỡ ôm chân + lưỡi gà kép êm ái",
//       "Phù hợp đa địa hình và cự ly",
//       "Trọng lượng: 232g (size nữ), 278g (size nam)"
//     ],
//     highlights_en: [
//       "Ultra-light, breathable woven upper",
//       "Vibram® Megagrip outsole with 5mm lugs",
//       "New foam - lighter and more responsive",
//       "Supportive chassis + plush double gusset tongue",
//       "Suitable for various terrains and distances",
//       "Weight: 232g (women's size), 278g (men's size)"
//     ],
//     description_content: [
//       {
//         type: 'paragraph',
//         title: "Hoka Speedgoat 6 – Tự tin chinh phục mọi cung đường trail",
//         title_en: "Hoka Speedgoat 6 – Confidently Conquer Every Trail",
//         content: "Speedgoat 6 được mệnh danh là \"GOAT\" (Greatest of All Time) trong thế giới giày trail, sinh ra để chinh phục địa hình khắc nghiệt. Kết hợp đệm êm trứ danh của HOKA với độ bám Vibram® Megagrip vượt trội và vật liệu siêu nhẹ, Speedgoat 6 mang đến hành trình vừa nhanh, ổn định, an toàn.",
//         content_en: "Speedgoat 6 is dubbed the 'GOAT' (Greatest of All Time) in the trail shoe world, born to conquer challenging terrain. Combining HOKA's legendary cushioning with superior Vibram® Megagrip traction and ultra-light materials, Speedgoat 6 delivers a journey that's fast, stable, and safe."
//       },
//       {
//         type: 'image',
//         src: "https://pos.nvncdn.com/be3294-43017/ps/content/20250826_PmYqbKuw.jpg",
//         alt: "Ảnh mô tả chi tiết sản phẩm"
//       },
//       {
//         type: 'paragraph',
//         title: "Tinh chỉnh hoàn hảo",
//         title_en: "Perfect Refinement",
//         content: "Được tinh chỉnh từ những phản hồi của các elite runner, phiên bản mới nhất sở hữu upper dệt thoáng khí, hệ thống chassis ôm gọn bàn chân, lưỡi gà kép dày dặn hơn, cùng đế ngoài lấy cảm hứng từ móng dê để tăng độ bám trên mọi địa hình.",
//         content_en: "Refined from elite runner feedback, the latest version features breathable woven upper, supportive chassis that hugs the foot, plusher double gusset tongue, and goat hoof-inspired outsole for enhanced grip on all terrains."
//       }
//     ],
//   },
//     {
//     id: 104,
//     slug: "mafate-x-giay-chay-dia-hinh-nam-hoka-mafate-x-bksk-p39113031",
//     name: "Mafate X | Giày Chạy Địa Hình Nam Hoka Mafate X - BKSK",
//     name_en: "Men's Hoka Mafate X Trail Running Shoes - BKSK",
//     brand: "HOKA",
//     sku: "SV-1161990-BKSK",
//     price: 4349250,
//     oldPrice: 2850000,
//     salePercent: 25,
//     category: 'shoes',
//     images_card: [
//       "https://pos.nvncdn.com/be3294-43017/ps/20250723_oHY6jCfkW5.jpeg?v=1760606439",
//       "https://pos.nvncdn.com/be3294-43017/ps/20250723_11iNp2hpTK.webp?v=1753254595"
//     ],
//     images_detail: [
//       "https://pos.nvncdn.com/be3294-43017/ps/20250723_oHY6jCfkW5.jpeg?v=1760606439",
//       "https://pos.nvncdn.com/be3294-43017/ps/20250723_11iNp2hpTK.webp?v=1753254595",
//       "https://pos.nvncdn.com/be3294-43017/ps/20250723_Y763SAgUfO.jpeg?v=1753254596",
//       "https://pos.nvncdn.com/be3294-43017/ps/20250723_7IXcf8qZQr.png?v=1753254599",
//       "https://pos.nvncdn.com/be3294-43017/ps/20250723_rxkiRE6QHL.webp?v=1753254605"
//     ],
//     sizes: ["40 2/3", "41 1/3", "42 2/3", "43 1/3", "44", "44 2/3"],
//     highlights: [
//       "Trọng lượng: ~344g (size 44)",
//       "Độ dày đế: 49mm gót / 41mm mũi (drop 8mm)",
//       "Đế ngoài: Vibram® Megagrip với gai 3.5mm",
//       "Tấm carbon: Forked carbon fiber plate (tấm carbon chia nhánh)",
//       "Đệm giữa: Lớp PEBA phía trên, EVA siêu nhẹ phía dưới",
//       "Upper: Lưới dệt siêu nhẹ, thoáng khí, thoát nước tốt"
//     ],
//     highlights_en: [
//       "Weight: ~344g (size 44)",
//       "Stack height: 49mm heel / 41mm toe (8mm drop)",
//       "Outsole: Vibram® Megagrip with 3.5mm lugs",
//       "Carbon plate: Forked carbon fiber plate",
//       "Midsole: PEBA layer on top, ultra-light EVA below",
//       "Upper: Ultra-light woven mesh, breathable, excellent water drainage"
//     ],
//     description_content: [
//       {
//         type: 'paragraph',
//         title: "HOKA MAFATE X – Siêu phẩm trail cho ultra runner",
//         title_en: "HOKA MAFATE X – Trail Masterpiece for Ultra Runners",
//         content: "Hoka Mafate X là mẫu giày trail cao cấp mới nhất của Hoka, được thiết kế dành riêng cho những cung đường dài, địa hình đa dạng và các giải ultra trail khắc nghiệt. Với sự kết hợp giữa công nghệ đệm tiên tiến và tấm carbon, Mafate X mang đến trải nghiệm chạy mượt mà, ổn định và đầy năng lượng.",
//         content_en: "Hoka Mafate X is Hoka's latest premium trail shoe, specifically designed for long distances, diverse terrain, and demanding ultra trail races. With the combination of advanced cushioning technology and carbon plate, Mafate X delivers a smooth, stable, and energetic running experience."
//       },
//       {
//         type: 'image',
//         src: "https://pos.nvncdn.com/be3294-43017/ps/content/20250506_fjjGlz8O.png",
//         alt: "Ảnh mô tả chi tiết sản phẩm"
//       },
//       {
//         type: 'paragraph',
//         title: "Phù hợp với ai?",
//         title_en: "Who Is It For?",
//         content: "Ultra runner: Những người chạy cự ly dài, cần sự êm ái và ổn định trong suốt hành trình. Trail runner: Người thường xuyên chạy trên địa hình đa dạng, từ đường mòn đến núi đá. Người tìm kiếm sự đổi mới: Runner muốn trải nghiệm công nghệ tấm carbon trong giày trail.",
//         content_en: "Ultra runners: Those who run long distances, needing comfort and stability throughout the journey. Trail runners: People who frequently run on diverse terrain, from trails to rocky mountains. Innovation seekers: Runners who want to experience carbon plate technology in trail shoes."
//       }
//     ],
//   },
//     {
//     id: 105,
//     slug: "giay-di-bo-duong-dai-hoka-transport-wwh-eegg-p38897308",
//     name: "Giày Đi Bộ Đường Dài HOKA Transport - WWH - EEGG",
//     name_en: "HOKA Transport Hiking Shoes - WWH - EEGG",
//     brand: "HOKA",
//     sku: "1123154-EEGG",
//     price: 1999500,
//     oldPrice: 3999000,
//     salePercent: 50,
//     category: 'shoes',
//     images_card: [
//       "https://pos.nvncdn.com/be3294-43017/ps/20230221_rVW6DZfRH782XYJ4.jpeg?v=1676948919",
//       "https://pos.nvncdn.com/be3294-43017/ps/20230220_BVzX2iMBBwFboEa6.jpeg?v=1676907217"
//     ],
//     images_detail: [
//       "https://pos.nvncdn.com/be3294-43017/ps/20230221_rVW6DZfRH782XYJ4.jpeg?v=1676948919",
//       "https://pos.nvncdn.com/be3294-43017/ps/20230220_BVzX2iMBBwFboEa6.jpeg?v=1676907217",
//       "https://pos.nvncdn.com/be3294-43017/ps/20230220_v9ELtlBS4RQZjrO0.jpeg?v=1676907219",
//       "https://pos.nvncdn.com/be3294-43017/ps/20230220_cJlxQSpz65J2iEvF.jpeg?v=1676907220",
//       "https://pos.nvncdn.com/be3294-43017/ps/20230220_O7k2USLVrDqXPCM3.jpeg?v=1676907215"
//     ],
//     sizes: ["40 2/3", "41 1/3", "42 2/3", "43 1/3", "44", "44 2/3"],
//     highlights: [
//       "Địa hình: Mọi địa hình",
//       "Sử dụng luyện tập: đi hằng ngày, dã ngoại, outdoor",
//       "Trọng lượng: 257g",
//       "Drop: 5mm",
//     ],
//     highlights_en: [
//       "Terrain: All terrains",
//       "Usage: Daily wear, hiking, outdoor activities",
//       "Weight: 257g",
//       "Drop: 5mm"
//     ],
//     description_content: [
//       {
//         type: 'paragraph',
//         title: "Hoka Transport",
//         title_en: "Hoka Transport",
//         content: "Đôi giày Hoka Transport là sự kết hợp hoàn hảo giữa phong cách lifestyle và hiệu suất trong quá trình di chuyển. Hoka Transport mang lại một thiết kế bền vững và năng động cho người đi trong từng phần của đôi giày.",
//         content_en: "Hoka Transport shoes are the perfect combination of lifestyle style and performance during movement. Hoka Transport delivers a sustainable and dynamic design for the wearer in every part of the shoe."
//       },
//       {
//         type: 'image',
//         src: "https://pos.nvncdn.com/be3294-43017/ps/20230220_BVzX2iMBBwFboEa6.jpeg?v=1676907217",
//         alt: "Ảnh mô tả chi tiết sản phẩm"
//       },
//       {
//         type: 'paragraph',
//         title: "Tính năng",
//         title_en: "Features",
//         content: "Địa hình, công dụng: Mọi địa hình, đi hằng ngày hoặc trekking",
//         content_en: "Terrain and usage: All terrains, daily wear or trekking"
//       }
//     ],
//   }
// ];