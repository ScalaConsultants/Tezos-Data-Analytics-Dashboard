import React from "react";
import { Route } from "react-router";
import Transactions from "../containers/Transactions/Transactions";
import Charts from "../containers/Charts/Charts";
import Home from "../containers/Home/Home";
import LiveChart from "../containers/LiveChart/LiveChart";
import LiveChart2 from "../containers/LiveChart2/LiveChart2";

export default () => {
  let routes =
    <div className="Main">
      <Route exact path="/" component={Home} />
      <Route exact path="/transactions" component={Transactions} />
      <Route exact path="/charts" component={Charts} />
      <Route exact path="/top-seller" component={LiveChart} />
      <Route exact path="/top-buyer" component={LiveChart2} />
    </div>;

  return (
    routes
  );
}
