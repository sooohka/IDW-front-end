import React, { useCallback, useEffect } from "react";
import { createPortal } from "react-dom";
import styled from "styled-components";

const ModalRootEl = document.querySelector("#modal-root") as HTMLElement;

const Container = styled.div`
  position: fixed;
  top: 0;
  left: 0;

  min-height: 100%;
  min-width: 100%;
  & > * {
    :last-child {
      position: fixed;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      margin: auto;
      opacity: 1;
      z-index: 101;
      overflow: hidden;
      min-width: 40rem;
      min-height: 20rem;
    }
  }
`;

const BackDrop = styled.div`
  height: 100%;
  width: 100%;
  background-color: rgba(0, 0, 0, 0.7);
  position: absolute;
  z-index: 100;
`;

interface IProps {
  handleClose: () => void;
  children: React.ReactNode;
}
const Modal: React.FC<IProps> = ({ handleClose, children }) => {
  const handleESCPressEvent = useCallback(
    (e) => {
      if (e.key !== "Escape") return;
      handleClose();
    },
    [handleClose],
  );

  useEffect(() => {
    document.addEventListener("keydown", handleESCPressEvent);
    return () => {
      console.log("modalClose");
      document.removeEventListener("keydown", handleESCPressEvent);
    };
  }, [handleESCPressEvent]);

  return createPortal(
    <Container>
      <BackDrop onClick={handleClose} />
      {children}
    </Container>,
    ModalRootEl,
  );
};

export default Modal;
