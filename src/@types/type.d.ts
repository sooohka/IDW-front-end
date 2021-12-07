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

interface Category {
  id: number;
  name: string;
}

interface ImgResizingResponse {
  message: string;
  result: {
    ContentType: string;
    bucketUrl: string;
    locations: { big: string; low: string; original: string; small: string };
  };
}

interface TargetFile {
  id: string;
  isSubmitted: boolean;
  url: string;
  file: File;
  errors: { message: string; code: ErrorCode | string }[];
}

type RequestStatus = "idel" | "loading" | "failed";
