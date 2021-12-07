import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store";
import actions from "../../store/worldCup/worldCupActions";

const usePlayReducer = () => {
  const dispatch = useDispatch();
  const worldCupState = useSelector((state: RootState) => state.worldCupState);

  const clearCurrentTargets = useCallback(() => {
    dispatch(actions.clearCurrentTargets());
  }, [dispatch]);

  const clearSelectedTargets = useCallback(() => {
    dispatch(actions.clearSelectedTargets());
  }, [dispatch]);

  const setTargets = useCallback(
    ({ targets }: { targets: Target[] }) => {
      dispatch(actions.setTargets({ targets }));
    },
    [dispatch],
  );
  const selectTarget = useCallback(
    ({ targetId }: { targetId: number }) => {
      dispatch(actions.selectTarget({ targetId }));
    },
    [dispatch],
  );
  const setCurrentTargetsIds = useCallback(
    ({ currentTargetIds }: { currentTargetIds: [number, number] }) => {
      dispatch(actions.setCurrentTargetsIds({ currentTargetIds }));
    },
    [dispatch],
  );

  const setLevel = useCallback(
    ({ level }: { level: number }) => {
      dispatch(actions.setLevel({ level }));
    },
    [dispatch],
  );

  const setRemainingTargetIds = useCallback(
    ({ targetIds }: { targetIds: number[] }) => {
      dispatch(actions.setRemainingTargetIds({ targetIds }));
    },
    [dispatch],
  );
  return {
    worldCupState,
    clearCurrentTargets,
    clearSelectedTargets,
    setTargets,
    selectTarget,
    setCurrentTargetsIds,
    setLevel,
    setRemainingTargetIds,
  };
};

export default usePlayReducer;
