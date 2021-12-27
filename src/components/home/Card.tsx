import React, { useRef } from "react";
import styled from "styled-components";
import { ReactComponent as CommentReg } from "../../assets/icons/comment-regular.svg";
import { ReactComponent as PlaySolid } from "../../assets/icons/play-solid.svg";
import { ReactComponent as Share } from "../../assets/icons/share-square-solid.svg";
import { ReactComponent as ThumbUpReg } from "../../assets/icons/thumbs-up-regular.svg";
import useImgLazyLoad from "../../utils/hooks/useImgLazyLoad";
import Img from "../common/Img";
import Text from "../common/Text";
import Texts from "../common/Texts";

const StyledCard = styled.div`
  padding: 1rem;
  display: flex;
  flex-direction: column;
  box-shadow: 0 0.25rem 0.5rem rgba(1, 1, 1, 0.1);
  border-radius: 5px;
  overflow: hidden;
`;

const ImgBox = styled.div`
  width: 100%;
  height: 60%;
  display: flex;
  align-items: center;
  position: relative;
  cursor: pointer;
  &:hover {
    & > img {
      opacity: 0.3;
    }
  }
`;

const Box = styled.div`
  display: flex;
  flex-direction: column;
  padding: 1rem 1rem 0;
  width: 100%;

  & > * {
    margin: 0 0 1rem 0;
  }
`;

const ExtraBox = styled.div`
  flex-grow: 1;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const ToolBox = styled.div`
  display: flex;
`;

const IconWrapper = styled.div`
  width: fit-content;
  display: flex;
  align-items: center;
  padding: 0 0.5rem 0 0;
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

const PlayWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  opacity: 0;
  &:hover {
    opacity: 1;
  }
  flex-direction: column;
  position: absolute;
  justify-content: center;
  align-items: center;
  transform: translate(-50%, -50%);
  top: 50%;
  left: 50%;
`;

interface IProps {
  worldCup: WorldCup;
  handlePlayBtnClick: (id: number) => (e: React.MouseEvent) => void;
}

const Card: React.FC<IProps> = ({ worldCup, handlePlayBtnClick }) => {
  // const { id } = worldCup;
  const { id, desc, title, targets, commentCounts, likeCounts } = worldCup;
  const {
    image: { lowQuality, originalQuality },
  } = targets[0];

  const imageRef = useRef<HTMLImageElement>(null);
  const { imgSrc } = useImgLazyLoad(imageRef, originalQuality, lowQuality);
  return (
    <StyledCard>
      <ImgBox>
        <Img src={imgSrc} ref={imageRef} alt={title} />
        <PlayWrapper onClick={handlePlayBtnClick(id)}>
          <PlaySolid width={50} />
          <Text bold>월드컵 하러 가기</Text>
        </PlayWrapper>
      </ImgBox>
      <Box>
        <Text bold fontSize='strongBody'>
          {title}
        </Text>
        <Texts maxRows={3} height='5rem' fontSize='subBody'>
          {desc}
        </Texts>
        <ExtraBox>
          <ToolBox>
            <IconWrapper>
              <SvgWrapper>
                <CommentReg width={15} height={15} />
              </SvgWrapper>
              <Text fontSize='subBody'>{commentCounts?.toString()}</Text>
            </IconWrapper>
            <IconWrapper>
              <SvgWrapper>
                <ThumbUpReg width={15} height={15} />
              </SvgWrapper>
              <Text fontSize='subBody'>{likeCounts?.toString()}</Text>
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

export default Card;
