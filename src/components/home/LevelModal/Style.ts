import styled from "styled-components";

const ContentWrapper = styled.div`
  padding: 2rem;
  background-color: ${({ theme }) => theme.colors.white};
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
  font-size: ${({ theme }) => theme.fonts.subHeading};
`;

const XContainer = styled.div`
  position: absolute;
  top: 0;
  right: 0;
`;

const Content = styled.div`
  flex: 1;
  font-size: ${({ theme }) => theme.fonts.body};
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

export {
  BtnContainer,
  Content,
  ContentWrapper,
  Heading,
  HeadingTitle,
  XContainer,
  RadioFieldContainer,
};
