// Tệp: uploadData.mjs

// 1. Import 'ALL_PRODUCTS' 
import { ALL_PRODUCTS } from './src/data/products.js';
import fetch from 'node-fetch';

// 2.Dán (Paste) Invoke URL 
const API_ENDPOINT = 'https://bx5pj0wie1.execute-api.ap-southeast-1.amazonaws.com/v1/products';

// 3. Hàm chờ (để tránh làm nghẽn API)
const wait = (ms) => new Promise(resolve => setTimeout(resolve, ms));

// 4. Hàm upload 
async function uploadProducts() {
  console.log(`Bat dau upload ${ALL_PRODUCTS.length} san pham len ${API_ENDPOINT}...`);

  for (let i = 0; i < ALL_PRODUCTS.length; i++) {
    const product = ALL_PRODUCTS[i];
    console.log(`Dang upload san pham ${i + 1}/${ALL_PRODUCTS.length}: ${product.name}...`);

    try {
      const response = await fetch(API_ENDPOINT, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(product),
      });

      if (!response.ok) {
        const errorBody = await response.text();
        throw new Error(`HTTP error ${response.status}: ${errorBody}`);
      }

      const result = await response.json();
      console.log(`   -> THANH CONG: ${result.message} (ID: ${result.id})`);

    } catch (error) {
      console.error(`   -> THAT BAI khi upload ${product.name}:`, error.message);
    }

    // Thêm time để không bị AWS API Gateway chặn
    await wait(200); 
  }
  console.log('Upload hoan tat!');
}

uploadProducts();