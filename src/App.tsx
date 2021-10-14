import React from "react";
import api from "./api/api";
import PageSpinner from "./components/common/PageSpinner";
import MainRouter from "./page/MainRouter";
import CategoryContext from "./utils/contexts/CategoryContext";
import useFetch from "./utils/hooks/useFetch";

const App = () => {
  // 앱 시작할때 로드해야되는것들
  const { data, isLoading } = useFetch(api.getCategories);

  return (
    <>
      {isLoading ? (
        <PageSpinner />
      ) : (
        <CategoryContext.Provider value={{ categories: data || [] }}>
          <MainRouter />
        </CategoryContext.Provider>
      )}
    </>
  );
};

export default App;
