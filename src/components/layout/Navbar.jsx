import React, { useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { theme } from "../../style/theme";
import Text from "../common/Text";
import Modal from "./Modal";

const StyledNavbar = styled.div`
  padding: 2rem 0;
  display: flex;
  margin: 0 0 5rem;
  width: 100%;
`;

const LeftContainer = styled.div`
  display: flex;
  & > * {
    margin-right: 5rem;
  }
`;

const LogoContainer = styled.div`
  display: inline-block;
  & > * {
    &:first-child {
      margin: 0 1rem 0;
    }
  }
`;

const Logo = styled.div`
  display: inline-block;
  background-color: aquamarine;
  width: 2em;
  height: 4rem;
`;

const Nav = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  & > * {
    &:not(:last-child) {
      margin: 0 3rem 0 0;
    }
  }
`;

const RightContainer = styled.div`
  display: flex;
`;

const Navbar = () => {
  const [open, setOpen] = useState(true);
  return (
    <StyledNavbar>
      {open && <Modal setOpen={setOpen}></Modal>}
      <LeftContainer>
        <LogoContainer>
          <Link to="/">
            <Logo />
            <Text bold fontSize={theme.fonts.heading} text="Logo" />
          </Link>
        </LogoContainer>
        <Nav>
          <Link to="/create">
            <Text color={theme.colors.secondary} bold text="만들기" />
          </Link>
          <Link to="/">
            <Text color={theme.colors.secondary} bold text="후원하기" />
          </Link>
          <Link to="/">
            <Text color={theme.colors.secondary} bold text="커뮤니티" />
          </Link>
        </Nav>
      </LeftContainer>
      <RightContainer />
    </StyledNavbar>
  );
};

export default Navbar;
