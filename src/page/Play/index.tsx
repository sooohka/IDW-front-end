import React, { useCallback, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { WorldCupApi } from "../../api";
import worldCupThunks from "../../store/worldCup/worldCupThunks";
import useFetch from "../../utils/hooks/useFetch";
import Template from "./template";

const Play: React.FC = () => {
  const {
    location: {
      state: { level, worldCupId },
    },
  } = useHistory<{ level: number; worldCupId: number }>();

  const promise = useCallback(
    () => WorldCupApi.getWorldCupById({ worldCupId, level }),
    [level, worldCupId],
  );

  const { data, isLoading } = useFetch(promise);
  const [winner, setWinner] = useState<Target>();
  const history = useHistory();

  // 마운트시 실행
  useEffect(() => {
    if (data)
      worldCupThunks.initializeWorldCup({ level: data.targetCounts, targets: data.targets });
  }, [data]);
  // 타겟이 클릭됬을때만 실행
  useEffect(() => {}, []);

  useEffect(() => {
    if (winner) {
      alert(`winner is ${winner.name}`);
      history.push("/");
    }
  }, [history, winner]);

  return <>{!isLoading && data && <Template title={data.title} />}</>;
};

export default Play;
