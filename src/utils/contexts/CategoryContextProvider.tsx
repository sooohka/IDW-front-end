import React, { createContext, ReactNode, useContext, useMemo, useState } from "react";

interface CategoryContextProps {
  categories: Category[];
  handleSetCategories: (data: any) => void;
}

const CategoryContext = createContext<CategoryContextProps>({
  categories: [],
  handleSetCategories: () => {},
});

const useCategoryContext = () => useContext<CategoryContextProps>(CategoryContext);

interface IProps {
  children: ReactNode;
}

function CategoryContextProvider({ children }: IProps) {
  const [categories, setCategories] = useState<Category[]>([{ id: 1, name: "123" }]);

  const handleSetCategories = (data: any) => {
    console.log("hi");
    console.log(data);

    setCategories(data);
  };

  const categoryContextValue = useMemo(
    () => ({
      categories,
      handleSetCategories,
    }),
    [categories, handleSetCategories],
  );
  console.log("hi");

  return (
    <CategoryContext.Provider value={categoryContextValue}>{children}</CategoryContext.Provider>
  );
}

export { useCategoryContext, CategoryContext };
export default CategoryContextProvider;
