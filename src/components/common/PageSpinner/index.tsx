import React from "react";
import Spinner from "../../../assets/icons/spinner.svg";

const PageSpinner: React.FC = () => (
  <Spinner data-testid='spinner' style={{ margin: "auto" }} width={200} height={200} />
);

export default PageSpinner;
