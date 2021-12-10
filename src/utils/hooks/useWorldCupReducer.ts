import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store";
import worldCupThunks from "../../store/worldCup/worldCupThunks";
import worldCupActions from "../../store/worldCup/worldCupActions";

const useWorldCupReducer = () => {
  const dispatch = useDispatch();
  const worldCupState = useSelector((state: RootState) => state.worldCupState);

  const initializeWorldCup = useCallback(
    ({ level, worldCupId }: { level: number; worldCupId: number }) => {
      dispatch(worldCupThunks.initializeWorldCup({ level, worldCupId }));
    },
    [dispatch],
  );
  const selectTarget = useCallback(
    ({ targetId }: { targetId: number }) => {
      dispatch(worldCupThunks.selectTarget({ targetId }));
    },
    [dispatch],
  );

  const reset = useCallback(() => {
    dispatch(worldCupActions.reset());
  }, [dispatch]);
  return {
    worldCupState,
    initializeWorldCup,
    selectTarget,
    reset,
  };
};

export default useWorldCupReducer;
