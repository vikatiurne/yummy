import $api from '../http/axios';

export default class GetServices {
  static async getCategories() {
    return $api.get('/api/category');
  }
  static async getSubcategories() {
    return $api.get('/api/subcategory');
  }
  static async getAllProdacts(categoryId, subcategoryId, page, limit) {
    return $api.get('/api/prodact', {
      params: { categoryId, subcategoryId, page, limit },
    });
  }
  static async getOneProdact(id) {
    return $api.get('/api/prodact/' + id);
  }
}
