import { Switch, Route } from "react-router-dom";
import { SnackbarProvider } from 'notistack';

/** Views */
import Coins from "./views/Coins";
import Coin from "./views/Coin";

function AppRouter () {
  return (
    <SnackbarProvider maxSnack={1}>
      <Switch>
        <Route path={'/'} exact component={Coins} />
        <Route path={'/:coinId?'} exact component={Coin} />
      </Switch>
    </SnackbarProvider>
  );
}

export default AppRouter;
