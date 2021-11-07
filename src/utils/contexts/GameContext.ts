import { createContext } from "react";

interface IProps {
  targets: Target[];
  handleTargetClick: (targetId: number) => (e: React.MouseEvent) => void;
  currentTargetsId: number[];
}
export default createContext<IProps>({
  targets: [],
  currentTargetsId: [],
  handleTargetClick: () => () => {},
});
