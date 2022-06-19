import { Switch, Route } from "react-router-dom";

/** Views */
import Coins from "./views/Coins";
import Coin from "./views/Coin";

function AppRouter () {
  return (
    <Switch>
      <Route path={'/'} exact component={Coins} />
      <Route path={'/:coinId?'} exact component={Coin} />
    </Switch>
  );
}

export default AppRouter;
