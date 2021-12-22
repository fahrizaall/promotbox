import React, { useEffect, useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { user1 } from "../../assets";
import { ReactComponent as SearchIco } from "../../assets/icon/search.svg";
import { ReactComponent as GoogleIco } from "../../assets/icon/icons8-google.svg";
import { useAuth } from "../../contexts/authContext";
import "./header.scss";

const Header = () => {
  const { user, logout, loginWithGoogle } = useAuth();
  const navigate = useNavigate();
  const [showSearch, setShowSearch] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [search, setSearch] = useState("");
  const node = useRef();

  const handleChange = (e) => {
    let value = e.target.value;

    setSearch(value);
  };

  const handleClickOutside = (e) => {
    if (node && node.current && node.current.contains(e.target)) {
      // inside click
      setShowUserMenu(!showUserMenu);
    }
    // outside click
    setShowUserMenu(false);
  };

  const handleLogin = async () => {
    loginWithGoogle().then(navigate("/"));
  };

  const handleLogout = async () => {
    logout().then(navigate("/"));
  };

  // get click outside
  useEffect(() => {
    if (showUserMenu) {
      document.addEventListener("click", handleClickOutside);
    } else {
      document.removeEventListener("click", handleClickOutside);
    }
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [showUserMenu]);

  return (
    <header className="header">
      <Link className="header-title" to="/">
        <img src="/logo231.png" /> PromotBox
      </Link>
      <div className="header-icon">
        <span className="search-icon" onClick={() => setShowSearch(true)}>
          <SearchIco stroke="grey" fill="grey" />
        </span>

        <div className="user" onClick={() => setShowUserMenu(true)}>
          <img src={user.photoURL ? user.photoURL : user1} alt="" className="user-icon profile-picture" />
          <div
            className={`user-menu ${showUserMenu ? "show" : "hide"}`}
            ref={node}
          >
            {user !== null ? (
              <div className="menu-opt">
                <div className="menu-user-info">
                  <img src={user.photoURL ? user.photoURL : user1} alt="user picture" className="menu-user-info-pp profile-picture" />
                  <span onClick={()=>navigate("/me")}>{user.displayName}</span>
                </div>
                <Link to="/me">Poster Saya</Link>
                <Link to="/create-post">Upload Poster</Link>
                {/* <hr className="solid" /> */}
                <p className="menu-logout" onClick={handleLogout}>Logout</p>
              </div>
            ) : (
              <div onClick={handleLogin} className="menu-opt-login">
                <GoogleIco stroke="lightgray" fill="lightgray" />
                <p>Login with google</p>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className={`search ${showSearch ? "show" : "hide"}`}>
        <form action="" className="search-form">
          <input
            type="text"
            className="search-field"
            placeholder="Search..."
            onChange={handleChange}
          />
        </form>
        <p className="cancle-btn" onClick={() => setShowSearch(false)}>
          Cancel
        </p>
      </div>
    </header>
  );
};

export default Header;
