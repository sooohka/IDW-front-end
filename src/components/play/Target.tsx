import React from "react";
import styled from "styled-components";
import useWorldCupReducer from "../../utils/hooks/useWorldCupReducer";
import Img from "../common/Img";

const Container = styled.div`
  width: 50%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const InfoContainer = styled.div`
  height: 20rem;
`;
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
    <Container>
      <Img onClick={handleTargetClick(id)} width={600} height={750} src={big} alt={name} />
      <InfoContainer />
      <div>{target.id}</div>
    </Container>
  );
};

export default Target;
