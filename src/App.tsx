import React, { useMemo } from "react";
import { CategoryApi } from "./api";
import PageSpinner from "./components/common/PageSpinner";
import MainRouter from "./page/MainRouter";
import CategoryContext from "./utils/contexts/CategoryContext";
import useFetch from "./utils/hooks/useFetch";

const App = () => {
  // 앱 시작할때 로드해야되는것들
  const { data, isLoading } = useFetch(CategoryApi.getCategories);

  const categories = useMemo(
    () => ({
      categories: data || [],
    }),
    [data],
  );

  if (isLoading) return <PageSpinner />;
  return (
    <CategoryContext.Provider value={categories}>
      <MainRouter />
    </CategoryContext.Provider>
  );
};

export default App;
