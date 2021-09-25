import React, { useCallback, useContext, useState } from "react";
import ModalContext from "../../../utils/contexts/ModalContext";
import Template from "./template";

const LevelModal = () => {
  const { handleModalSubmit, handleModalClose, isLevelModalOpened } = useContext(ModalContext);
  const [level, setLevel] = useState(4);

  const handleLevelChange = useCallback((e) => {
    const lv = e.target.value;
    console.log(lv);

    setLevel(lv);
  });
  return (
    <>
      {isLevelModalOpened && (
        <Template level={level} handleLevelChange={handleLevelChange} handleModalClose={handleModalClose} handleModalSubmit={handleModalSubmit}></Template>
      )}
    </>
  );
};

export default LevelModal;
