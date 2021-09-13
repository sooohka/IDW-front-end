import React from "react";
import cardsJson from "../../assets/temp/cards.json";
import useFetch from "../../utils/hooks/useFetch";
import Template from "./template";

const promise = new Promise((resolve, reject) => {
  resolve({ status: 200, data: cardsJson });
});

const Home = () => {
  const { data: cards, isLoading } = useFetch(promise);
  return <Template cards={cards} isLoading={isLoading} />;
};

export default Home;
