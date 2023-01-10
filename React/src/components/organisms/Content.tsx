import React, { useState } from "react";
import { Route, Routes } from "react-router-dom";
import { useGlobalContext } from "../../contexts/GlobalContext";
import AutoSuggests from "../../pages/Recherche";
import AppelServ from "../../pages/Recherche";
import Home from "../../pages/Home";
import Horraires, { ingredients } from "../../pages/Recettes";
import Menu from "../../pages/TableauDeBord";
import Recettes from "../../pages/Recettes";
import TableauDeBord from "../../pages/TableauDeBord";
import AddINgredOrRec from "../../pages/AddINgredOrRec";
import TableSelection from "../molecules/TableSelection";
import Details from "../molecules/Details";


const Content = () => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const {listIngredietns,listIngredietnsForRecette,setListIngredients, count,incrementCount,setListSelectionRecette } = useGlobalContext();
  const [listIngr,setListIngred]=useState<ingredients[]>(listIngredietns);
  const [details,setDetails]=useState<string>("")
  console.log("je suis la"+details)
  return (
    <Routes>
      {/* <Route path="" element={<MenuPage incrementCount={incrementCount}Z/>} /> */}
      <Route path="panier" element={<div>Mon panier</div>} />
      <Route path="/" element={<Home/>} />
      <Route path="/Dashboard" element={<TableauDeBord incrementCount={incrementCount} setListIngredients={setListIngredients} listIngredietns={listIngr}></TableauDeBord>} />
      <Route path="/Recettes" element={<Recettes setDetails={setDetails} value={count} listIngredients={listIngredietns}/>} />
      <Route path="/Details" element={<Details details={details}></Details>} /> 
      <Route path="/AddINgredOrRec" element={<AddINgredOrRec></AddINgredOrRec>} />       
    </Routes>
  );
};

export default Content;
