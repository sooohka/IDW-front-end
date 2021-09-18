import PropTypes from "prop-types";
import React from "react";
import styled from "styled-components";
import spinner from "../../../assets/spinner.gif";
import Content from "../../../components/layout/Content";
import Navbar from "../../../components/layout/Navbar";
import Sidebar from "../../../components/layout/Sidebar";
import Cards from "../Cards";

const Container = styled.div`
  height: 100%;
  display: flex;
  flex-wrap: wrap;
`;

const Template = ({ cards }) => {
  return (
    <Container>
      <Navbar />
      <Sidebar></Sidebar>
      <Content>
        <Cards cards={cards} />
      </Content>
    </Container>
  );
};

Template.propTypes = {
  cards: PropTypes.arrayOf(
    PropTypes.shape({
      createDate: PropTypes.string.isRequired,
      id: PropTypes.number.isRequired,
      desc: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      commentCounts: PropTypes.number.isRequired,
      numberOfLikes: PropTypes.number.isRequired,
      imageDto: {
        originalImage: PropTypes.string.isRequired,
        reducedImage: PropTypes.string.isRequired,
        id: PropTypes.number.isRequired,
      },
    })
  ).isRequired,
};

export default Template;
