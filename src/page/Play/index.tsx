import axios from "axios";
import React, { useCallback, useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import api from "../../api/api";
import GameContext from "../../utils/contexts/GameContext";
import useFetch from "../../utils/hooks/useFetch";
import Template from "./template";
import gameExample from '../../assets/temp/gameExample.json'
const Play = () => {
  const {
    location: {
      state: { level, worldCupId },
    },
  } = useHistory<{ level: number; worldCupId: number }>();

  const [remainingTargets, setRemainingTargets] = useState<Target[]>([]); // 남은 전체 target
  const [currentTargets, setCurrentTargets] = useState<Target[]>([]); // 항상 두개의 target

  const promise = useCallback(() => {
    if (process.env.REACT_APP_ENV !== "local") return api.getWorldCupById(worldCupId, level);
    return Promise.resolve(gameExample)
  }, [level, worldCupId]);

  const { data, isLoading } = useFetch(promise);

  useEffect(() => {
    if (data) {
      setRemainingTargets(data.targets);
      setCurrentTargets([data.targets[0], data.targets[1]]);
    }
  }, [data]);
  // TODO:타겟 선택하면 remaining에서 지우기
  return (
    <>
      {!isLoading && (
      <GameContext.Provider value={{ targets: data?.targets || [] }}>
          {currentTargets.length === 2 && (
            <Template title={data!.title} currentTargets={currentTargets} />
          )}
        </GameContext.Provider>
      )}
    </>
  );
};

export default Play;
