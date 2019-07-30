import React from "react";
import {Route} from "react-router";
import Transactions from "../containers/Transactions/Transactions";
import Home from "../containers/Home/Home";

export default () => {

  let routes =
    <div className="Main">
      <Route exact path="/" component={Home} />
      <Route exact path="/transactions" component={Transactions} />
    </div>;

  return (
    routes
  );
}
