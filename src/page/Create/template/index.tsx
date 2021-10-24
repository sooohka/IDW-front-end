import React from "react";
import Navbar from "../../../components/layout/Navbar";
import CreateForm from "../../../components/create/CreateForm";
import PageContainer from "../../../components/layout/PageContainer";

const Template: React.FC = () => (
  <PageContainer>
    <Navbar />
    <CreateForm />
  </PageContainer>
);

export default Template;
