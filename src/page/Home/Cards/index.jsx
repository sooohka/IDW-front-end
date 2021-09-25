import React, { useContext } from "react";
import PropTypes from "prop-types";
import worldCupsContext from "../../../utils/contexts/WorldCupsContext";
import Template from "./template";

const Cards = ({ handlePlayBtnClick }) => {
  const { worldCups } = useContext(worldCupsContext);
  return <Template handlePlayBtnClick={handlePlayBtnClick} worldCups={worldCups}></Template>;
};

Cards.propTypes = {
  handlePlayBtnClick: PropTypes.func.isRequired,
};

export default Cards;
