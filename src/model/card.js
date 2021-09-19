import ImageDto from "./imageDto";

export default class {
  constructor(id, desc, title, commentCounts, likeCounts, createDate, imageDto) {
    this.id = id;
    this.desc = desc;
    this.title = title;
    this.commentCounts = commentCounts;
    this.likeCounts = likeCounts;
    this.createDate = createDate;
    this.imageDto = new ImageDto(...imageDto);
  }

  get all() {
    return {
      id: this.id,
      desc: this.desc,
      title: this.title,
      commentCounts: this.commentCounts,
      likeCounts: this.likeCounts,
      createDate: this.createDate,
      imageDto: this.imageDto.all,
    };
  }
}
