import { MainProvider } from "providers/MainProvider";
import Router from "routes";

function App() {
  return (
    <MainProvider.Provider>
      <Router />
    </MainProvider.Provider>
  );
}

export default App;
