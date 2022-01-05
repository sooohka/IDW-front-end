import React, { createContext, ReactNode, useContext, useMemo, useState } from "react";

interface ModalContextProps {
  openModal: (id: number) => void;
  closeModal: () => void;
  handleModalSubmit: (level: number, id: number) => () => void;
  isModalOpened: boolean;
  worldCupId: number | null;
}
const ModalContext = createContext<ModalContextProps>({
  openModal: () => {},
  closeModal: () => {},
  handleModalSubmit: () => () => {},
  isModalOpened: true,
  worldCupId: null,
});

interface IProps {
  children: ReactNode;
  // TODO:find any function type
  handleModalSubmit: any;
}

function ModalContextProvider({ children, handleModalSubmit }: IProps) {
  const [opened, setOpened] = useState(false);
  const [worldCupId, setWorldCupId] = useState<number | null>(null);

  const closeModal = () => {
    setOpened(false);
  };

  const openModal = (id: number) => {
    console.log(opened);

    setOpened(true);
    setWorldCupId(id);
  };

  const modalContextValue = useMemo(
    () => ({
      openModal,
      closeModal,
      handleModalSubmit,
      isModalOpened: opened,
      worldCupId,
    }),
    [opened, worldCupId],
  );
  return <ModalContext.Provider value={modalContextValue}>{children}</ModalContext.Provider>;
}

const useModalContext = () => useContext(ModalContext);

export { useModalContext };
export default ModalContextProvider;
