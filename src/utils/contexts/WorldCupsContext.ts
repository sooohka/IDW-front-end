import { createContext } from "react";

interface IProps {
  worldCups: WorldCup[];
}

export default createContext<IProps>({ worldCups: [] });
