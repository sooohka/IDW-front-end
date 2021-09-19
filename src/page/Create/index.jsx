import React, { useEffect } from "react";
import axios from "axios";
import Template from "./template";
import categoriesJSON from "../../assets/temp/categories.json";
import useFetch from "../../utils/hooks/useFetch";
import PageSpinner from "../../components/common/PageSpinner";

// Create page 하위 컴포넌트와 너무 빡쌔게 결합되있음 결합 줄일 수 있는 방법 찾아보자

const Create = () => {
  // const promise = () =>
  //   new Promise((res, rej) => {
  //     setTimeout(() => res(categoriesJSON), 100);
  //   });
  // const { data, isLoading } = useFetch(promise);
  const promise = () => axios.get("http://13.125.23.168:8080/categories");
  const { data, isLoading } = useFetch(promise);
  console.log(data);

  useEffect(() => {
    console.log(`%c create rendered`, "background-color:pink;font-size:15px;font-weight:bold;color:black");
  });
  return <>{isLoading ? <PageSpinner /> : <Template categories={data}></Template>}</>;
};

export default Create;
