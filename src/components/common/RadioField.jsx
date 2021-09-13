import React from "react";
import styled, { css } from "styled-components";
import PropTypes from "prop-types";

const Container = styled.div`
  & > label {
    display: flex;
    align-items: center;
  }
`;

const Radio = styled.span`
  display: inline-block;
  width: 15px;
  height: 15px;
  border-radius: 100000px;
  border: 3px solid;
  border-color: rebeccapurple;
  position: relative;
  margin: 0 1rem 0 0;

  &::after {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    border-radius: 100000px;
    width: 10px;
    height: 10px;
    background-color: rebeccapurple;
  }

  ${({ checked }) =>
    checked &&
    css`
      &::after {
        content: "";
      }
    `}
`;

const RadioField = ({ id, name, checked, onChange, value }) => {
  return (
    <Container>
      <label htmlFor={id}>
        <input id={id} name={name} type="radio" checked={checked} onChange={onChange} value={value} hidden></input>
        <Radio checked={checked}></Radio>
        {value}
      </label>
    </Container>
  );
};

RadioField.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  checked: PropTypes.bool.isRequired,
  onChange: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired,
};
export default RadioField;
