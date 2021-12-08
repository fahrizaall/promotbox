import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ReactComponent as SearchIco } from "../../assets/icon/search.svg";
import "./header.scss";

const Header = () => {
  const navigate = useNavigate();
  const [showSearch, setShowSearch] = useState(false);

  return (
    <header className="header">
      <h1 className="header-title" onClick={() => navigate("/")}>
        PromotBox
      </h1>
      <div className="header-icon">
        <span className="search-icon" onClick={() => setShowSearch(true)}>
          <SearchIco stroke="grey" fill="grey" />
        </span>
      </div>

      <div className={`search ${showSearch ? "show" : "hide"}`}>
        <form action="" className="search-form">
          <input type="text" className="search-field" placeholder="Search..." />
        </form>
        <p className="cancle-btn" onClick={() => setShowSearch(false)}>
          cancle
        </p>
      </div>
    </header>
  );
};

export default Header;
