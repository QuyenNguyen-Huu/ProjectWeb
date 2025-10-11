import React from "react";
import { FacebookProvider, Page } from "react-facebook";
import './Footer.css';

export default function Footer() {
  return (
    <footer className="footer z-50">
      <div className="footer-container">
        {/* Giới thiệu */}
        <div className="footer-block">
          <h3>Giới thiệu</h3>
          <p className="intro-text">
            IMSports chuyên giày dép, quần áo và phụ kiện chạy bộ/chạy địa hình
            chính hãng đến từ các thương hiệu hàng đầu thế giới. Chúng tôi luôn
            có sẵn những dòng sản phẩm mới nhất, tối ưu và hiệu suất cao dành
            cho runners. Đội ngũ nhân viên trẻ trung, nhiệt huyết, là những chân
            chạy đã được tích luỹ nhiều kinh nghiệm tập luyện và thi đấu sẽ mang
            đến tinh thần phục vụ chuyên nghiệp và chuyên sâu nhất cho khách
            hàng.
          </p>
          <div className="social-icons">
  <a href="#" target="_blank" rel="noopener noreferrer">
    <i className="fab fa-twitter"></i>
  </a>
  <a href="#" target="_blank" rel="noopener noreferrer">
    <i className="fab fa-facebook-f"></i>
  </a>
  <a href="#" target="_blank" rel="noopener noreferrer">
    <i className="fab fa-instagram"></i>
  </a>
  <a href="#" target="_blank" rel="noopener noreferrer">
    <i className="fab fa-youtube"></i>
  </a>
</div>

          {/* Ảnh logo / banner */}
          <div className="footer-logo">
            <img
              src="https://pos.nvncdn.com/be3294-43017/bn/20220530_1t7v2egHoQ0WVbpKCoYZ3CNr.png?v=1640060564"
              alt="Logo IMSports"
            />
          </div>
        </div>

        {/* Địa chỉ Store */}
        <div className="footer-section">
          <h3>Địa chỉ Store</h3>
          <p>
            <strong>HÀ NỘI</strong>
          </p>
          <ul className="store-list">
            <li>
              - Số 58A Ngõ 92, Thanh Nhàn, Hai Bà Trưng
              <br />
              Hotline/Zalo: 0846 33 5858
            </li>
            <li>
              - B11, Imperia Sky Garden, 423 Minh Khai, Hai Bà Trưng
              <br />
              Hotline/Zalo: 0839 33 5858
            </li>
            <li>
              - 0105, Tòa Luxury Park Views, Trương Công Giai, Cầu Giấy
              <br />
              Hotline/Zalo Tư vấn: 0879 33 5858
            </li>
          </ul>
          <p>
            <strong>Đại lý ủy quyền tại Tp.HCM</strong>
          </p>
          <ul className="store-list">
            <li>
              Số 285/21 CMT8, Phường 12, Quận 10
              <br />
              Hotline/Zalo Tư vấn: 08668 285 21
            </li>
          </ul>
        </div>

        {/* Hướng dẫn */}
        <div className="footer-block">
          <h3>Hướng dẫn</h3>
          <ul>
            <li>
              <a href="/">Sản phẩm</a>
            </li>
            <li>
              <a href="/">Bản đồ</a>
            </li>
            <li>
              <a href="/">Chính sách thanh toán</a>
            </li>
            <li>
              <a href="/">Chính sách vận chuyển</a>
            </li>
            <li>
              <a href="/">Chính sách đổi trả hàng</a>
            </li>
            <li>
              <a href="/">Chính sách bảo hành</a>
            </li>
            <li>
              <a href="/">Chính sách bảo mật</a>
            </li>
          </ul>
        </div>

        {/* Theo dõi chúng tôi */}
        <div className="footer-block">
          <h3>Theo dõi chúng tôi</h3>
          <FacebookProvider appId="228127589209779">
            <Page
              href="https://www.facebook.com/imsports.vn"
              tabs="timeline"
              width="270"
              height="130"
            />
          </FacebookProvider>

          <div className="email-input-wrapper">
            <input type="email" placeholder="Nhập email của bạn" />
            <i className="far fa-paper-plane send-icon" aria-hidden="true"></i>
          </div>

          <p className="company-info">
            Đăng ký để nhận chương trình ưu đãi!
            <br />
            Website được sở hữu bởi Công ty TNHH Thể Thao Thung Lũng Mặt Trời,
            <br />
            GPĐK: 0109685009.
            <br />
            Liên hệ CSKH:{" "}
            <a href="mailto:sales@imsports.vn" className="email-link">
              sales@imsports.vn
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
