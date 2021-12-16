import { useState } from "react";

const useModal = () => {
  const [opened, setOpened] = useState(false);
  const closeModal = () => {
    setOpened(false);
  };
  const openModal = () => {
    setOpened(true);
  };
  return { openModal, closeModal, opened };
};

export default useModal;
