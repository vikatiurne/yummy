import $api from '../http/axios';

export default class BasketServices {
  static async append(prodactId, qty, userId) {
    return $api.put(`api/basket/prodact/${prodactId}/append/${qty}`, {
      params: { userId },
    });
  }

  static async increment(basketId, prodactId, qty) {
    return $api.put(`api/basket/prodact/${prodactId}/increment/${qty}`, {
      params: { basketId, prodactId, qty },
    });
  }
  static async decrement(basketId, prodactId, qty) {
    return $api.put(`api/basket/prodact/${prodactId}/decrement/${qty}`, {
      params: { basketId, prodactId, qty },
    });
  }
  static async remove(basketId, prodactId) {
    return $api.put(`api/basket/prodact/${prodactId})/remove`, {
      params: { basketId, prodactId },
    });
  }
  static async clear(basketId) {
    return $api.put('api/basket/clear', { params: { basketId } });
  }
}
