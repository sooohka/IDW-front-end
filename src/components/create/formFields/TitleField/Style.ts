import styled from "styled-components";

const Field = styled.div`
  display: flex;
  flex-direction: column;
`;

const FieldTitle = styled.span`
  display: flex;
  flex-direction: column;
  font-weight: bold;
  letter-spacing: 1px;
  font-size: ${({ theme }) => theme.fonts.label};
`;
export { Field, FieldTitle };
