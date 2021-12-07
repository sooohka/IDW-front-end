class RequestUrls {
  static postImgToResizingServer(id?: string) {
    return `post/imgToResizingServer/${id}`;
  }

  static putImgToResizingServer(id?: string | number) {
    return `put/imgToResizingServer/${id}`;
  }

  static getCategories(id?: string | number) {
    return `get/categories/${id}`;
  }

  static postWorldCup(id?: string | number) {
    return `post/worldCup/${id}`;
  }

  static getWorldCups(id?: string | number) {
    return `get/worldCup/${id}`;
  }

  static getWorldCupById(id?: string | number) {
    return `post/worldCupById/${id}`;
  }
}

export default RequestUrls;
