import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Pagination from "./Pagination";
import SortBar from "./SortBar";
import ProductGrid from "./ProductGrid";
import useProducts from "./useProducts";
import CategoryDescription from '../Components/CategoryDescription/CategoryDescription';


const descriptionHtml = `
      <h3 class="text-xl font-bold mb-4 mt-6 text-gray-900">Đồ Chạy Bộ Nam – Sự Lựa Chọn Của Những Runner Đẳng Cấp</h3>
      <p class="mb-4 text-gray-900">Bạn đang tìm kiếm trang phục và giày chạy bộ <strong>cao cấp</strong>, đáp ứng được cả yếu tố <strong>hiệu suất, sự bền bỉ và tính thời trang</strong>? Bộ sưu tập <strong>đồ chạy bộ nam</strong> tại [Tên Website] mang đến những sản phẩm <strong>tốt nhất thế giới</strong>, giúp bạn <strong>tối ưu trải nghiệm chạy và chinh phục mọi cung đường</strong>.</p>
      
      <h3 class="text-lg font-bold mb-3 mt-5 text-gray-900">1. Vì sao runner cần đầu tư vào đồ chạy bộ chuyên dụng?</h3>
      <p class="mb-2 text-gray-900">✔ <strong>Công nghệ vải tiên tiến:</strong> Thoáng khí, hút ẩm nhanh giúp cơ thể luôn khô ráo và thoải mái.</p>
      <p class="mb-2 text-gray-900">✔ <strong>Thiết kế tối ưu hiệu suất:</strong> Co giãn linh hoạt, ôm vừa vặn nhưng không bó chặt, hỗ trợ chuyển động tối đa.</p>
      <p class="mb-2 text-gray-900">✔ <strong>Trọng lượng siêu nhẹ:</strong> Giảm thiểu lực cản, giúp runner cảm thấy tự do, linh hoạt hơn trong từng bước chạy.</p>
      <p class="mb-4 text-gray-900">✔ <strong>Thương hiệu chạy bộ đỉnh cao:</strong> Chúng tôi chỉ mang đến <strong>các thương hiệu cao cấp</strong> đã được các vận động viên chuyên nghiệp tin dùng.</p>
      
      <h3 class="text-lg font-bold mb-3 mt-5 text-gray-900">2. Bộ sưu tập đồ chạy bộ nam tại IMSPORTS</h3>
      <p class="mb-2 text-gray-900">🏃‍♂ <strong>Áo chạy bộ nam:</strong> Áo tank top, áo thun, áo dài tay thoáng khí, co giãn tốt.</p>
      <p class="mb-2 text-gray-900">🏃‍♂ <strong>Quần chạy bộ nam:</strong> Quần short siêu nhẹ, quần 2 lớp hỗ trợ tối đa, quần dài chống nắng.</p>
      <p class="mb-2 text-gray-900">🏃‍♂ <strong>Áo khoác chạy bộ nam:</strong> Giữ ấm, chống gió mà vẫn đảm bảo sự thông thoáng khi chạy.</p>
      <p class="mb-2 text-gray-900">🏃‍♂ <strong>Giày chạy bộ nam:</strong> Đệm êm, hỗ trợ tốt cho chạy đường nhựa, đường dài và thi đấu.</p>
      <p class="mb-2 text-gray-900">🏃‍♂ <strong>Giày chạy địa hình nam (trail running shoes):</strong></p>
      <ul class="list-disc pl-10 mb-4" style="padding-left: 40px;">
        <li class="mb-2 text-gray-900">🔹 <strong>HOKA – Thương hiệu giày trail "quốc dân"</strong> với độ êm ái vượt trội, phù hợp với đa số runner Việt Nam.</li>
        <li class="mb-2 text-gray-900">🔹 <strong>NNormal & Norda – Hai thương hiệu giày trail top 1 thế giới</strong> dành cho những người yêu thích sự bền bỉ, hiệu suất cao và độ bám vượt trội.</li>
      </ul>
      <p class="mb-2 text-gray-900">🏃‍♂ <strong>Dép chạy bộ nam (recovery sandals):</strong> Phục hồi chân nhanh chóng sau những buổi tập luyện cường độ cao.</p>
      <p class="mb-4 text-gray-900">🏃‍♂ <strong>Phụ kiện chạy bộ nam:</strong> Tất nén, mũ chạy bộ, găng tay giúp nâng cao trải nghiệm chạy.</p>

      <h3 class="text-lg font-bold mb-3 mt-5 text-gray-900">3. Những thương hiệu chạy bộ cao cấp tại IMSPORTS</h3>
      <p class="mb-2 text-gray-900">🔥 <strong>Giày chạy bộ nam:</strong> <strong>HOKA, NNormal, Norda, ON Running, Saucony, Xeroshoes, Salomon</strong> – những thương hiệu được các VĐV hàng đầu lựa chọn.</p>
      <p class="mb-4 text-gray-900">🔥 <strong>Trang phục chạy bộ nam:</strong> <strong>ON Running, Soar Running, 2XU, Compressport, Raidlight, T8, Runderwear</strong> – dòng sản phẩm <strong>hiệu suất cao, đảm bảo tối ưu cho từng cử động</strong>.</p>

      <h3 class="text-lg font-bold mb-3 mt-5 text-gray-900">4. Cách chọn đồ chạy bộ nam phù hợp theo nhu cầu</h3>
      <p class="mb-2 text-gray-900">✔ <strong>Chạy bộ trong thời tiết nóng ☀</strong> → Áo thoáng khí, quần short nhẹ, giày có độ thông thoáng cao.</p>
      <p class="mb-2 text-gray-900">✔ <strong>Chạy đường dài / marathon 🏃‍♂</strong> → Quần short có túi đựng gel, áo chống nắng, giày có độ đệm êm.</p>
      <p class="mb-2 text-gray-900">✔ <strong>Chạy địa hình (trail running) 🏔</strong> → <strong>Giày HOKA (phù hợp cho đa số runner) hoặc NNormal/Norda (hiệu suất cao, bám địa hình cực tốt)</strong>, áo khoác chống gió, quần có túi tiện lợi.</p>
      <p class="mb-4 text-gray-900">✔ <strong>Tập luyện hàng ngày & chạy cự ly ngắn 💪</strong> → Áo thun thể thao, quần short linh hoạt, dép recovery để phục hồi.</p>

      <p class="mb-2 text-gray-900"><strong>🔥 Sẵn sàng nâng tầm trải nghiệm chạy bộ của bạn? 🔥</strong></p>
      <p class="mb-4 text-gray-900">Tất cả sản phẩm tại <strong>IMSPORTS</strong> đều thuộc phân khúc <strong>chạy bộ cao cấp</strong>, giúp bạn <strong>tận hưởng từng bước chạy với sự thoải mái và hiệu suất tối ưu nhất</strong>. Khám phá ngay hôm nay! 🚀</p>
      <p class="mb-4 text-gray-900">Cửa hàng đồ thể thao IMSPORTS chuyên cung cấp đồ chạy bộ nam chính hãng chất lượng cao đến từ các thương hiệu nổi tiếng quốc tế với nhiều mẫu mã đẹp và độc đáo, phù hợp với văn hóa chạy bộ Việt Nam. Chúng tôi là địa chỉ mua đồ chạy bộ uy tín tại Hà Nội, không ngừng nghiên cứu, tìm hiểu và mang về những sản phẩm chạy bộ chuyên dụng cho các vận động viên từ mới chạy bộ đến chạy bộ chuyên nghiệp. Tại IMSPORTS bạn sẽ dễ dàng lựa chọn được những đôi giày, những bộ quần áo và phụ kiện chuyên cho chạy bộ phù hợp nhất cho mình nhờ đội ngũ tư vấn bán hàng có kiến thức chuyên sâu trong bộ môn chạy bộ marathon và vô cùng nhiệt tình.</p>
      <p class="mb-4 text-gray-900">Những sản phẩm đồ chạy bộ tại IMSPORTS vô cùng đa dạng và phong phú có thể kể đến như: giày chạy bộ; quần áo chạy bộ; giày chạy trail, địa hình; đồng hồ thể thao GPS đa năng; thực phẩm dinh dưỡng cung cấp năng lượng khi chạy bộ; tất chạy bộ; các phụ kiện chống nắng như: mũ chạy bộ, băng chặn mồ hôi, khăn đa năng chạy bộ...Ngoài ra IMSPORTS còn cung cấp các phụ kiện bảo vệ, bảo hộ trong tập thể thao, chạy bộ như: bó gối giảm chấn thương, bó mắt cá chân, bó bắp chân, băng đầu gối, xịt lạnh giảm đau cùng với các thiết bị phục hồi cơ thể sau chạy như máy massage cơ, con lăn massage và các thiết bị giãn cơ.</p>
      <p class="mb-4 text-gray-900">Những thương hiệu đồ chạy bộ nam có mặt tại IMSPORTS đều là những thương hiệu nổi tiếng trên thế giới với chất lượng đạt chuẩn quốc tế có thể kể đến như: Hoka, Altra, Saucony, Buff, Raidlight, Coros, Fractel, Compressports, Topo Athletic, Mueller, Zamst... Và chúng tôi luôn nắm bắt các xu hướng của thế giới để đưa về những sản phẩm có thiết kế, công năng và mẫu mã mới nhất, tốt nhất tới các runner Việt. Do đó với Imsports, bạn không chỉ có thể sở hữu những phụ kiện chạy bộ chất lượng cao mà còn đi kèm sự hiện đại, bắt kịp xu hướng của cộng đồng chạy bộ trên toàn thế giới.</p>
      <p class="mb-4 text-gray-900">IMSPORTS tự tin mang lại cho cộng đồng Runner Việt những sản phẩm chuyên dụng cho﻿ chạy bộ tốt về chất lượng và đẹp về mẫu mã. Chúng tôi hi vọng với những nỗ lực của mình sẽ góp phần lan rộng phong trào chạy bộ giúp nâng cao sức khỏe thể chất cũng như tinh thần của Quý khách hàng trong từng bước chạy cho dù bạn là chân chạy chuyên nghiệp hay nghiệp dư.</p>
    `;

const Products = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const {
        allProducts,
        currentProducts,
        pageCount,
        currentPage,
        selectedOption,
        isLoading,
    } = useProducts();

    const handleSortChange = (value) => {
        navigate(`?show=${value}&page=1`);
    };

    const handlePageClick = (page) => {
        const queryParams = new URLSearchParams(location.search);
        queryParams.set("page", page.toString());
        navigate(`?${queryParams.toString()}`);
    };

    return (
        <div className="collection-products w-full">
            <SortBar
                total={allProducts.length}
                selectedOption={selectedOption}
                onChange={handleSortChange}
            />

            <ProductGrid isLoading={isLoading} products={currentProducts} />

            {pageCount > 1 && (
                <div className="flex justify-center mt-12">
                    <Pagination
                        currentPage={currentPage}
                        totalPages={pageCount}
                        onPageChange={handlePageClick}
                    />
                </div>
            )}
            <CategoryDescription description={descriptionHtml} />
        </div>
    );
};

export default Products;
