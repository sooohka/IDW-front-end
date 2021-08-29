import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import Text from "./Text";
import { theme } from "../../style/theme";

const StyledCard = styled.div`
  width: 30rem;
  height: 40rem;
  margin: 1rem;
  display: flex;
  flex-direction: column;
  box-shadow: 0 1rem 1.5rem rgba(1, 1, 1, 0.1);
  border-radius: 5px;
`;

const Img = styled.img`
  width: 100%;
  height: 70%;
`;

const Box = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  width: "100%";
  padding: 1rem 0;
`;

const ExtraBox = styled.div`
  padding: 0 1rem 0 0;
  display: flex;
  align-items: center;
`;

const ToolBox = styled.div`
  flex-grow: 1;
  display: flex;
  padding: 0 0 0 1rem;
`;

const IconWrapper = styled.div`
  width: fit-content;
  display: flex;
  align-items: center;
  padding: 0 2rem 0 0;
  & > * {
    margin: 0 0.5rem 0 0;
  }
`;

const Card = ({ title, desc, img, numberOfComments, numberOfLikes }) => {
  return (
    <StyledCard>
      <Img src={img.src} alt={img.alt}></Img>
      <Box>
        <Text bold fontSize={theme.fonts.strongBody} text={title} />
        <div style={{ flexGrow: 1 }}>
          <Text fontSize={theme.fonts.body} text={desc} />
        </div>
        <ExtraBox>
          <ToolBox>
            <IconWrapper>
              <i className="far fa-comment"></i>
              <Text
                fontSize={theme.fonts.subBody}
                text={numberOfComments}
              ></Text>
            </IconWrapper>
            <IconWrapper>
              <i className="far fa-thumbs-up"></i>
              <Text fontSize={theme.fonts.subBody} text={numberOfLikes}></Text>
            </IconWrapper>
          </ToolBox>
          <i className="fas fa-share-square"></i>
        </ExtraBox>
      </Box>
    </StyledCard>
  );
};

Card.propTypes = {
  title: PropTypes.string.isRequired,
  desc: PropTypes.string.isRequired,
  numberOfComments: PropTypes.number.isRequired,
  numberOfLikes: PropTypes.number.isRequired,
  img: PropTypes.shape({
    src: PropTypes.string.isRequired,
    alt: PropTypes.string.isRequired,
  }).isRequired,
};
export default Card;
