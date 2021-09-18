import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import Card from "../../Card";

const Cards = styled.div`
  display: flex;
  flex-wrap: wrap;
  & > * {
    margin: 0 2rem 2rem 2rem;
  }
`;

const Template = ({ cards }) => {
  return (
    <Cards>
      {cards.map((v) => (
        <Card
          createDate={v.createDate}
          id={v.id}
          key={v.id}
          desc={v.desc}
          title={v.title}
          commentCounts={v.commentCounts}
          likeCounts={v.likeCounts}
          imageDto={{
            originalImage: v.imageDto.originalImage,
            reducedImage: v.imageDto.reducedImage,
            alt: v.title,
            id: v.imageDto.id,
          }}
          isLoading
        />
      ))}
    </Cards>
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
      likeCounts: PropTypes.number.isRequired,
      imageDto: {
        originalImage: PropTypes.string.isRequired,
        reducedImage: PropTypes.string.isRequired,
        id: PropTypes.number.isRequired,
      },
    })
  ).isRequired,
};
export default Template;
