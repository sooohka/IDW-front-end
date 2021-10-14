import { Route, Switch } from "react-router-dom";
import React from "react";
import Home from "./Home";
import PageNotFound from "./404page";
import Play from "./Play";
import Create from "./Create";

const MainRouter: React.FC = () => (
  <Switch>
    <Route exact path='/' component={Home} />
    <Route path='/play/:id' component={Play} />
    <Route path='/create' component={Create} />
    <Route component={PageNotFound} />
  </Switch>
);

export default MainRouter;
