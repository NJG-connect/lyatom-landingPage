import React from "react";
import Header from "../scenes/Header";
import Features from "../scenes/Features";
import Interressed from "../scenes/Interressed";
import Menu from "../scenes/Menu";
import Footer from "../scenes/Footer";
import Packs from "../scenes/Packs";

function HomeScreen() {
  return (
    <div className="home">
      <Menu />
      <Header />
      <Features />
      <Packs />
      <Interressed />
      <Footer />
    </div>
  );
}

export default HomeScreen;
