import React, { createContext, useCallback, useState } from "react";
import { useHistory } from "react-router-dom";
import axios from "../../api/axios";
import worldCupsJson from "../../assets/temp/worldCups.json";
import PageSpinner from "../../components/common/PageSpinner";
import useFetch from "../../utils/hooks/useFetch";
import Template from "./template";
import WorldCupsContext from "../../utils/contexts/WorldCupsContext";
import ModalContext from "../../utils/contexts/ModalContext";

const promise = () => {
  if (process.env.REACT_APP_ENV === "production") return axios.get("worldcups");

  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(worldCupsJson);
    }, 100);
  });
};

const Home = () => {
  const { data: worldCups, isLoading } = useFetch(promise);
  const history = useHistory();
  const [isLevelModalOpened, setIsLevelModalOpened] = useState(false);
  const [currentWorldCupId, setCurrentWorldCupId] = useState(null);

  const handlePlayBtnClick = useCallback(
    (id) => (e) => {
      setIsLevelModalOpened(true);
      setCurrentWorldCupId(id);
    },
    []
  );

  // TODO:data의 id에 몇개의 타겟이 있는지 미리 검사하고 id와 비교해서 modalSubmit block
  const handleModalSubmit = useCallback(
    (level) => (e) => {
      history.push(`/play/${currentWorldCupId}`, { level });
    },
    [currentWorldCupId, history]
  );

  const handleModalClose = useCallback(() => {
    setIsLevelModalOpened(false);
  }, []);

  return (
    <WorldCupsContext.Provider value={{ worldCups }}>
      <ModalContext.Provider value={{ handleModalClose, handleModalSubmit, isLevelModalOpened }}>
        {isLoading || (
          <Template
            handlePlayBtnClick={handlePlayBtnClick}
            isModalOpened={isLevelModalOpened}
            handleModalClose={handleModalClose}
            handleModalSubmit={handleModalSubmit}
          />
        )}
      </ModalContext.Provider>
    </WorldCupsContext.Provider>
  );
};

export default Home;
