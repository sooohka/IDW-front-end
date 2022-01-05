import styled from "styled-components";

const Container = styled.div`
  padding: 0rem 0rem 0rem 2rem;
  display: grid;
  grid-template-columns: 1fr;
  gap: 1rem;
`;

const Navbar = styled.section`
  grid-column: 1/2;
  grid-row: 1/2;
`;

const Content = styled.section`
  grid-column: 1/2;
  grid-row: 2/3;
`;

export { Container, Navbar, Content };
