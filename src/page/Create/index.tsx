import React, { useEffect } from "react";
import Template from "./template";

const Create: React.FC = () => {
  useEffect(() => {
    console.log(
      `%c create rendered`,
      "background-color:pink;font-size:15px;font-weight:bold;color:black",
    );
  });
  return <Template />;
};

export default Create;
