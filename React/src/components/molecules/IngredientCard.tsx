import React, { useState } from "react";
import "./IngredientCard.css"
import styled from "styled-components";
import { ingredients } from "../../pages/Recettes";

export interface IngredientCardProps {
  id: number
  namelegume: string;
  imageUrl: string;
  isSelected: boolean;
  vitamines:string;
  categorie:string;
  setListIngredients: (x: ingredients) => void
  setCountPlus:()=>void
  setCountMoins:()=>void
}

const IngredientCard = ({ id, namelegume, imageUrl, isSelected,vitamines,categorie, setListIngredients,setCountPlus,setCountMoins}: IngredientCardProps) => {
  const [isClick, setIsActive] = useState(false)
  
  const handleClick = () => {
    setIsActive(current => !current);
    isSelected = !isClick
    if(isSelected){
      setCountPlus()
    }else{
      setCountMoins()
    }
    setListIngredients({ id, namelegume, imageUrl, isSelected,vitamines,categorie})
  };
  return (
    <>
      <div className="container">
      <div className="card" 
     style={{
        opacity: isClick ? '0.43' : '',
        background: isClick ? '#CAF56F' : '',
      }}
        onClick={handleClick}>
        <div className="imgBx">
          <img src={imageUrl} alt={namelegume}/>
        </div>
        <div className="contentBx">
          <p className="nameLg">{namelegume}</p>
          <h2>Vitamines</h2>
          <div className="size">
            {vitamines.split('/').map(item=>(<span>{item}</span>))}
               </div>
        </div>
      </div>
    </div>
    </>
  );
};

export default IngredientCard;


const Container = styled.div`
  border: 1px solid grey;
  border-radius: 6px;
  width: 196px;
  display: inline-block;

  & > img {
    width: 100%;
    height: 200px;
  }

  & > div > p {
    font-weight: bold;
    text-align: center;
  }

  & > div > div {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 12px 12px 12px;
  }
`;
