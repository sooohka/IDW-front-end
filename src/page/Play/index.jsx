import axios from "axios";
import React, { useCallback, useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import gameExample from "../../assets/temp/gameExample.json";
import GameContext from "../../utils/contexts/GameContext";
import useFetch from "../../utils/hooks/useFetch";
import Template from "./template";

const Play = () => {
  const {
    location: {
      state: { level, worldCupId },
    },
  } = useHistory();

  const [remainingTargets, setRemainingTargets] = useState([]); // 남은 전체 target
  const [currentTargets, setCurrentTargets] = useState([]); // 항상 두개의 target

  const promise = useCallback(() => {
    if (process.env.REACT_APP_ENV !== "local") return axios.get(`/worldcups/${worldCupId}?level=${level}`);
    return new Promise((res) => {
      setTimeout(() => {
        res(gameExample);
      }, [100]);
    });
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
        <GameContext.Provider value={{ targets: data }}>
          {currentTargets.length === 2 && <Template title={data.title} currentTargets={currentTargets} />}
        </GameContext.Provider>
      )}
    </>
  );
};

export default Play;
