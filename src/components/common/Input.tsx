import styled from "styled-components";

export default styled.input<{
  width?: string;
}>`
  border: 2px solid;
  border-radius: 5px;
  border-color: ${({ theme }) => theme.colors.primary};
  padding: 0.5rem 1rem;
  height: fit-content;
  font-size: ${({ theme }) => theme.fonts.body};
  width: ${({ width }) => width};
`;
