import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.scss";
import Detail from "./pages/detail";
import ErrorNotFound from "./pages/error/404";
import Home from "./pages/home";
import Auth from "./pages/auth";
import CreatePost from "./pages/createPost";
import { AuthProvider } from "./contexts/authContext";
import Me from "./pages/me";
import LoginVerify from "./pages/loginVerify";
import Profile from "./pages/profile";

function App() {
  return (
    <AuthProvider>
      <div className="App">
        <BrowserRouter>
          <Routes>
            <Route path="/create-post" element={<CreatePost />} />
            <Route path="/poster/:id" element={<Detail />} />
            <Route path="/me" element={<Me />} />
            <Route path="/profile/:id" element={<Profile />} />
            <Route path="/login" element={<Auth />} />
            <Route path="/" element={<Home />}>
              
            </Route>
            <Route path="kategori/:tag" element={<Home />} />
            <Route path="cari/:searchquery" element={<Home />} />
            <Route path="/verify-login" element={<LoginVerify />} />
            <Route path="*" element={<ErrorNotFound />} />
          </Routes>
        </BrowserRouter>
      </div>
    </AuthProvider>
  );
}

export default App;
