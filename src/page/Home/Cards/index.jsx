import React, { useContext } from "react";
import worldCupContext from "../../../utils/contexts/worldCupContext";
import Template from "./template";

const Cards = () => {
  const { worldCups } = useContext(worldCupContext);
  return <Template worldCups={worldCups}></Template>;
};

export default Cards;
