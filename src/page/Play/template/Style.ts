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
  background-color: gray;
  display: grid;
  grid-template-rows: 10rem 1fr;
  gap: 2rem;
`;
const Text = styled.div`
  width: 100%;
  grid-row: 1/2;
  display: flex;
  justify-content: center;
  align-items: center;
`;
export { Container, Navbar, Content, Text };
