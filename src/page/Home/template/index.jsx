import PropTypes from "prop-types";
import React from "react";
import styled from "styled-components";
import spinner from "../../../assets/spinner.gif";
import Content from "../../../components/layout/Content";
import Navbar from "../../../components/layout/Navbar";
import Sidebar from "../../../components/layout/Sidebar";
import Cards from "../components/Cards";

const Container = styled.div`
  height: 100%;
  display: flex;
  flex-wrap: wrap;
`;

const Template = ({ isLoading, cards }) => {
  return (
    <Container>
      <Navbar />
      <Sidebar />
      <Content>
        {/* <div style={{ backgroundColor: "rebeccapurple", width: "100%", height: "5rem" }}>filter</div> */}
        {isLoading ? (
          <div style={{ width: "100%", display: "flex", justifyContent: "center", alignItems: "center" }}>
            <img style={{ width: "fit-content", height: "fit-content" }} src={spinner} alt="spinner" />
          </div>
        ) : (
          <Cards cards={cards} />
        )}
      </Content>
    </Container>
  );
};

Template.propTypes = {
  isLoading: PropTypes.bool.isRequired,
  cards: PropTypes.arrayOf(
    PropTypes.shape({
      desc: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      numberOfComments: PropTypes.number.isRequired,
      numberOfLikes: PropTypes.number.isRequired,
      img: {
        src: PropTypes.string.isRequired,
        id: PropTypes.string.isRequired,
        alt: PropTypes.string.isRequired,
      },
    })
  ).isRequired,
};

export default Template;
