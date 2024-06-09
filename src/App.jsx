import AppRouter from "./Router";
import QueryClientSetup from "./QueryClientSetup";
import "./App.css";

function App() {
  return (
    <QueryClientSetup>
      <AppRouter />
    </QueryClientSetup>
  );
}

export default App;
