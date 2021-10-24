import axios from "axios";
import api from "../../api/api";

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
    setImageFiles: React.Dispatch<React.SetStateAction<TargetFile[]>>,
  ): void;
}

const handleCloudinaryUpload: HandleUpload = async (imageFile, setProgress, setImageFiles) => {
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
  const { url } = res.data;
  if (res.status === 200) {
    setImageFiles((prev) =>
      prev.map((image) =>
        image.id === imageFile.id ? { ...image, isSubmitted: true, url } : { ...image },
      ),
    );
  }
};

const handleAwsUpload: HandleUpload = async (imageFile, setProgress, setImageFiles) => {
  const fileDataUrl = (await readAsDataUrl(imageFile.file)) as string;
  const file = {
    name: imageFile.file.name,
    contentType: imageFile.file.type,
    dataUri: fileDataUrl,
  };

  try {
    // const res = await api.postImgToResizingServer({ file }, setProgress);
    const res = await api.putImgToResizingServer({ file }, setProgress);
    const {
      message,
      result: { locations },
    } = res.data;
    const fullUrl = `${process.env.REACT_APP_AWS_BUCKET_URL}/${locations.small}`;

    if (res.status === 200) {
      setImageFiles((prev) =>
        prev.map((image) =>
          image.id === imageFile.id ? { ...image, isSubmitted: true, url: fullUrl } : { ...image },
        ),
      );
    }
  } catch (err: any) {
    console.error(err.message);
    // TODO: fileUploadWithProgress error handling
    const message = err.response?.data?.message || err.message || "something went wrong😅 ";
    console.log(err.response);

    setImageFiles((prev) =>
      prev.map((image) =>
        image.id === imageFile.id
          ? {
              ...image,
              errors: [...imageFile.errors, { code: 413, message }],
              isSubmitted: true,
              url: "",
            }
          : { ...image },
      ),
    );
  }
};

export { readAsDataUrl, handleCloudinaryUpload, handleAwsUpload };
