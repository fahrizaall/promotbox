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

  const handleSearch = () => {
    if (search && search != "") {
      navigate("/cari/" + search);
    }
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
        <img src="/logotext.svg" />
      </Link>
      <div className="header-icon">
        <span className="search-icon" onClick={() => setShowSearch(true)}>
          <SearchIco stroke="grey" fill="grey" />
        </span>

        <div className="user" onClick={() => setShowUserMenu(true)}>
          <img
            src={user && user.photoURL ? user.photoURL : user1}
            alt=""
            className="user-icon profile-picture"
          />
          <div
            className={`user-menu ${showUserMenu ? "show" : "hide"}`}
            ref={node}
          >
            {user !== null ? (
              <div className="menu-opt">
                <div className="menu-user-info" onClick={() => navigate("/me")}>
                  <img
                    src={user && user.photoURL ? user.photoURL : user1}
                    alt="user picture"
                    className="menu-user-info-pp profile-picture"
                  />
                  <span onClick={() => navigate("/me")}>
                    {user.displayName}
                  </span>
                </div>
                <Link to="/me">Poster Saya</Link>
                <Link to="/create-post">Upload Poster</Link>
                <p className="menu-logout" onClick={handleLogout}>
                  Logout
                </p>
              </div>
            ) : (
              <div onClick={handleLogin} className="menu-opt-login">
                <GoogleIco stroke="lightgray" fill="lightgray" />
                <p>Login with Google</p>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className={`search ${showSearch ? "show" : "hide"}`}>
        <form action="" className="search-form">
          <div className="search-field-parent">
            <input
              type="text"
              className="search-field"
              placeholder="Search..."
              onChange={handleChange}
            />
            <button onClick={handleSearch} className="search-btn">
              <div>
                <SearchIco stroke="white" fill="white" width={20} height={20} />
              </div>
              <span>Cari</span>
            </button>
          </div>
          <button className="cancel-btn" onClick={() => setShowSearch(false)}>
            Batal
          </button>
        </form>
      </div>
    </header>
  );
};

export default Header;
