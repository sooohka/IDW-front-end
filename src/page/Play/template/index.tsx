import React, { useContext } from "react";
import styled from "styled-components";
import Text from "../../../components/common/Text";
import Navbar from "../../../components/layout/Navbar";
import PageContainer from "../../../components/layout/PageContainer";
import Target from "../../../components/play/Target";
import GameContext from "../../../utils/contexts/GameContext";

const Wrapper = styled.div`
  flex: 1;
  display: flex;
  flex-wrap: wrap;
  padding: 5rem 5rem 0;
  background-color: ${({ theme }) => theme.colors.primary};
`;

const TextContainer = styled.div`
  width: 100%;
  text-align: center;
  margin: 0 0 3rem;
`;
interface IProps {
  title: string;
}

const Template: React.FC<IProps> = ({ title }) => {
  const { targets, currentTargetsId } = useContext(GameContext);
  return (
    <>
      <Navbar />
      <Wrapper>
        <TextContainer>
          <Text bold text={title} color='white' fontSize='heading' />
        </TextContainer>
        {currentTargetsId.map((id) =>
          targets.map((target) =>
            target.id === id ? <Target key={target.id} target={target} /> : null,
          ),
        )}
      </Wrapper>
    </>
  );
};

export default Template;
