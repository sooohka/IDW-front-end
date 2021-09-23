import React from "react";
import axios from "../../api/axios";
import worldCupsJson from "../../assets/temp/worldCups.json";
import PageSpinner from "../../components/common/PageSpinner";
import useFetch from "../../utils/hooks/useFetch";
import Template from "./template";
import WorldCupContext from "../../utils/contexts/worldCupContext";

const promise = () =>
  new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(worldCupsJson);
    }, 100);
  });

// const promise = () => axios.get("worldcups");
const Home = () => {
  const { data: worldCups, isLoading } = useFetch(promise);
  if (isLoading) return <PageSpinner></PageSpinner>;
  console.log(worldCups);

  return (
    <WorldCupContext.Provider value={{ worldCups }}>
      <Template />
    </WorldCupContext.Provider>
  );
};

export default Home;
