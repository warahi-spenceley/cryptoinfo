import AppRouter from "./AppRouter";
import StandardPage from './components/StandardPage';
import FavouritesProvider from "./context/FavouritesProvider";

const App = () => {
  return (
    <FavouritesProvider>
      <StandardPage 
        title="Crypto Info"
        subtitle="Current information on the global cryptocurrency market"
      >
        <AppRouter />
      </StandardPage>
    </FavouritesProvider>
  );
};

export default App;