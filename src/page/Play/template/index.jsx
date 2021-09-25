import React, { useContext } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import GameContext from "../../../utils/contexts/GameContext";

const Container = styled.div`
  height: 100%;
  display: flex;
  flex-wrap: wrap;
`;

const Template = () => {
  const dta = useContext(GameContext);
  console.log(dta);

  return <Container />;
};

Template.propTypes = {};

export default Template;
