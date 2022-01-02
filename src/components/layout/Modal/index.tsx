import React, { useCallback, useEffect } from "react";
import { createPortal } from "react-dom";
import styled from "styled-components";
import * as S from "./Style";

const ModalRootEl = document.querySelector("#modal-root") as HTMLElement;

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
    <S.Modal>
      <S.BackDrop onClick={handleClose} />
      {children}
    </S.Modal>,
    ModalRootEl,
  );
};

export default Modal;
