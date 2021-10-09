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
  if (process.env.REACT_APP_ENV === "local") {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(worldCupsJson);
      }, 100);
    });
  }

  return axios.get("worldcups");
};

const Home = () => {
  const { data: worldCups, isLoading } = useFetch(promise);
  const history = useHistory();
  const [isLevelModalOpened, setIsLevelModalOpened] = useState(false);
  const [currentWorldCup, setCurrentWorldCup] = useState(null);

  const handlePlayBtnClick = useCallback(
    (id) => (e) => {
      console.log(e);

      setIsLevelModalOpened(true);
      setCurrentWorldCup(worldCups.find((v) => v.id === id));
    },
    [worldCups]
  );

  // TODO:data의 id에 몇개의 타겟이 있는지 미리 검사하고 id와 비교해서 modalSubmit block
  const handleModalSubmit = useCallback(
    (level) => (e) => {
      if (level <= currentWorldCup.targetCounts) history.push(`/play/${currentWorldCup.id}`, { level, worldCupId: currentWorldCup.id });
      else alert(`선택할 수 있는 강수는 최대 ${currentWorldCup.targetCounts}입니다`);
    },
    [currentWorldCup, history]
  );

  const handleModalClose = useCallback(() => {
    setIsLevelModalOpened(false);
  }, []);

  return (
    <WorldCupsContext.Provider value={{ worldCups }}>
      <ModalContext.Provider value={{ handleModalClose, handleModalSubmit, isLevelModalOpened }}>
        {isLoading || <Template handlePlayBtnClick={handlePlayBtnClick} />}
      </ModalContext.Provider>
    </WorldCupsContext.Provider>
  );
};

export default Home;
