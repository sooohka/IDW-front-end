import { createContext } from "react";

interface IProps {
  targets: Target[] | null;
}
export default createContext<IProps>({ targets: null });
