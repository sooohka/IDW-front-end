import AppApi from "./AppApi";

class CategoryApi {
  static baseUrl = "categories";

  static getCategories() {
    return AppApi.get<Category[]>(`${CategoryApi.baseUrl}`);
  }
}

export default CategoryApi;
