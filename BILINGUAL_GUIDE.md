# Hướng dẫn Chuyển đổi Song ngữ (Bilingual) cho Sản phẩm

## ✅ Đã hoàn thành

### 1. Cấu trúc dữ liệu song ngữ (products.js)
Tất cả 10 sản phẩm đã được chuyển đổi với cấu trúc:
```javascript
{
  id: 301,
  name: "Tên tiếng Việt",
  name_en: "English Name",
  highlights: ["Tiếng Việt 1", "Tiếng Việt 2"],
  highlights_en: ["English 1", "English 2"],
  description_content: [
    {
      type: 'paragraph',
      title: "Tiêu đề tiếng Việt",
      title_en: "English Title",
      content: "Nội dung tiếng Việt",
      content_en: "English Content"
    }
  ]
}
```

### 2. Components đã cập nhật

#### ProductDetailPage.jsx
- ✅ Hiển thị `t(product, 'name')` thay vì `product.name`
- ✅ Hiển thị `t(product, 'highlights')` cho danh sách highlights
- ✅ Tab "Mô tả chi tiết": `t(item, 'title')` và `t(item, 'content')`
- ✅ Tab "Thành phần": `t(product, 'name')` và `t(product, 'highlights')`
- ✅ Add to Cart: sử dụng `t(product, 'name')`

#### ProductCard.jsx
- ✅ Nhận prop `product` (object gốc)
- ✅ Hiển thị `displayTitle = t(product, 'name')` nếu có product object
- ✅ Fallback về `title` nếu không có product object

#### FeaturedProducts.jsx (Sản phẩm mới)
- ✅ Truyền `product={product.product}` vào ProductCard
- ✅ Giữ lại `title` để backward compatible

#### SaleProducts.jsx (Sản phẩm sale)
- ✅ Truyền `product={product.product}` vào ProductCard
- ✅ Giữ lại `title` để backward compatible

#### useProducts.js (Danh sách sản phẩm theo category)
- ✅ Thêm `product: p` vào transformedProducts
- ✅ Truyền product object để ProductCard có thể dùng t()

## 🔄 Cách hoạt động

### Hàm `t()` từ LanguageContext

```javascript
const { t, language } = useLanguage();

// Cách 1: Dịch key từ locales.js
t('common.loading') // "Đang tải..." hoặc "Loading..."

// Cách 2: Dịch field từ object
t(product, 'name') 
// Trả về product.name_en nếu language === 'en'
// Trả về product.name nếu language === 'vi'

t(product, 'highlights')
// Trả về product.highlights_en nếu language === 'en'
// Trả về product.highlights nếu language === 'vi'

t(item, 'title')
// Trả về item.title_en nếu language === 'en'
// Trả về item.title nếu language === 'vi'
```

### Logic trong LanguageContext.jsx

```javascript
// Nếu value là object và fieldKey được cung cấp
if (typeof value === "object" && value !== null && fieldKey) {
  const englishKey = `${fieldKey}_en`;
  
  // Nếu đang ở chế độ tiếng Anh và có field _en
  if (language === "en" && value[englishKey]) {
    return value[englishKey];
  }
  
  // Fallback về field gốc (tiếng Việt)
  return value[fieldKey];
}
```

## 📝 Checklist khi thêm component mới

Khi tạo component hiển thị sản phẩm mới:

1. ✅ Import `useLanguage`
```javascript
import { useLanguage } from '@/context/LanguageContext';
const { t } = useLanguage();
```

2. ✅ Truyền `product` object vào ProductCard
```javascript
<ProductCard
  product={product.product} // Object gốc từ API
  title={product.title}     // Giữ để backward compatible
  href={product.href}
  images={product.images}
  // ... các props khác
/>
```

3. ✅ Sử dụng `t()` cho text hiển thị
```javascript
// Hiển thị tên sản phẩm
<h1>{t(product, 'name')}</h1>

// Hiển thị highlights
{t(product, 'highlights').map(item => (
  <li key={item}>{item}</li>
))}

// Hiển thị description
{product.description_content.map(item => (
  <div key={item.title}>
    <h4>{t(item, 'title')}</h4>
    <p>{t(item, 'content')}</p>
  </div>
))}
```

## 🎯 Test chuyển đổi ngôn ngữ

1. Mở website
2. Click vào nút chuyển đổi ngôn ngữ (VI/EN) ở header
3. Kiểm tra:
   - ✅ Tên sản phẩm thay đổi
   - ✅ Highlights thay đổi
   - ✅ Description (title + content) thay đổi
   - ✅ URL tự động chuyển đổi (nếu có mapping)

## 🔍 Debugging

Nếu ngôn ngữ không chuyển:

1. Kiểm tra console: `console.log(language)` - phải là 'en' hoặc 'vi'
2. Kiểm tra product object có field `_en` không:
   ```javascript
   console.log(product.name_en)
   console.log(product.highlights_en)
   ```
3. Kiểm tra component có dùng `t(product, 'field')` đúng không

## 📊 Tổng kết

- ✅ 10/10 sản phẩm đã có dữ liệu song ngữ
- ✅ ProductDetailPage hiển thị song ngữ
- ✅ ProductCard hiển thị song ngữ
- ✅ Tất cả danh sách sản phẩm (New, Sale, Category) đã được cập nhật
- ✅ Hệ thống tự động chuyển đổi khi user click nút ngôn ngữ

## 🚀 Bước tiếp theo

Nếu bạn muốn thêm sản phẩm mới, hãy đảm bảo:
1. Thêm field `_en` cho tất cả text fields
2. API trả về đúng cấu trúc này
3. Component sử dụng `t(product, 'field')` để hiển thị
