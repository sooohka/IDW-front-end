import axios from "axios";
import React from "react";
import cardsJson from "../../assets/temp/cards.json";
import PageSpinner from "../../components/common/PageSpinner";
import useFetch from "../../utils/hooks/useFetch";
import Template from "./template";

// const promise = () =>
//   new Promise((resolve, reject) => {
//     setTimeout(() => {
//       resolve(cardsJson);
//     }, 1000);
//   });

const Home = () => {
  const promise = () => axios.get("http://13.125.23.168:8080/worldcups");
  const { data: cards, isLoading } = useFetch(promise);
  return <>{isLoading ? <PageSpinner /> : <Template cards={cards} />}</>;
};

export default Home;
