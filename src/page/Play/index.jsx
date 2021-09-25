import axios from "axios";
import React, { useCallback } from "react";
import { useHistory, useParams } from "react-router-dom";
import gameExample from "../../assets/temp/gameExample.json";
import GameContext from "../../utils/contexts/GameContext";
import useFetch from "../../utils/hooks/useFetch";
import Template from "./template";

const Play = () => {
  const { id: worldCupId } = useParams();
  const {
    location: {
      state: { level },
    },
  } = useHistory();

  const promise = useCallback(() => {
    if (process.env.REACT_APP_ENV) axios.get(`/worldcups/${worldCupId}?level=${level}`);
    return new Promise((res, rej) => {
      setTimeout(() => {
        res(gameExample);
      }, [100]);
    });
  }, [level, worldCupId]);

  const { data, isLoading } = useFetch(promise);

  return (
    <>
      {!isLoading && (
        <GameContext.Provider value={{ targets: data }}>
          <Template />
        </GameContext.Provider>
      )}
    </>
  );
};

export default Play;
