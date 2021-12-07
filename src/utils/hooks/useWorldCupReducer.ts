import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store";
import worldCupThunks from "../../store/worldCup/worldCupThunks";

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
  return {
    worldCupState,
    initializeWorldCup,
    selectTarget,
  };
};

export default useWorldCupReducer;
