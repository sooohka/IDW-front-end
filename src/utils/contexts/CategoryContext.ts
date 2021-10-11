import { createContext } from "react";

interface IProps {
  categories: Category[] | null;
}

export default createContext<IProps>({ categories: null });
