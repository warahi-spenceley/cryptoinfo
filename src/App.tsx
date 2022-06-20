import AppRouter from "./AppRouter";
import StandardPage from './components/StandardPage';
import WatchlistProvider from "./context/WatchlistProvider";

const App = () => {
  return (
    <WatchlistProvider>
      <StandardPage 
        title="Crypto Info"
        subtitle="Current information on the global cryptocurrency market"
      >
        <AppRouter />
      </StandardPage>
    </WatchlistProvider>
  );
};

export default App;