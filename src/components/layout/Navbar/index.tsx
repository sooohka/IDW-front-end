import React from "react";
import { Link } from "react-router-dom";
import Text from "../../common/Text";
import * as S from "./Style";

const Navbar: React.FC = () => (
  <S.Navbar>
    <Link to='/'>
      <S.Logo>
        <S.LogoImg />
        <Text bold fontSize='heading'>
          Logo
        </Text>
      </S.Logo>
    </Link>
    <S.Nav>
      <Link to='/create'>
        <Text color='secondary' bold>
          만들기
        </Text>
      </Link>
      <Link to='/'>
        <Text color='secondary' bold>
          후원하기
        </Text>
      </Link>
      <Link to='/'>
        <Text color='secondary' bold>
          커뮤니티
        </Text>
      </Link>
    </S.Nav>
    <S.Tools />
  </S.Navbar>
);

export default Navbar;
