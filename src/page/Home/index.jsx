import React from "react";
import cardsJson from "../../assets/temp/cards.json";
import PageSpinner from "../../components/common/PageSpinner";
import useFetch from "../../utils/hooks/useFetch";
import Template from "./template";

const promise = () =>
  new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(cardsJson);
    }, 1000);
  });

const Home = () => {
  const { data: cards, isLoading } = useFetch(promise);
  return <>{isLoading ? <PageSpinner /> : <Template cards={cards} />}</>;
};

export default Home;
