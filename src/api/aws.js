import AWS from "aws-sdk";
import uuid from "react-uuid";

AWS.config.update({
  accessKeyId: process.env.REACT_APP_AWS_ACCESS_KEY,
  secretAccessKey: process.env.REACT_APP_AWS_SECRET_KEY,
});

const bucketName = "idw-images";
const bucketRegion = "ap-northeast-2";

const myBucket = new AWS.S3({
  region: bucketRegion,
  params: { bucketName },
});

const uploadFile = async (file, setProgress, handleError) => {
  // TODO: 카테고리도 받아서 업로드 해야함
  const key = `origin/${uuid()}${file.name}`;
  const params = {
    ACL: "public-read",
    Body: file,
    Bucket: bucketName,
    Key: key,
    ContentType: file.type,
  };

  // const { httpResponse } = await myBucket
  //   .putObject(params)
  //   .on("httpUploadProgress", (evt) => {
  //     setProgress(Math.round((evt.loaded / evt.total) * 100));
  //   })
  //   .send((err) => {
  //     if (err) {
  //       console.log(err);
  //       if (handleError) handleError(err);
  //     }
  //   });
  // console.log(httpResponse);
  // const url = `https://idw-images.s3.ap-northeast-2.amazonaws.com/${encodeURI(key)}`;
  // return { status: httpResponse.statusCode, data: { url, name: file.name } };

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
        images: {
          image_origin: Key,
          image_400: Key.replace("origin", "400"),
          image_800: Key.replace("origin", "400"),
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
