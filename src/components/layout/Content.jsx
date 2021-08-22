import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import Card from "../common/Card";

const StyledContent = styled.div`
  padding: 3rem;
  background-color: orangered;
  min-height: 100%;
  flex: 1;
  display: flex;
  flex-wrap: wrap;
`;
const Content = () => {
  return (
    <StyledContent>
      <Card />
      <Card />
      <Card />
      <Card />
      <Card />
    </StyledContent>
  );
};

export default Content;
