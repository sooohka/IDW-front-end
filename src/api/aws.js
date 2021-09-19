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
  const key = `actors/${uuid()}${file.name}`;
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
    const { Location } = await myBucket
      .upload(params)
      .on("httpUploadProgress", (evt, res) => {
        setProgress(Math.round((evt.loaded / evt.total) * 100));
        return res;
      })
      .promise();
    return { data: { url: Location, name: file.name } };
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
