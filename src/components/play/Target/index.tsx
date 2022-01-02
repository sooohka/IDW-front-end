import React from "react";
import useWorldCupReducer from "../../../utils/hooks/useWorldCupReducer";
import Img from "../../common/Img";
import * as S from "./Style";

interface IProps {
  target: Target;
}
const Target: React.FC<IProps> = ({ target }) => {
  const {
    id,
    name,
    image: { big, lowQuality },
  } = target;

  const { selectTarget } = useWorldCupReducer();

  const handleTargetClick = (targetId: number) => (e: React.MouseEvent) => {
    selectTarget({ targetId });
  };
  return (
    <S.Target>
      <Img onClick={handleTargetClick(id)} width={600} height={750} src={big} alt={name} />
      <S.Info />
      <div>{target.id}</div>
    </S.Target>
  );
};

export default Target;
