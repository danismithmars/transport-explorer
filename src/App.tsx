import { Provider } from "react-redux";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { store } from "./store";
import Home from "./pages/Home";  // Import Home Page
import "./styles/global.scss";

function App() {
  return (
    <BrowserRouter>
      <Provider store={store}>  {/* Wrap the app with Redux Provider */}
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </Provider>
    </BrowserRouter>
  );
}

export default App;
