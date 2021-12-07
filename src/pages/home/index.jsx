import React from "react";
import { Header, Footer } from "../../components";
import "./home.scss";

const Home = () => {
  return (
    <div className="home-container">
      <Header />
      <div className="tag">taggg</div>
      <main>
        <div className="pin-container">
          <div className="card card-small"></div>
          <div className="card card-small"></div>
          <div className="card card-medium"></div>
          <div className="card card-large"></div>
          <div className="card card-medium"></div>
          <div className="card card-small"></div>
          <div className="card card-small"></div>
          <div className="card card-medium"></div>
          <div className="card card-large"></div>
          <div className="card card-medium"></div>
          <div className="card card-large"></div>
          <div className="card card-large"></div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Home;
