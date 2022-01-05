import PageSpinner from "@Components/common/PageSpinner";
import CategoryContextProvider, { useCategoryContext } from "@Contexts/CategoryContextProvider";
import useFetch from "@Hooks/useFetch";
import MainRouter from "@Pages/MainRouter";
import React, { useEffect } from "react";
import { CategoryApi } from "./api";

function App() {
  // 앱 시작할때 로드해야되는것들
  const { data, isLoading } = useFetch(CategoryApi.getCategories);
  const { handleSetCategories } = useCategoryContext();
  useEffect(() => {
    if (data) handleSetCategories(data);
  }, [data]);
  if (isLoading) return <PageSpinner />;
  return <MainRouter />;
}

export default App;
