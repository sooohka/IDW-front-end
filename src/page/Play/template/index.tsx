import React from "react";
import styled from "styled-components";
import Text from "../../../components/common/Text";
import Navbar from "../../../components/layout/Navbar";
import Target from "../../../components/play/Target";
import * as S from "./Style";

interface IProps {
  title: string;
  currentTargets: Target[];
}

const Targets = styled.div`
  grid-row: 2/10;
  width: 100%;
  display: grid;
  grid-template-columns: 1fr 1fr;
`;
const Template: React.FC<IProps> = ({ title, currentTargets }) => {
  return (
    <S.Container>
      <S.Navbar>
        <Navbar />
      </S.Navbar>
      <S.Content>
        <S.Text>
          <Text bold color='white' fontSize='heading'>
            {title}
          </Text>
        </S.Text>
        <Targets>
          {currentTargets.map((target) => (
            <Target key={target.id} target={target} />
          ))}
        </Targets>
      </S.Content>
    </S.Container>
  );
};

export default Template;
