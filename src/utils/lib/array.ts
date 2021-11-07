// 구린로직 수정
const getRandomValues = (array: any[], count: number) => {
  if (array.length < count) return [];
  const arr: any[] = [];
  while (arr.length !== count) {
    const r = Math.floor(Math.random() * array.length);
    if (!arr.find((id) => id === array[r])) arr.push(array[r]);
  }
  return arr;
};
export { getRandomValues };
