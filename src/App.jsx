import React from "react";
import axios from "./api/axios";
import MainRouter from "./page/MainRouter";
import GlobalStyle from "./style/GlobalStyle";
import CategoryContext from "./utils/contexts/CategoryContext";
import PageSpinner from "./components/common/PageSpinner";
import useFetch from "./utils/hooks/useFetch";

const promise = () => axios.get("categories");

const App = () => {
  // 앱 시작할때 로드해야되는것들

  const { data, isLoading } = useFetch(promise);

  if (isLoading) return <PageSpinner></PageSpinner>;
  return (
    <>
      <GlobalStyle />
      <CategoryContext.Provider value={{ categories: data }}>
        <MainRouter />
      </CategoryContext.Provider>
    </>
  );
};

export default App;
