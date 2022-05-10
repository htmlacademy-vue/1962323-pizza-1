import JwtService from '@/services/jwt.service';
import axios from '@/plugins/axios';

class BaseApiService {
  constructor() {
   
  }
}

export class AuthApiService extends BaseApiService {
  constructor() {
    super();
  }
  setAuthHeader() {
    const token = JwtService.getToken();
    axios.defaults.headers.common['Authorization'] = token
      ? `Bearer ${token}`
      : '';
  }

  async login(params) {
    const { data } = await axios.post('login', params);
    return data
  }

  async logout() {
    const { data } = await axios.delete('logout');
    return data;
  }

  async getMe() {
    const { data } = await axios.get('whoAmI');
    return data;
  }
}

export class PizzaService extends BaseApiService {
  constructor() {
    super();
  }
  async getIngredients(params) {
    const { data } = await axios.get('ingredients');
    return data
  }
  async getSizes(params) {
    const { data } = await axios.get('sizes');
    return data
  }
  async getSauces(params) {
    const { data } = await axios.get('sauces');
    return data
  }
  async getDough(params) {
    const { data } = await axios.get('dough');
    return data
  }
}

export class OrderService extends BaseApiService {
  constructor() {
    super();
  }
  async createOrder(params) {
    const { data } = await axios.post('orders', params);
    return data
  }
  async getOrders(params) {
    const { data } = await axios.get('orders');
    return data
  }
  async deleteOrder(orderId) {
    const { data } = await axios.delete(`orders/${orderId}`);
    return data
  }
}

export class ProfileService extends BaseApiService {
  constructor() {
    super();
  }
  async addNewAddress(params) {
    const { data } = await axios.post('addresses', params);
    return data
  }
  async getAddresses() {
    const { data } = await axios.get('addresses');
    return data
  }
}