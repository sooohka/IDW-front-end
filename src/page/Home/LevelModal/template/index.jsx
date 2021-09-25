import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import Modal from "../../../../components/layout/Modal";
import { theme } from "../../../../style/theme";
import XButton from "../../../../components/common/XButton";
import Button from "../../../../components/common/Button";
import RadioField from "../../../../components/common/RadioField";

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

const Template = ({ level, handleLevelChange, handleModalSubmit, handleModalClose }) => (
  // TODO:나중에 이쁘게 스타일링
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
);
Template.propTypes = {
  level: PropTypes.number.isRequired,
  handleLevelChange: PropTypes.func.isRequired,
  handleModalSubmit: PropTypes.func.isRequired,
  handleModalClose: PropTypes.func.isRequired,
};

export default Template;
