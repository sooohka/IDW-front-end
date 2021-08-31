import React, { useCallback, useEffect, useState } from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import Text from "./Text";
import { theme } from "../../style/theme";
import { ReactComponent as CommentReg } from "../../assets/icons/comment-regular.svg";
import { ReactComponent as Share } from "../../assets/icons/share-square-solid.svg";
import { ReactComponent as ThumbUpReg } from "../../assets/icons/thumbs-up-regular.svg";
import { ReactComponent as ThumbUpSol } from "../../assets/icons/thumbs-up-solid.svg";
import useFetch from "../../utils/hooks/useFetch";

const StyledCard = styled.div`
  width: 30rem;
  height: 45rem;
  margin: 1rem;
  display: flex;
  flex-direction: column;
  box-shadow: 0 1rem 1.5rem rgba(1, 1, 1, 0.1);
  border-radius: 5px;
`;

const Img = styled.img`
  width: 100%;
  height: 30rem;
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

const Card = ({ title, desc, img, numberOfComments, numberOfLikes, isLoading: fetching }) => {
  const [thumbUp, setThumbUp] = useState(false);
  const [isLoading]
  const isLoading = fetching && loading;
  // useEffects
  useEffect(() => {}, [thumbUp]);

  // event Handlers
  const onThumbUpBtnClick = useCallback(() => {
    if (thumbUp) setThumbUp(false);
    else setThumbUp(true);
  }, [thumbUp, setThumbUp]);

  return (
    <StyledCard>
      {!isLoading && (
        <>
          <Img src={img.src} alt={img.alt}></Img>
          <Box>
            <Text bold fontSize={theme.fonts.strongBody} text={title} />
            <Text maxRows={3} height="6rem" fontSize={theme.fonts.subBody} text={desc} />
            <ExtraBox>
              <ToolBox>
                <IconWrapper>
                  <SvgWrapper>
                    <CommentReg width={15} height={15} />
                  </SvgWrapper>
                  <Text fontSize={theme.fonts.subBody} text={numberOfComments}></Text>
                </IconWrapper>
                <IconWrapper>
                  <SvgWrapper onClick={onThumbUpBtnClick}>{thumbUp ? <ThumbUpSol width={15} height={15} /> : <ThumbUpReg width={15} height={15} />}</SvgWrapper>
                  <Text fontSize={theme.fonts.subBody} text={numberOfLikes}></Text>
                </IconWrapper>
              </ToolBox>
              <SvgWrapper>
                <Share width={20} height={20} />
              </SvgWrapper>
            </ExtraBox>
          </Box>
        </>
      )}
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
  isLoading: PropTypes.bool.isRequired,
};
export default Card;
