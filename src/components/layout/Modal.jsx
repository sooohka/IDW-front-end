import React, { useCallback, useEffect } from "react";
import styled from "styled-components";
import { createPortal } from "react-dom";
import PropTypes from "prop-types";
import XButton from "../common/XButton";
import { theme } from "../../style/theme";
import Button from "../common/Button";

const ModalRootEl = document.querySelector("#modal-root");

const Container = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  min-height: 100%;
  min-width: 100%;
  display: flex;
  align-items: center;
`;

const BackDrop = styled.div`
  height: 100%;
  width: 100%;
  background-color: rgba(0, 0, 0, 0.7);
  position: absolute;
  z-index: 100;
`;

const ContentWrapper = styled.div`
  margin: auto;
  width: 40rem;
  min-height: 20rem;
  padding: 2rem;
  background-color: white;
  opacity: 1;
  z-index: 101;

  display: flex;
  flex-direction: column;
  border-radius: 2rem;
  overflow: hidden;
`;

const Heading = styled.div`
  flex-basis: 20%;
  display: flex;
  align-items: center;
  position: relative;
`;

const HeadingTitle = styled.h1`
  flex-basis: 100%;
  text-align: center;
  font-size: ${() => theme.fonts.subHeading};
`;

const XContainer = styled.div`
  position: absolute;
  top: 0;
  right: 0;
`;

const Content = styled.p`
  flex: 1;
  font-size: ${() => theme.fonts.body};
  padding: 1rem 0;
`;

const BtnContainer = styled.div`
  flex-basis: 10%;
  display: flex;
  padding: 0 2rem;
  justify-content: space-around;
`;

const Modal = ({ setOpen }) => {
  const handleESCPressEvent = useCallback(
    (e) => {
      if (e.key !== "Escape") return;
      console.log("modal open");
      setOpen(false);
    },
    [setOpen]
  );

  const handleClose = useCallback(() => {
    setOpen(false);
  }, [setOpen]);

  useEffect(() => {
    document.addEventListener("keydown", handleESCPressEvent);
    return () => {
      console.log("modalClose");
      document.removeEventListener("keydown", handleESCPressEvent);
    };
  }, [handleESCPressEvent]);

  return createPortal(
    <Container>
      <BackDrop></BackDrop>
      <ContentWrapper>
        <Heading>
          <HeadingTitle>Title</HeadingTitle>
          <XContainer>
            <XButton onClick={handleClose}></XButton>
          </XContainer>
        </Heading>
        <Content>
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Atque eos ea cum repudiandae et dolores non ipsum adipisci sequi. Qui quisquam ipsa aperiam?
        </Content>
        <BtnContainer>
          <Button label="ok" onClick={() => console.log("ok")} size="medium" />
          <Button label="cancel" onClick={handleClose} color="transparent" fontColor="black" size="medium" />
        </BtnContainer>
      </ContentWrapper>
    </Container>,
    ModalRootEl
  );
};

Modal.propTypes = {
  setOpen: PropTypes.func.isRequired,
};
export default Modal;
