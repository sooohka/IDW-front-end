import React from "react";
import styled from "styled-components";
import PageContainer from "../../../components/layout/PageContainer";
import SignInForm from "../../../components/signup/SignUpForm";

const Container = styled.div`
  margin: auto;
`;
const Template = () => {
  return (
    <PageContainer>
      <Container>
        <SignInForm />
      </Container>
    </PageContainer>
  );
};

export default Template;
