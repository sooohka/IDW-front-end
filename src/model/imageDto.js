export default class {
  constructor(originalImage, reducedImage, id) {
    this.originalImage = originalImage;
    this.reducedImage = reducedImage;
    this.id = id;
  }

  get all() {
    return { originalImage: this.originalImage, reducedImage: this.reducedImage, id: this.id };
  }

  get id() {
    return this.id;
  }

  get originalImage() {
    return this.originalImage;
  }

  get reducedImage() {
    console.log("no reduced Image");

    return this.reducedImage || this.originalImage;
  }
}
