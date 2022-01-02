import React, { useRef } from "react";
import CommentReg from "../../../assets/icons/comment-regular.svg";
import PlaySolid from "../../../assets/icons/play-solid.svg";
import Share from "../../../assets/icons/share-square-solid.svg";
import ThumbUpReg from "../../../assets/icons/thumbs-up-regular.svg";
import useImgLazyLoad from "../../../utils/hooks/useImgLazyLoad";
import Img from "../../common/Img";
import Text from "../../common/Text";
import Texts from "../../common/Texts";
import * as S from "./Style";

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
    <S.Card>
      <S.ImgBox>
        <Img src={imgSrc} ref={imageRef} alt={title} />
        <S.PlayWrapper onClick={handlePlayBtnClick(id)}>
          <PlaySolid width={50} />
          <Text bold>월드컵 하러 가기</Text>
        </S.PlayWrapper>
      </S.ImgBox>
      <S.Box>
        <Text bold fontSize='strongBody'>
          {title}
        </Text>
        <Texts maxRows={3} height='5rem' fontSize='subBody'>
          {desc}
        </Texts>
        <S.ExtraBox>
          <S.ToolBox>
            <S.IconWrapper>
              <S.SvgWrapper>
                <CommentReg width={15} height={15} />
              </S.SvgWrapper>
              <Text fontSize='subBody'>{commentCounts?.toString()}</Text>
            </S.IconWrapper>
            <S.IconWrapper>
              <S.SvgWrapper>
                <ThumbUpReg width={15} height={15} />
              </S.SvgWrapper>
              <Text fontSize='subBody'>{likeCounts?.toString()}</Text>
            </S.IconWrapper>
          </S.ToolBox>
          <S.SvgWrapper>
            <Share width={20} height={20} />
          </S.SvgWrapper>
        </S.ExtraBox>
      </S.Box>
    </S.Card>
  );
};

export default Card;
