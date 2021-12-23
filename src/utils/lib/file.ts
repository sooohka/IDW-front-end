import axios from "axios";
import { AwsApi } from "../../api";

const readAsDataUrl = (file: File) =>
  new Promise((res, rej) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => res(reader.result);
    reader.onabort = (e) => rej(e);
  });

interface HandleUpload {
  (
    imageFile: TargetFile,
    setProgress: React.Dispatch<React.SetStateAction<number>>,
  ): Promise<TargetFile>;
}

const handleCloudinaryUpload: HandleUpload = async (imageFile, setProgress) => {
  try {
    const formData = new FormData();
    formData.append("file", imageFile.file);
    if (!process.env.REACT_APP_CLOUDINARY_UPLOAD_PRESET || !process.env.REACT_APP_CLOUDINARY_URL)
      throw new Error("upload_preset없음");

    formData.append("upload_preset", process.env.REACT_APP_CLOUDINARY_UPLOAD_PRESET);
    const res = await axios.post(process.env.REACT_APP_CLOUDINARY_URL, formData, {
      headers: { "Content-Type": "multipart/form-data" },
      onUploadProgress: ({ loaded, total }) => {
        setProgress((loaded / total) * 100);
      },
    });
    setProgress(100);
    const { url } = res.data;

    return { ...imageFile, isSubmitted: true, url };
  } catch (err: any) {
    const message = err.response?.data?.message || err.message || "something went wrong😅 ";
    return {
      ...imageFile,
      errors: [...imageFile.errors, { code: 0, message }],
      url: "",
      isSubmitted: false,
    };
  }
};

const handleAwsUpload: HandleUpload = async (imageFile, setProgress) => {
  const fileDataUrl = (await readAsDataUrl(imageFile.file)) as string;
  const file = {
    name: imageFile.file.name,
    contentType: imageFile.file.type,
    dataUri: fileDataUrl,
  };

  try {
    // const res = await api.postImgToResizingServer({ file }, setProgress);
    const res = await AwsApi.putImgToResizingServer({ param: { file }, setProgress });
    const {
      message,
      result: { locations },
    } = res.data;
    const fullUrl = `${process.env.REACT_APP_AWS_BUCKET_URL}/${locations.small}`;

    setProgress(100);
    return { ...imageFile, isSubmitted: true, url: fullUrl };
  } catch (err: any) {
    const message = err.response?.data?.message || err.message || "something went wrong😅 ";
    return {
      ...imageFile,
      errors: [...imageFile.errors, { code: 413, message }],
      url: "",
      isSubmitted: false,
    };
  }
};

export { readAsDataUrl, handleCloudinaryUpload, handleAwsUpload };
