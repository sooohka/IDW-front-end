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

const TextArea = styled.textarea`
  border: 3px solid;
  border-radius: 5px;
  border-color: ${({ theme }) => theme.colors.primary};
  padding: 1rem;
  font-size: ${({ theme }) => theme.fonts.strongBody};
  letter-spacing: 0.5px;
  font-weight: bold;
`;

export { Field, FieldTitle, TextArea };
