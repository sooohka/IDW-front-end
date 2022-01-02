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
  isChecked: boolean;
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

  ${({ isChecked }) =>
    isChecked &&
    css`
      &::after {
        content: "";
      }
    `}
`;

export { Container, Label, Radio };
