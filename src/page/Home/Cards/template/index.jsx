import React, { useContext } from "react";
import styled from "styled-components";
import CardsContext from "../../../../utils/contexts/CardsContext";
import Card from "../../Card";

const Cards = styled.div`
  display: flex;
  flex-wrap: wrap;
  & > * {
    margin: 0 2rem 2rem 2rem;
  }
`;

const Template = () => {
  const { cards } = useContext(CardsContext);

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
            reducedImage: v.imageDto.reducedImage || null,
            alt: v.title,
            id: v.imageDto.id,
          }}
          isLoading
        />
      ))}
    </Cards>
  );
};

export default Template;
