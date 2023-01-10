import "./RecetteCard.css"
import { ingredients } from "../../pages/Recettes";
import { useState } from "react";


export interface IngredientCardProps {
  id: number
  namelegume: string;
  imageUrl: string;
  isSelected: boolean;
  vitamines:string;
  categorie:string;
  setListIngredients: (x: ingredients) => void
}
const CardeIngredients= ({ id, namelegume, imageUrl, isSelected,vitamines,categorie, setListIngredients}: IngredientCardProps) => { 
const  handleClick = () =>{
    setListIngredients({id, namelegume, imageUrl, isSelected,vitamines,categorie})
}
  return (
    <>
    <li className="tabIngli">
    <div className="plat" onClick={handleClick} 
     >
      <img className="imageUrl" src={imageUrl} alt={namelegume} />
      <div className="text"><p>{namelegume}</p></div>
      </div>
      </li>
        </>
  );
  
};

export default CardeIngredients;