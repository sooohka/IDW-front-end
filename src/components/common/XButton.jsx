import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

const Container = styled.div`
  position: relative;
  width: 21px;
  height: 21px;
  cursor: pointer;
  &:hover {
    & > * {
      transition: all 0.3s ease-in;
      &:first-child {
        transform: rotate(225deg) scale(1.2);
      }
      &:last-child {
        transform: rotate(-225deg) scale(1.2);
      }
    }
  }
`;

const Left = styled.span`
  position: absolute;
  display: inline-block;
  border-top: 4px solid black;

  border-radius: 2px;
  top: 50%;
  width: 21px;
  transform: rotate(45deg);
`;

const Right = styled.span`
  position: absolute;
  display: inline-block;
  border-top: 4px solid black;
  border-radius: 2px;
  top: 50%;
  width: 21px;
  transform: rotate(-45deg);
`;

const XButton = ({ onClick }) => {
  return (
    <Container onClick={onClick}>
      <Left></Left>
      <Right></Right>
    </Container>
  );
};

XButton.propTypes = {
  onClick: PropTypes.func.isRequired,
};
export default XButton;
