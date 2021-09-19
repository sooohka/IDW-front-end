import React from "react";
import axios from "../../api/axios";
import cardsJson from "../../assets/temp/cards.json";
import PageSpinner from "../../components/common/PageSpinner";
import useFetch from "../../utils/hooks/useFetch";
import Template from "./template";
import CardsContext from "../../utils/contexts/CardsContext";

const promise = () =>
  new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(cardsJson);
    }, 100);
  });

// const promise = () => axios.get("worldcups");
const Home = () => {
  const { data: cards, isLoading } = useFetch(promise);
  if (isLoading) return <PageSpinner></PageSpinner>;
  console.log(cards);

  return (
    <CardsContext.Provider value={{ cards }}>
      <Template />
    </CardsContext.Provider>
  );
};

export default Home;
