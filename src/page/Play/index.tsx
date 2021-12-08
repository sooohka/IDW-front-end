import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import useWorldCupReducer from "../../utils/hooks/useWorldCupReducer";
import Template from "./template";

const Play: React.FC = () => {
  const {
    location: {
      state: { level, worldCupId },
    },
  } = useHistory<{ level: number; worldCupId: number }>();

  const {
    worldCupState: { title, winnerId, targets },
    initializeWorldCup,
  } = useWorldCupReducer();
  const [winner, setWinner] = useState<Target>();
  const history = useHistory();

  // 마운트시 실행
  useEffect(() => {
    console.log(level);

    initializeWorldCup({ level, worldCupId });
  }, [initializeWorldCup, level, worldCupId]);

  useEffect(() => {
    if (winnerId) setWinner(targets.find((target) => target.id === winnerId));
  }, [targets, winnerId]);

  useEffect(() => {
    if (winner) {
      alert(`winner is ${winner.name}`);
      history.push("/");
    }
  }, [history, winner]);

  return <Template title={title} />;
};

export default Play;
