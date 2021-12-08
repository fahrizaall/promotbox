import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Detail from "./pages/detail";
import Home from "./pages/home";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/poster" element={<Detail />} />

          <Route path="/" element={<Home />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
