import CategoryContextProvider from "@Contexts/CategoryContextProvider";
import React from "react";

function AppProvider({ children }: { children: React.ReactNode }) {
  return <CategoryContextProvider>{children}</CategoryContextProvider>;
}

export default AppProvider;
