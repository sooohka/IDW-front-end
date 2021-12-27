import React from "react";
import styled from "styled-components";

const Button = styled.button`
  all: unset;
  position: relative;
  width: 20px;
  height: 20px;
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
export { Button, Left, Right };
