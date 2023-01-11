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
const CardeIng= ({ id, namelegume, imageUrl, isSelected,vitamines,categorie, setListIngredients}: IngredientCardProps) => { 
const [isClick, setIsActive] = useState(isSelected)
const [item, setItem] = useState<ingredients>({id, namelegume, imageUrl, isSelected,vitamines,categorie})

const  handleClick = () =>{
    setIsActive(current => !current);
    isSelected=!isClick
    setListIngredients({id, namelegume, imageUrl, isSelected,vitamines,categorie})
}
  return (
    <>
    <li className="tabIngli">
    <div className="plat" onClick={handleClick} style={{
        opacity: isClick ? '0.43' : '',
        background: isClick ? '#CAF56F' : '',
      }}
     >
      <img className="imageUrl" src={imageUrl} alt={namelegume} />
      <div className="text"><p>{namelegume}</p></div>
      </div>
      </li>
        </>
  );
};

export default CardeIng;


