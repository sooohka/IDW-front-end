import React, { useEffect } from "react";
import Template from "./template";
import categoriesJSON from "../../assets/temp/categories.json";
import useFetch from "../../utils/hooks/useFetch";
import PageSpinner from "../../components/common/PageSpinner";

const Create = () => {
  const promise = () =>
    new Promise((res, rej) => {
      setTimeout(() => res(categoriesJSON), 100);
    });
  const { data, isLoading } = useFetch(promise);

  useEffect(() => {
    console.log(`%c create rendered`, "background-color:pink;font-size:15px;font-weight:bold;color:black");
  });
  return <>{isLoading ? <PageSpinner /> : <Template categories={data.categories}></Template>}</>;
};

export default Create;
