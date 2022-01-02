import React from "react";
import Text from "../../../components/common/Text";
import Navbar from "../../../components/layout/Navbar";
import Target from "../../../components/play/Target";
import * as S from "./Style";

interface IProps {
  title: string;
  currentTargets: Target[];
}

const Template: React.FC<IProps> = ({ title, currentTargets }) => {
  return (
    <S.Container>
      <S.Navbar>
        <Navbar />
      </S.Navbar>
      <S.Content>
        <S.Title>
          <Text bold color='white' fontSize='heading'>
            {title}
          </Text>
        </S.Title>
        <S.Targets>
          {currentTargets.map((target) => (
            <Target key={target.id} target={target} />
          ))}
        </S.Targets>
      </S.Content>
    </S.Container>
  );
};

export default Template;
