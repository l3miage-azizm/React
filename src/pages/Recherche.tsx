import "./Recherche.css";
import { useEffect, useState } from "react";
import { ingredients } from "./Recettes";
import IngredientCard from "../components/molecules/IngredientCard";

import imag from "./search.png"
import RecetteCard, { RectteCardProps } from "../components/molecules/RecetteCard";

export default function Recherche(props: {listeData: any, setListIngredients: (x: ingredients) => void, setCountPlus: () => void, setCountMoins: () => void, filter: string }) {
  const [isSelect,setIselect]=useState<boolean>(false)
  const [searchTerm, setSearchTerm] = useState("");
  let listToDisplay = props.listeData;
  const handleChange = (e: any) => {
    setSearchTerm(e.target.value);
  };
  switch (props.filter) {
    case 'legume':
      listToDisplay = (listToDisplay.filter((item: ingredients) => { return item.categorie === "légume" }))
      break;
    case 'viande':
      listToDisplay = (listToDisplay.filter((item: ingredients) => { return item.categorie === "viande" }))
      break;
    case 'sauce':
      listToDisplay = (listToDisplay.filter((item: ingredients) => { return item.categorie === "sauce" }))
      break;
    case 'epice':
      listToDisplay = (listToDisplay.filter((item: ingredients) => { return item.categorie === "épice" }))
      break;
    default:
      break;
  }
const getElt=()=>{
  
}
  const renderFruitList = () => {
    return listToDisplay.map((item:ingredients, i:number) =>
      <div className="grid-item" key={item.id}>
        <IngredientCard setCountMoins={props.setCountMoins} setCountPlus={props.setCountPlus} setListIngredients={props.setListIngredients} key={item.id} {...item}></IngredientCard>
      </div>);
  };

  if (searchTerm !== "" ) {
    listToDisplay = props.listeData.filter((ingredients:ingredients) => {
      return ingredients.namelegume.toLowerCase().includes(searchTerm);
    });
  }
  return (
    <div className="search">
      <span className="spanX">Ingredients</span>
      <div className="search-box">
        <button className="btn-search"><img src={imag} alt="" className="icn" /></button>
        <input value={searchTerm} onChange={handleChange} type="text" className="input-search" placeholder="Type to Search..." />
      </div>
      <div className="grid" hidden={isSelect===false}>{renderFruitList()}</div>
    </div>
  );
}
