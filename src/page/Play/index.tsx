import React, { useCallback, useEffect, useReducer, useState } from "react";
import { useHistory } from "react-router-dom";
import api from "../../api/api";
import GameContext from "../../utils/contexts/GameContext";
import useFetch from "../../utils/hooks/useFetch";
import Template from "./template";
import playReducer, {
  initialState,
  clearCurrentTargets,
  clearSelectedTargets,
  initializeState,
  selectTarget,
  setCurrentTargetsIds,
  setLevel,
  setRemainingTargetIds,
} from "./PlayReducer";

const Play: React.FC = () => {
  const {
    location: {
      state: { level, worldCupId },
    },
  } = useHistory<{ level: number; worldCupId: number }>();

  const promise = useCallback(() => api.getWorldCupById(worldCupId, level), [level, worldCupId]);

  const { data, isLoading } = useFetch(promise);
  const [state, dispatch] = useReducer(playReducer, initialState);
  const [winner, setWinner] = useState<Target>();
  const history = useHistory();

  // 마운트시 실행
  useEffect(() => {
    if (data) {
      dispatch(initializeState(data.targets, data.targets.length));
    }
  }, [data]);

  // 타겟이 클릭됬을때만 실행
  useEffect(() => {
    if (state.selectedTargetIds.length === 0) return;
    if (state.level / 2 === state.selectedTargetIds.length) {
      if (state.selectedTargetIds.length === 1) {
        setWinner(state.targets.find((target) => target.id === state.selectedTargetIds[0]));
        return;
      }
      dispatch(setLevel(state.level / 2));
      dispatch(setRemainingTargetIds(state.selectedTargetIds));
      dispatch(clearSelectedTargets());
      dispatch(setCurrentTargetsIds());
    } else {
      dispatch(clearCurrentTargets());
      dispatch(setCurrentTargetsIds());
    }
  }, [state.level, state.selectedTargetIds, state.targets]);

  useEffect(() => {
    if (winner) {
      alert(`winner is ${winner.name}`);
      history.push("/");
    }
  }, [history, winner]);

  const handleTargetClick = (targetId: number) => () => {
    dispatch(selectTarget(targetId));
  };
  console.log(state);

  return (
    <>
      {!isLoading && data && (
        <GameContext.Provider
          value={{
            targets: state.targets,
            currentTargetsId: state.currentTargetIds,
            handleTargetClick,
          }}
        >
          <Template title={data.title} />
        </GameContext.Provider>
      )}
    </>
  );
};

export default Play;
