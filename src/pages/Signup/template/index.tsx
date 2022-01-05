import React from "react";
import styled from "styled-components";
import SignInForm from "../../../components/signup/SignUpForm";

const Container = styled.div`
  margin: auto;
`;
const Template = () => {
  return (
    <Container>
      <SignInForm />
    </Container>
  );
};

export default Template;
