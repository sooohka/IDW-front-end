import React from "react";

import styled from "styled-components";
import Navbar from "../../../components/layout/Navbar";
import Sidebar from "../../../components/layout/Sidebar";
import Content from "../../../components/layout/Content";
import Card from "../../../components/common/Card";

const Container = styled.div`
  height: 100%;
  display: flex;
  flex-wrap: wrap;
`;

const Template = () => {
  return (
    <Container>
      <Navbar />
      <Sidebar />
      <Content>
        <Card
          desc="Lorem ipsum dolor sit amet numquam sed ducimus error laudantium laborum ullam fugiat beatae voluptatum asperiores?"
          title="스파게티"
          numberOfComments={123}
          numberOfLikes={1241}
          img={{
            src: "https://images.unsplash.com/photo-1496440737103-cd596325d314?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=934&q=80",
            alt: "이쁜여자",
          }}
          isLoading
        ></Card>
      </Content>
    </Container>
  );
};

export default Template;
