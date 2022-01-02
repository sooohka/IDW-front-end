import styled from "styled-components";

const Container = styled.div`
  padding: 0rem 0rem 0rem 2rem;
  display: grid;
  grid-template-columns: 20rem 1fr;
  gap: 1rem;
`;

const Navbar = styled.section`
  grid-column: 1/3;
  grid-row: 1/2;
`;
const Sidebar = styled.section`
  grid-column: 1/2;
  grid-row: 2/3;
`;
const Content = styled.section`
  grid-column: 2/3;
  grid-row: 2/3;
  border: 1px solid rgba(1, 1, 1, 0.2);
`;
const Cards = styled.div`
  margin: 0 auto;
  display: grid;
  width: 100%;
  grid-template-columns: repeat(auto-fill, 20rem);
  grid-auto-rows: 35rem;
  grid-gap: 2rem 2rem;
`;
export { Container, Navbar, Sidebar, Content, Cards };
