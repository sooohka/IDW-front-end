import React from "react";
import axios from "./api/axios";
import MainRouter from "./page/MainRouter";
import CategoryContext from "./utils/contexts/CategoryContext";
import PageSpinner from "./components/common/PageSpinner";
import useFetch from "./utils/hooks/useFetch";
import categoryJson from "./assets/temp/categories.json";

const promise = () => {
  if (process.env.REACT_APP_ENV === "production") axios.get("categories");
  return new Promise((res) => {
    setTimeout(() => {
      res(categoryJson);
    }, 100);
  });
};

const App = () => {
  // 앱 시작할때 로드해야되는것들

  const { data, isLoading } = useFetch(promise);
  console.log(`%c${process.env.REACT_APP_ENV}`, "background-color:pink;font-size:15px;font-weight:bold;color:black");

  return (
    <>
      {isLoading ? (
        <PageSpinner />
      ) : (
        <CategoryContext.Provider value={{ categories: data }}>
          <MainRouter />
        </CategoryContext.Provider>
      )}
    </>
  );
};

export default App;
