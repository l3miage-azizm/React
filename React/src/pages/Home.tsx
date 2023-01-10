import React from "react";
import { Link } from "react-router-dom";
import "./Home.css"

import mzfood from "./mzfood.png"

const Home= () => {
  return (
      <>
      <div className="home">
      <div className="textBienvenue">
        <br></br>
      <h3>Bienvenue dans H COOKING !</h3> <br></br>
      <br></br>
      <h6>Ici vous pouvez sélectionner les ingrédients que vous avez et en quelques clics, nous vous proposerons une liste de recettes de cuisine adaptée à vos possibilités !
      </h6>
      </div>
      </div>
      </>

  );
};

export default Home;