import React, { useCallback, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import api from "../../api/api";
import GameContext from "../../utils/contexts/GameContext";
import useFetch from "../../utils/hooks/useFetch";
import useMount from "../../utils/hooks/useMount";
import { getRandomValues } from "../../utils/lib/array";
import Template from "./template";

/**
 * 1. Mount시 서버로부터 게임정보(타겟들)를 받아온다. (16개)
 * 2. 첫번째 게임사이클 돌린다. (현재 선택된 타겟들 8개)
 * 3. 두번째 게임 사이클 돌린다.(현재 선택된 타겟들 4개)
 * 4. 세번쨰 게임 사이클 돌린다. (현재 선택된 타겟들 2개)
 * 5. 결과가 나온다
 * 6. 서버에 결과 보낸다
 * */

const Play: React.FC = () => {
  const {
    location: {
      state: { level, worldCupId },
    },
  } = useHistory<{ level: number; worldCupId: number }>();
  const promise = useCallback(() => api.getWorldCupById(worldCupId, level), [level, worldCupId]);
  const { data, isLoading } = useFetch(promise);
  const { isMount } = useMount();

  const [targets, setTargets] = useState<Target[]>([]);
  const [remainingTargetsId, setRemainingTargetsId] = useState<number[]>([]);
  const [currentTargetsId, setCurrentTargetsId] = useState<number[]>([]);
  const [selectedTargetsId, setSelectedTargetsId] = useState<number[]>([]);

  // mount시에 렌더링
  useEffect(() => {
    if (data) {
      setTargets(data.targets);
      setRemainingTargetsId(data.targets.map((target) => target.id));
    }
  }, [data, setTargets]);

  useEffect(() => {
    if (!targets.length) return;
    currentTargetsId.forEach((id) => {
      setRemainingTargetsId((prev) => prev.filter((v) => v !== id));
    });
    const ids = getRandomValues(remainingTargetsId, 2);
    setCurrentTargetsId(ids);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedTargetsId, targets.length]);

  useEffect(() => {
    if (
      currentTargetsId.length === 0 &&
      remainingTargetsId.length === 0 &&
      selectedTargetsId.length !== 0
    ) {
      setRemainingTargetsId(selectedTargetsId);
      setSelectedTargetsId([]);
    }
  }, [currentTargetsId.length, remainingTargetsId.length, selectedTargetsId, targets.length]);
  const handleTargetClick = (targetId: number) => () => {
    setSelectedTargetsId((prev) => [...prev, targetId]);
  };

  return (
    <>
      {!isLoading && data && (
        <GameContext.Provider value={{ targets, currentTargetsId, handleTargetClick }}>
          <Template title={data.title} />
        </GameContext.Provider>
      )}
    </>
  );
};

export default Play;
