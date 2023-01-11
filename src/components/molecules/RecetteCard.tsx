import React, { useEffect, useState } from "react";
import "./RecetteCard.css"
import image from "./ajouter-au-panier.png"
import axios from "axios";
import styled from "styled-components";


export interface RectteCardProps {
  id:number;
  name: string;
  imgUrl: string;
  ingredients: string;
  details: string;
  idLegume:string;
  note:number;
  commentaire:string;
}
interface EXP extends RectteCardProps{
  getElements:(x:RectteCardProps)=>void
}

const RecetteCard= ({id,name,imgUrl,ingredients,details,idLegume,note,commentaire,getElements}: EXP) => { 
  const [data, setdata]=useState({ id,name,imgUrl,ingredients,details,idLegume,note,commentaire})
  const  handleClick = () =>{
    getElements(data)
  }
  return (
    <>
    <div className="plat" onClick={handleClick}>
      <img className="imageUrl" src={data.imgUrl} alt={data.name} />
      <div className="text"><p>{data.name}</p></div>
      </div>
        </>
  );
};

export default RecetteCard;


