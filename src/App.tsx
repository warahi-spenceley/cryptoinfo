import AppRouter from "./AppRouter";
import StandardPage from './components/StandardPage';

const App = () => {
  return (
    <StandardPage 
      title="Crypto Info"
      subtitle="Current information on the global cryptocurrency market"
    >
      <AppRouter />
    </StandardPage>
  );
};

export default App;