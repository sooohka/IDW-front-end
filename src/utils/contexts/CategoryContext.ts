import { createContext } from "react";

interface IProps {
  categories: Category[];
}

export default createContext<IProps>({ categories: [] });
