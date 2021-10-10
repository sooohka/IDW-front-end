interface WorldCup {
  id: number;
  desc: string;
  title: string;
  targetCounts: number;
  commentCounts: number;
  likeCounts: number;
  createDate: string;
  targets: Array<{
    id: number;
    name: string;
    likeCounts: number;
    image: {
      small: string;
      big: string;
      lowQuality: string;
      originalQuality: string;
      id: number;
    };
  }>;
}

interface Target {
  id: number;
  name: string;
  likeCounts: number;
  image: {
    small: string;
    big: string;
    lowQuality: string;
    originalQuality: string;
    id: number;
  };
}
