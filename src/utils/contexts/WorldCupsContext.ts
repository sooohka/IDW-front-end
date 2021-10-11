import { createContext } from "react";

interface IProps {
  worldCups: WorldCup[] | null;
}

export default createContext<IProps>({ worldCups: null });
