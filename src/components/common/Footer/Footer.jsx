import React from "react";
import { FacebookProvider, Page } from "react-facebook";
import './Footer.css';
import { useLanguage } from "@/context/LanguageContext";

export default function Footer() {
  const { t } = useLanguage();
  
  return (
    <footer className="footer z-50">
      <div className="footer-container">
        {/* Giới thiệu */}
        <div className="footer-block">
          <h3>{t("footer.introTitle")}</h3>
          <p className="intro-text">
            {t("footer.introText")}
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
          <h3>{t("footer.storeAddress")}</h3>
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
            <strong>{t("footer.hcm")}</strong>
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
          <h3>{t("footer.guide")}</h3>
          <ul>
            <li>
              <a href="/">{t("footer.policies.products")}</a>
            </li>
            <li>
              <a href="/">{t("footer.policies.map")}</a>
            </li>
            <li>
              <a href="/">{t("footer.policies.payment")}</a>
            </li>
            <li>
              <a href="/">{t("footer.policies.shipping")}</a>
            </li>
            <li>
              <a href="/">{t("footer.policies.return")}</a>
            </li>
            <li>
              <a href="/">{t("footer.policies.warranty")}</a>
            </li>
            <li>
              <a href="/">{t("footer.policies.privacy")}</a>
            </li>
          </ul>
        </div>

        {/* Theo dõi chúng tôi */}
        <div className="footer-block">
          <h3>{t("footer.followUs")}</h3>
          <FacebookProvider appId="228127589209779">
            <Page
              href="https://www.facebook.com/imsports.vn"
              tabs="timeline"
              width="270"
              height="130"
            />
          </FacebookProvider>

          <div className="email-input-wrapper">
            <input type="email" placeholder={t("footer.emailPlaceholder")} />
            <i className="far fa-paper-plane send-icon" aria-hidden="true"></i>
          </div>

          <p className="company-info">
            {t("footer.registerPromo")}
            <br />
            {t("footer.copyright")}
            <br />
            GPĐK: 0109685009.
            <br />
            {t("footer.contactCSKH")}
            <a href="mailto:sales@imsports.vn" className="email-link">
              sales@imsports.vn
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
