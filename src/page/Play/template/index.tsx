import React from "react";
import styled from "styled-components";
import Navbar from "../../../components/layout/Navbar";
import Target from "../../../components/play/Target";
import theme from "../../../style/theme";
import Text from "../../../components/common/Text";

const Container = styled.div`
  height: 100%;
  min-width: 100%;
  display: flex;
  flex-direction: column;
`;

const Wrapper = styled.div`
  flex: 1;
  display: flex;
  flex-wrap: wrap;
  padding: 0 5rem;
  background-color: ${() => theme.colors.primary};
`;

const TextContainer = styled.div`
  width: 100%;
  text-align: center;
  margin: 0 0 3rem;
`;
interface IProps {
  title: string;
  currentTargets: Target[];
}

const Template: React.FC<IProps> = ({ currentTargets, title }) => (
  <Container>
    <Navbar />
    <Wrapper>
      <TextContainer>
        <Text bold text={title} color={theme.colors.white} fontSize={theme.fonts.heading} />
      </TextContainer>
      <Target target={currentTargets[0]} />
      <Target target={currentTargets[1]} />
    </Wrapper>
  </Container>
);

export default Template;
