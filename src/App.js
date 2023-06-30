import "./App.scss";
import store from "./store/store";
import { Dashboard } from "./components/Dashboard";
import { Provider } from "react-redux";

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <Dashboard />
      </div>
    </Provider>
  );
}

export default App;
