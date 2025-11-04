import { MainProvider } from "providers/MainProvider";
import Router from "routes";
import "styles/index.scss";

function App() {
  return (
    <MainProvider.Provider>
      <Router />
    </MainProvider.Provider>
  );
}

export default App;
