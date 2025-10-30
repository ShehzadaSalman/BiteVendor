import axios from 'axios';

const BASE_URL = 'https://development.bite.com.pk/api/vendor';

export async function fetchDashboard(range = 'all') {
  try {
    const response = await axios.get(`${BASE_URL}/dashboard`, {
      params: { range },
      timeout: 15000,
    });
    const api = response?.data || {};
    const rawData = api?.data || {};

    // Normalize and map branches into summary for convenient consumption
    const normalized = {
      status: api?.status ?? false,
      range: api?.range ?? range,
      data: {
        summary: {
          ...(rawData?.summary || {}),
          branches: rawData?.branches || { total: 0 },
        },
        chart: Array.isArray(rawData?.chart) ? rawData.chart : [],
        branches: rawData?.branches || { total: 0 },
        last_updated: rawData?.last_updated || null,
      },
    };

    return normalized;
  } catch (error) {
    // Normalize error
    const message =
      error?.response?.data?.message || 'Failed to fetch dashboard';
    throw new Error(message);
  }
}

export async function fetchMenu() {
  try {
    const response = await axios.get(
      `https://development.bite.com.pk/api/vendor/menu`,
    );
    console.log('Menu response', response);
    // New API returns: { status, message, data: [ { id, name, menu_items: [...] }, ... ] }
    // Normalize to return just the array for consumers
    return Array.isArray(response?.data?.data) ? response.data.data : [];
  } catch (error) {
    const message = error?.response?.data?.message || 'Failed to fetch menu';
    throw new Error(message);
  }
}

export async function toggleMenuItemAvailability(menuItemId) {
  try {
    if (!menuItemId) throw new Error('Menu item id is required');
    const response = await axios.post(
      `${BASE_URL}/menu/${menuItemId}/toggle`,
      {},
      { timeout: 15000 },
    );
    // Expect response to include updated is_available or status
    return response?.data;
  } catch (error) {
    const message =
      error?.response?.data?.message || 'Failed to toggle availability';
    throw new Error(message);
  }
}

export async function fetchOrders(page = 1) {
  try {
    const response = await axios.get(
      'https://development.bite.com.pk/api/vendor/orders',
      {
        params: { page },
        timeout: 15000,
        headers: { Accept: 'application/json' },
      },
    );
    const data = response?.data;
    // Return normalized pagination structure
    return {
      currentPage: data?.current_page ?? 1,
      totalPages: data?.last_page ?? 1,
      perPage: data?.per_page ?? 20,
      total: data?.total ?? 0,
      nextPageUrl: data?.next_page_url || null,
      prevPageUrl: data?.prev_page_url || null,
      orders: Array.isArray(data?.data) ? data.data : [],
    };
  } catch (error) {
    const message = error?.response?.data?.message || 'Failed to fetch orders';
    throw new Error(message);
  }
}

// Fetch a single order details by id
export async function fetchOrderDetail(orderId) {
  try {
    if (!orderId) throw new Error('Order id is required');
    const response = await axios.get(`${BASE_URL}/orders/${orderId}`, {
      timeout: 15000,
      headers: { Accept: 'application/json' },
    });
    // API returns an object; return as-is
    return response?.data;
  } catch (error) {
    const message = error?.response?.data?.message || 'Failed to fetch order';
    throw new Error(message);
  }
}

async function postOrderAction(orderId, action) {
  if (!orderId) throw new Error('Order id is required');
  try {
    const response = await axios.post(
      `${BASE_URL}/orders/${orderId}/${action}`,
      {},
      {
        timeout: 15000,
        headers: { Accept: 'application/json' },
      },
    );
    return response?.data;
  } catch (error) {
    const message =
      error?.response?.data?.message ||
      `Failed to ${
        action === 'ready' ? 'mark order ready' : `${action} order`
      }`;
    throw new Error(message);
  }
}

export const acceptOrder = orderId => postOrderAction(orderId, 'accept');
export const rejectOrder = orderId => postOrderAction(orderId, 'reject');
export const markOrderReady = orderId => postOrderAction(orderId, 'ready');
