import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
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

const Template = ({ currentTargets, title }) => (
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

Template.propTypes = {
  title: PropTypes.string.isRequired,
  currentTargets: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      likeCounts: PropTypes.number.isRequired,
      image: PropTypes.shape({
        small: PropTypes.string.isRequired,
        big: PropTypes.string.isRequired,
        lowQuality: PropTypes.string.isRequired,
        originalQuality: PropTypes.string.isRequired,
        id: PropTypes.number.isRequired,
      }),
    })
  ).isRequired,
};

export default Template;
