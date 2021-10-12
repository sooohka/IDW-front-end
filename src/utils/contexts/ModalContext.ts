import { createContext } from "react";

interface IProps {
  handleModalClose: () => void;
  handleModalSubmit: (level: number) => () => void;
  isModalOpened: boolean;
}
export default createContext<IProps>({
  handleModalClose: () => {},
  handleModalSubmit: () => () => {},
  isModalOpened: false,
});
