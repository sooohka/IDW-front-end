import React from "react";
import CreateForm from "../../../components/create/CreateForm";
import Navbar from "../../../components/layout/Navbar";
import * as S from "./Style";

const Template: React.FC = () => (
  <S.Container>
    <S.Navbar>
      <Navbar />
    </S.Navbar>
    <S.Content>
      <CreateForm />
    </S.Content>
  </S.Container>
);

export default Template;
