import React, { useCallback, useState } from "react";
import { useHistory } from "react-router-dom";
import api from "../../api/api";
import axios from "../../api/axios";
import ModalContext from "../../utils/contexts/ModalContext";
import WorldCupsContext from "../../utils/contexts/WorldCupsContext";
import useFetch from "../../utils/hooks/useFetch";
import Template from "./template";

const promise = () => {
  if (process.env.REACT_APP_ENV === "local") {
    const func = () => axios.get<WorldCup[]>("../../assets/temp/worldCups.json");
    return func;
  }
  return api.getWorldCups;
};

const Home: React.FC = () => {
  const { data: worldCups, isLoading } = useFetch(promise());
  const history = useHistory();
  const [isLevelModalOpened, setIsLevelModalOpened] = useState(false);
  const [currentWorldCup, setCurrentWorldCup] = useState<WorldCup | null>(null);

  const handlePlayBtnClick = useCallback(
    (id) => () => {
      setIsLevelModalOpened(true);
      if (worldCups) setCurrentWorldCup(worldCups.find((v: WorldCup) => v.id === id) || null);
    },
    [worldCups],
  );

  // TODO:data의 id에 몇개의 타겟이 있는지 미리 검사하고 id와 비교해서 modalSubmit block
  const handleModalSubmit = useCallback(
    (level: number) => () => {
      if (!currentWorldCup) throw new Error("Home: currentWorldCup이 null입니다");
      else if (level <= currentWorldCup.targetCounts) history.push(`/play/${currentWorldCup.id}`, { level, worldCupId: currentWorldCup.id });
      else alert(`선택할 수 있는 강수는 최대 ${currentWorldCup.targetCounts}입니다`);
    },
    [currentWorldCup, history],
  );

  const handleModalClose = useCallback(() => setIsLevelModalOpened(false), []);

  return (
    <WorldCupsContext.Provider value={{ worldCups }}>
      <ModalContext.Provider value={{ handleModalClose, handleModalSubmit, isLevelModalOpened }}>
        {isLoading || <Template handlePlayBtnClick={handlePlayBtnClick} />}
      </ModalContext.Provider>
    </WorldCupsContext.Provider>
  );
};

export default Home;
