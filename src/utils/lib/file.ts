const readAsDataUrl = (file: File) =>
  new Promise((res, rej) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => res(reader.result);
    reader.onabort = (e) => rej(e);
  });

export { readAsDataUrl };
