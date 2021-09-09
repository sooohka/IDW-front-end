import PropTypes from "prop-types";
import React from "react";
import styled from "styled-components";
import Card from "../../../components/common/Card";
import Spinner from "../../../components/common/Spinner";
import Content from "../../../components/layout/Content";
import Navbar from "../../../components/layout/Navbar";
import Sidebar from "../../../components/layout/Sidebar";

const Container = styled.div`
  height: 100%;
  display: flex;
  flex-wrap: wrap;
`;

const Cards = ({ cards }) => {
  if (!cards) return null;

  return cards.map((v) => (
    <Card
      key={v.img.id}
      desc={v.desc}
      title={v.title}
      numberOfComments={v.numberOfComments}
      numberOfLikes={v.numberOfLikes}
      img={{
        src: v.img.src,
        alt: v.img.alt,
        id: v.img.id,
      }}
      isLoading
    ></Card>
  ));
};

const Template = ({ isLoading, cards }) => {
  return (
    <Container>
      <Navbar />
      <Sidebar />
      <Content>{isLoading ? <Spinner /> : <Cards cards={cards} />}</Content>
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
