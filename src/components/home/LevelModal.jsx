import React, { useCallback, useContext, useState } from "react";
import styled from "styled-components";
import Button from "../common/Button";
import RadioField from "../common/RadioField";
import XButton from "../common/XButton";
import Modal from "../layout/Modal";
import { theme } from "../../style/theme";
import ModalContext from "../../utils/contexts/ModalContext";

const ContentWrapper = styled.div`
  padding: 2rem;
  background-color: white;
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

const Content = styled.div`
  flex: 1;
  font-size: ${() => theme.fonts.body};
  padding: 1rem 0;
  & > * {
    &:not(:last-child) {
      margin-bottom: 3rem;
    }
  }
`;

const BtnContainer = styled.div`
  flex-basis: 10%;
  display: flex;
  padding: 0 2rem;
  justify-content: space-around;
`;

const RadioFieldContainer = styled.div`
  & > * {
    margin: 0 0 0.5rem 0;
  }
`;

const LevelModal = () => {
  const { handleModalSubmit, handleModalClose, isLevelModalOpened } = useContext(ModalContext);
  const [level, setLevel] = useState(4);

  const handleLevelChange = useCallback(
    (value) => (e) => {
      const lv = parseInt(value, 10);
      setLevel(lv);
    },
    []
  );
  return (
    <>
      {isLevelModalOpened && (
        <Modal handleModalSubmit={handleModalSubmit} handleClose={handleModalClose}>
          <ContentWrapper>
            <Heading>
              <HeadingTitle>월드컵 강수 고르기</HeadingTitle>
              <XContainer>
                <XButton onClick={handleModalClose} />
              </XContainer>
            </Heading>
            <Content>
              <RadioFieldContainer>
                {[4, 8, 16, 32, 64].map((v, i) => (
                  <RadioField key={v} id={i} name="level" checked={level === v} onChange={handleLevelChange(v)} label={`${v}강`} value={v} />
                ))}
              </RadioFieldContainer>
              <BtnContainer>
                <Button size="medium" color={theme.colors.white} backgroundColor={theme.colors.secondary} onClick={handleModalSubmit(level)} label="시작" />
                <Button size="medium" color={theme.colors.white} backgroundColor={theme.colors.gray} onClick={handleModalClose} label="취소" />
              </BtnContainer>
            </Content>
          </ContentWrapper>
        </Modal>
      )}
    </>
  );
};

export default LevelModal;
