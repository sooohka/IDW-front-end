import styled from "styled-components";

const FileUploadField = styled.div`
  min-height: 150%;
`;

const DropZone = styled.div<{ isAccepting: boolean }>`
  border: 3px dashed;
  border-color: ${({ theme }) => theme.colors.primary};
  height: 15rem;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  flex-direction: column;
  & > * {
    transform: ${({ isAccepting }) => isAccepting && "scale(1.5)"};
    opacity: ${({ isAccepting }) => isAccepting && 0.3};
  }
  & > p {
    font-weight: bold;
    color: ${({ theme }) => theme.colors.primary};
  }
`;

export { FileUploadField, DropZone };
