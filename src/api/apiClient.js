/**
 * API Client for handling HTTP requests
 */

// Chỉ là base gốc, bỏ 'products'
const API_BASE_URL = 'https://bx5pj0wie1.execute-api.ap-southeast-1.amazonaws.com/v1';

class ApiClient {
  constructor(baseURL = API_BASE_URL) {
    this.baseURL = baseURL;
  }

  async request(endpoint, options = {}) {
    const url = `${this.baseURL}${endpoint}`;
    const config = {
      method: options.method || 'GET',
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    };

    // Nếu có body object chưa stringify
    if (config.body && typeof config.body !== 'string') {
      config.body = JSON.stringify(config.body);
    }

    let response;
    try {
      response = await fetch(url, config);
    } catch (networkErr) {
      console.error('Network error:', networkErr);
      throw new Error('Network error');
    }

    let data;
    try {
      // Thử parse JSON, nếu thất bại (ví dụ 204) thì để undefined
      const text = await response.text();
      data = text ? JSON.parse(text) : undefined;
    } catch {
      data = undefined;
    }

    if (!response.ok) {
      const message = (data && (data.error || data.message)) || `HTTP ${response.status}`;
      throw new Error(message);
    }

    return data;
  }

  buildQuery(params = {}) {
    const qp = new URLSearchParams();
    Object.entries(params).forEach(([k, v]) => {
      if (v !== undefined && v !== null && v !== '') qp.set(k, v);
    });
    const str = qp.toString();
    return str ? `?${str}` : '';
  }

  async getProducts(params = {}) {
    const qs = this.buildQuery(params);
    return this.get(`/products${qs}`);
  }

  async getProductBySlug(slug) {
    const safeSlug = encodeURIComponent(slug);
    return this.get(`/products?slug=${safeSlug}`);
  }

  async get(endpoint, options = {}) {
    return this.request(endpoint, { ...options, method: 'GET' });
  }

  async post(endpoint, data, options = {}) {
    return this.request(endpoint, { ...options, method: 'POST', body: data });
  }

  async put(endpoint, data, options = {}) {
    return this.request(endpoint, { ...options, method: 'PUT', body: data });
  }

  async delete(endpoint, options = {}) {
    return this.request(endpoint, { ...options, method: 'DELETE' });
  }
}

export default new ApiClient();