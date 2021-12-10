import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../../App";
import { ReactComponent as SearchIco } from "../../assets/icon/search.svg";
import "./header.scss";

const Header = () => {
  const context = useContext(UserContext);
  const navigate = useNavigate();
  const [showSearch, setShowSearch] = useState(false);
  const [search, setSearch] = useState("");

  const handleChange = (e) => {
    let value = e.target.value;

    setSearch(value);
  };

  return (
    <header className="header">
      <h1 className="header-title" onClick={() => navigate("/")}>
        PromotBox
      </h1>
      <div className="header-icon">
        <span className="search-icon" onClick={() => setShowSearch(true)}>
          <SearchIco stroke="grey" fill="grey" />
        </span>
        {context.isLogin ? (
          <Link to="/create-post" className="btn btn-create-post">
            createpost
          </Link>
        ) : (
          <div className="auth-btn">
            <Link to="/login" className="btn btn-login">
              login
            </Link>
            <Link to="/login" className="btn btn-register">
              register
            </Link>
          </div>
        )}
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
          cancle
        </p>
      </div>
    </header>
  );
};

export default Header;
