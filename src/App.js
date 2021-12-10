import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Detail from "./pages/detail";
import ErrorNotFound from "./pages/error/404";
import Home from "./pages/home";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/poster" element={<Detail />} />
            <Route path=":id" element={<Detail />} />

          <Route path="/" element={<Home />} />
          <Route path="*" element={<ErrorNotFound />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
