import $api from '../http/axios';
import GetServices from './GetServices';

export default class CreateServices {
  static async createCategory(name) {
    return await $api.post('/api/category', { name });
  }
  static async createSubcategory(name, categoryName) {
    try {
      const categories = await GetServices.getCategories();
      const selectedCategory = await categories.data.filter(
        (item) => item.name === categoryName
      );
      const categoryId = selectedCategory[0].id;
      return $api.post('/api/subcategory', { name, categoryId });
    } catch (error) {
      return null;
    }
  }
  static async createProdact(prodact) {
    return  $api.post('/api/prodact', prodact );
  }
}
