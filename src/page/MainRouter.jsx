import { Route, Switch } from "react-router-dom";
import React from "react";
import Home from "./Home";
import PageNotFound from "./404page";
import Play from "./Play";

const MainRouter = () => {
  return (
    <Switch>
      <Route exact path="/" component={Home} />
      <Route path="/play/:id" component={Play} />
      <Route component={PageNotFound} />
    </Switch>
  );
};

export default MainRouter;
