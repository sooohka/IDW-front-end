import React, { useCallback, useState } from "react";
import { useHistory } from "react-router-dom";
import { WorldCupApi } from "../../api";
import ModalContext from "../../utils/contexts/ModalContext";
import useFetch from "../../utils/hooks/useFetch";
import useModal from "../../utils/hooks/useModal";
import Template from "./template";

const Home: React.FC = () => {
  const { data: worldCups, isLoading } = useFetch(WorldCupApi.getWorldCups);
  const { closeModal, openModal, opened } = useModal();
  const history = useHistory();
  const [currentWorldCup, setCurrentWorldCup] = useState<WorldCup | null>(null);

  const handlePlayBtnClick = useCallback(
    (id) => () => {
      openModal();
      if (worldCups) setCurrentWorldCup(worldCups.find((v: WorldCup) => v.id === id) || null);
    },
    [openModal, worldCups],
  );

  const handleModalSubmit = useCallback(
    (level: number) => () => {
      if (!currentWorldCup) throw new Error("Home: currentWorldCup이 null입니다");
      else if (level <= currentWorldCup.targetCounts)
        history.push(`/play/${currentWorldCup.id}`, { level, worldCupId: currentWorldCup.id });
      else alert(`선택할 수 있는 강수는 최대 ${currentWorldCup.targetCounts}입니다`);
    },
    [currentWorldCup, history],
  );

  const handleModalClose = useCallback(() => closeModal(), [closeModal]);

  return (
    <ModalContext.Provider value={{ handleModalClose, handleModalSubmit, isModalOpened: opened }}>
      {isLoading ||
        (worldCups && <Template worldCups={worldCups} handlePlayBtnClick={handlePlayBtnClick} />)}
    </ModalContext.Provider>
  );
};

export default Home;
