import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.scss";
import Detail from "./pages/detail";
import Home from "./pages/home";
import Auth from "./pages/auth";
import CreatePost from "./pages/createPost";
import { createContext, useState } from "react";

export const UserContext = createContext();

function App() {
  const tag = ["olahraga", "desain", "sastra", "kreatif", "programming"];

  const [context, setContext] = useState({
    isLogin: true,
    tag: tag,
  });

  return (
    <UserContext.Provider value={context}>
      <div className="App">
        <BrowserRouter>
          <Routes>
            <Route path="/create-post" element={<CreatePost />} />
            <Route path="/poster" element={<Detail />} />
            <Route path="/login" element={<Auth />} />
            <Route path="/" element={<Home context={UserContext} />} />
          </Routes>
        </BrowserRouter>
      </div>
    </UserContext.Provider>
  );
}

export default App;
