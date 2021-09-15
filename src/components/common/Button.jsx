import React, { forwardRef } from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

const StyledButton = styled.button`
  /* border: 1px solid black;
  border-radius: 5px;
  background-color: red; */
`;

const Button = ({ label, children, type, disabled }) => {
  return (
    <StyledButton tabIndex={0} type={type} disabled={disabled}>
      {children || label}
    </StyledButton>
  );
};

Button.propTypes = {
  label: PropTypes.string.isRequired,
  children: PropTypes.string,
  type: PropTypes.string,
  disabled: PropTypes.bool,
};

Button.defaultProps = {
  children: "button",
  type: "submit",
  disabled: false,
};

export default Button;
