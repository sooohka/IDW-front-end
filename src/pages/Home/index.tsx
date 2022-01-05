import WorldCupApi from "@Api/WorldCupApi";
import ModalContextProvider from "@Contexts/ModalContextProvider";
import useFetch from "@Hooks/useFetch";
import React, { useCallback } from "react";
import { useHistory } from "react-router-dom";
import Template from "./template";

function Home() {
  const { data: worldCups, isLoading } = useFetch(WorldCupApi.getWorldCups);

  const history = useHistory();
  const handleModalSubmit = useCallback(
    (level: number, id: number) => () => {
      if (!id) throw new Error("선택된 월드컵은 존재하지 않습니다");
      history.push(`/play/${id}`, { level, worldCupId: id });
      // 가서 월드컵 정보 불러오기
    },
    [history],
  );

  return (
    <ModalContextProvider handleModalSubmit={handleModalSubmit}>
      {isLoading || (worldCups && <Template worldCups={worldCups} />)}
    </ModalContextProvider>
  );
}

export default Home;
