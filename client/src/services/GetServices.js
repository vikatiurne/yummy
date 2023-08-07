import $api from '../http/axios';

export default class GetServices {
  static async getCategories() {
    return $api.get('/api/category');
  }
  static async getSubcategories(){
    return $api.get('/api/subcategory')
  }
  static async getAllProdacts() {
    return $api.get('/api/prodact');
  }
  static async getOneProdact(id) {
    return $api.get('/api/prodact/' + id);
  }
}
