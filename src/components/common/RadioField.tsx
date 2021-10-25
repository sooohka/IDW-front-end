import React from "react";
import styled, { css } from "styled-components";

const Container = styled.div``;

const Label = styled.label`
  display: flex;
  align-items: center;
  cursor: pointer;
  letter-spacing: 0.5px;
  font-weight: bold;
  font-size: ${({ theme }) => theme.fonts.strongBody};
`;

interface Radio {
  checked: boolean;
}
const Radio = styled.span<Radio>`
  display: inline-block;
  width: 20px;
  height: 20px;
  border-radius: 100000px;
  border: 3px solid;
  border-color: ${({ theme }) => theme.colors.primary};
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
    background-color: ${({ theme }) => theme.colors.primary};
  }

  ${({ checked }) =>
    checked &&
    css`
      &::after {
        content: "";
      }
    `}
`;

interface IProps {
  id: string;
  label?: string;
  name: string;
  checked: boolean;
  onChange: (e: React.KeyboardEvent | React.ChangeEvent) => void;
  value: number | string;
}
const RadioField: React.FC<IProps> = ({ id, label, name, checked, onChange, value }) => (
  <Container>
    <Label htmlFor={id}>
      <input
        id={id}
        name={name}
        type='radio'
        checked={checked}
        onChange={onChange}
        value={value}
        hidden
      />
      <Radio
        onKeyDown={(e) => {
          if (e.key === " ") onChange(e);
        }}
        tabIndex={0}
        checked={checked}
      />
      {label || value}
    </Label>
  </Container>
);
export default RadioField;
