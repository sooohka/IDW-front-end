import React from "react";
import axios from "axios";
import MainRouter from "./page/MainRouter";
import CategoryContext from "./utils/contexts/CategoryContext";
import PageSpinner from "./components/common/PageSpinner";
import useFetch from "./utils/hooks/useFetch";
import categoryJson from "./assets/temp/categories.json";
import api from "./api/api";

const promise = () => {
  if (process.env.REACT_APP_ENV === "local") return Promise.resolve(categoryJson);
  return api.getCategories();
};

const App = () => {
  // 앱 시작할때 로드해야되는것들

  const { data, isLoading } = useFetch(promise);
  console.log(
    `%c${process.env.REACT_APP_ENV}`,
    "background-color:pink;font-size:15px;font-weight:bold;color:black",
  );

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
