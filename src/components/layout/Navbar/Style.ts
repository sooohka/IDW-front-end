import styled from "styled-components";

const Navbar = styled.div`
  margin: 0 0 3rem;
  width: 100%;
  height: 100%;
  align-items: center;
  display: grid;
  grid-template-columns: 20rem 1fr 20rem;
  gap: 1rem;
  z-index: 100000000;
`;

const Logo = styled.div`
  grid-column: 1/2;
`;

const LogoImg = styled.div`
  display: inline-block;
  background-color: aquamarine;
  width: 2em;
  height: 4rem;
`;

const Nav = styled.nav`
  grid-column: 2/3;
  & > * {
    &:not(:last-child) {
      margin: 0 3rem 0 0;
    }
  }
`;
const Tools = styled.div``;

export { Navbar, Logo, LogoImg, Nav, Tools };
