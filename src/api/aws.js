import AWS from "aws-sdk";
import uuid from "react-uuid";

AWS.config.update({
  accessKeyId: process.env.REACT_APP_AWS_ACCESS_KEY,
  secretAccessKey: process.env.REACT_APP_AWS_SECRET_KEY,
});

const bucketName = "idw-images";
const bucketRegion = "ap-northeast-2";

const myBucket = new AWS.S3({ region: bucketRegion, params: { bucketName } });

const uploadFile = async (file, setProgress, handleError) => {
  // TODO: 카테고리도 받아서 업로드 해야함
  const key = `original/${uuid()}${file.name}`;
  const params = {
    ACL: "public-read",
    Body: file,
    Bucket: bucketName,
    Key: key,
    ContentType: file.type,
  };

  try {
    const data = await myBucket
      .upload(params)
      .on("httpUploadProgress", (evt, res) => {
        setProgress(Math.round((evt.loaded / evt.total) * 100));
        return res;
      })
      .promise();
    console.log(data);
    // TODO: png, jpg ,jpeg 외의 파일 핸들링 구현하기
    const { Location, Key } = data;
    return {
      data: {
        thumbnail: {
          smallImage: Key.replace("original", "small"),
          largeImage: Key.replace("original", "large"),
          lowQualityImage: Key.replace("original", "low"),
          originalImage: Key,
        },
        name: file.name,
      },
    };
  } catch (e) {
    if (e) {
      console.error(e);
      throw new Error(e);
    }
    return null;
  }
};

export default AWS;
export { uploadFile };
