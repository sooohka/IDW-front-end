import PropTypes from "prop-types";
import React, { useRef } from "react";
import styled from "styled-components";
import { ReactComponent as CommentReg } from "../../assets/icons/comment-regular.svg";
import { ReactComponent as Share } from "../../assets/icons/share-square-solid.svg";
import { ReactComponent as ThumbUpReg } from "../../assets/icons/thumbs-up-regular.svg";
import { theme } from "../../style/theme";
import useImgLazyLoad from "../../utils/hooks/useImgLazyLoad";
import "./spinner.css";
import Text from "./Text";

const StyledCard = styled.div`
  width: 30rem;
  height: 45rem;
  margin: 1rem;
  display: flex;
  flex-direction: column;
  box-shadow: 0 0.25rem 0.5rem rgba(1, 1, 1, 0.1);
  border-radius: 5px;
  overflow: hidden;
  padding: 2rem 0;
`;

const ImgBox = styled.div`
  width: 100%;
  height: 30rem;
  display: flex;
  align-items: center;
`;

const Img = styled.img`
  max-width: 100%;
  max-height: 100%;
  margin: 0 auto;
`;

const Box = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  width: "100%";
  padding: 1rem 1rem;
  & > * {
    margin: 0 0 1rem 0;
  }
`;

const ExtraBox = styled.div`
  padding: 0 1rem 0 0;
  flex-grow: 1;
  display: flex;
  align-items: center;
`;

const ToolBox = styled.div`
  flex-grow: 1;
  display: flex;
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

const SvgWrapper = styled.div`
  width: fit-content;
  height: fit-content;
  display: flex;
  align-items: center;
  &:hover {
    cursor: pointer;
  }
`;

const Card = ({ title, desc, img, numberOfComments, numberOfLikes }) => {
  const imageRef = useRef(null);
  const { imgSrc } = useImgLazyLoad(imageRef, img.src);

  return (
    <StyledCard>
      <ImgBox>
        <Img src={imgSrc} ref={imageRef} alt={img.alt}></Img>
      </ImgBox>
      <Box>
        <Text bold fontSize={theme.fonts.strongBody} text={title} />
        <Text maxRows={3} height="5rem" fontSize={theme.fonts.subBody} text={desc} />
        <ExtraBox>
          <ToolBox>
            <IconWrapper>
              <SvgWrapper>
                <CommentReg width={15} height={15} />
              </SvgWrapper>
              <Text fontSize={theme.fonts.subBody} text={numberOfComments.toString()}></Text>
            </IconWrapper>
            <IconWrapper>
              <SvgWrapper>
                <ThumbUpReg width={15} height={15} />
              </SvgWrapper>
              <Text fontSize={theme.fonts.subBody} text={numberOfLikes.toString()}></Text>
            </IconWrapper>
          </ToolBox>
          <SvgWrapper>
            <Share width={20} height={20} />
          </SvgWrapper>
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
    id: PropTypes.string.isRequired,
  }).isRequired,
};
export default Card;
