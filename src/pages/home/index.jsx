import React, { useEffect } from "react";
import { Header, Footer } from "../../components";
import { poster1, poster2, poster3 } from "../../assets";
import "./home.scss";
import { Link } from "react-router-dom";

const Home = () => {
  // get random class to define card size
  const randomCardSize = () => {
    let cardClass = ["card-small", "card-medium", "card-large"];
    // Returns a random integer from 0 to 2:
    let rand = Math.floor(Math.random() * 2) + 0;

    return cardClass[rand];
  };

  useEffect(() => {
    console.log(randomCardSize());
  });

  return (
    <div className="home-container">
      <Header />
      <div className="tag">
        <div className="fix-item-container">
          <p className="tag-item selected">all</p>
        </div>
        <div className="tag-overflow">
          <p className="tag-item">Design</p>
          <p className="tag-item">Drawing</p>
          <p className="tag-item">Programming</p>
          <p className="tag-item">Writing</p>
        </div>
      </div>
      <main>
        <div className="poster-container">
          <div className={`card ${randomCardSize()}`}>
            <Link to="/poster">
              <img className="img" src={poster2} alt="" />
            </Link>
          </div>
          <div className={`card ${randomCardSize()}`}>
            <Link to="/poster">
              <img className="img" src={poster1} alt="" />
            </Link>
          </div>
          <div className={`card ${randomCardSize()}`}>
            <Link to="/poster">
              <img className="img" src={poster2} alt="" />
            </Link>
          </div>
          <div className={`card ${randomCardSize()}`}>
            <Link to="/poster">
              <img className="img" src={poster3} alt="" />
            </Link>
          </div>
          <div className={`card ${randomCardSize()}`}>
            <Link to="/poster">
              <img className="img" src={poster1} alt="" />
            </Link>
          </div>
          <div className={`card ${randomCardSize()}`}>
            <Link to="/poster">
              <img className="img" src={poster1} alt="" />
            </Link>
          </div>
          <div className={`card ${randomCardSize()}`}>
            <Link to="/poster">
              <img className="img" src={poster2} alt="" />
            </Link>
          </div>
          <div className={`card ${randomCardSize()}`}>
            <Link to="/poster">
              <img className="img" src={poster3} alt="" />
            </Link>
          </div>
          <div className={`card ${randomCardSize()}`}>
            <Link to="/poster">
              <img className="img" src={poster3} alt="" />
            </Link>
          </div>
          <div className={`card ${randomCardSize()}`}>
            <Link to="/poster">
              <img className="img" src={poster1} alt="" />
            </Link>
          </div>
          <div className={`card ${randomCardSize()}`}>
            <Link to="/poster">
              <img className="img" src={poster1} alt="" />
            </Link>
          </div>
          <div className={`card ${randomCardSize()}`}>
            <Link to="/poster">
              <img className="img" src={poster2} alt="" />
            </Link>
          </div>
          <div className={`card ${randomCardSize()}`}>
            <Link to="/poster">
              <img className="img" src={poster3} alt="" />
            </Link>
          </div>
          <div className={`card ${randomCardSize()}`}>
            <Link to="/poster">
              <img className="img" src={poster1} alt="" />
            </Link>
          </div>
          <div className={`card ${randomCardSize()}`}>
            <Link to="/poster">
              <img className="img" src={poster1} alt="" />
            </Link>
          </div>
          <div className={`card ${randomCardSize()}`}>
            <Link to="/poster">
              <img className="img" src={poster2} alt="" />
            </Link>
          </div>
          <div className={`card ${randomCardSize()}`}>
            <Link to="/poster">
              <img className="img" src={poster1} alt="" />
            </Link>
          </div>
          <div className={`card ${randomCardSize()}`}>
            <Link to="/poster">
              <img className="img" src={poster1} alt="" />
            </Link>
          </div>
          <div className={`card ${randomCardSize()}`}>
            <Link to="/poster">
              <img className="img" src={poster2} alt="" />
            </Link>
          </div>
          <div className={`card ${randomCardSize()}`}>
            <Link to="/poster">
              <img className="img" src={poster3} alt="" />
            </Link>
          </div>
          <div className={`card ${randomCardSize()}`}>
            <Link to="/poster">
              <img className="img" src={poster3} alt="" />
            </Link>
          </div>
          <div className={`card ${randomCardSize()}`}>
            <Link to="/poster">
              <img className="img" src={poster1} alt="" />
            </Link>
          </div>
          <div className={`card ${randomCardSize()}`}>
            <Link to="/poster">
              <img className="img" src={poster1} alt="" />
            </Link>
          </div>
          <div className={`card ${randomCardSize()}`}>
            <Link to="/poster">
              <img className="img" src={poster2} alt="" />
            </Link>
          </div>
          <div className={`card ${randomCardSize()}`}>
            <Link to="/poster">
              <img className="img" src={poster3} alt="" />
            </Link>
          </div>
          <div className={`card ${randomCardSize()}`}>
            <Link to="/poster">
              <img className="img" src={poster1} alt="" />
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Home;
