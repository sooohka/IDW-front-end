import { createContext } from "react";

interface IProps {
  targets: Target[];
}
export default createContext<IProps>({ targets: [] });
