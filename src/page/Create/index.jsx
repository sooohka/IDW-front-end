import React, { useEffect } from "react";
import Template from "./template";

// Create page 하위 컴포넌트와 너무 빡쌔게 결합되있음 결합 줄일 수 있는 방법 찾아보자

const Create = () => {
  useEffect(() => {
    console.log(`%c create rendered`, "background-color:pink;font-size:15px;font-weight:bold;color:black");
  });
  return <Template></Template>;
};

export default Create;
