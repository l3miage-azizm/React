/* eslint-disable no-whitespace-before-property */
/* eslint-disable array-callback-return */

import axios from "axios";
import { useEffect, useState } from "react";
import CardeIng from "../components/molecules/CardeIng";
import RecetteCard from "../components/molecules/RecetteCard";
import "./AddINgredOrRec.css"
import plus from "./plusS.png"
import iconeADD from "./iconeADD.png"
import { ingredients } from "./Recettes";
import AddIngredient from "../components/molecules/AddIngredient";
import AddRecette from "../components/molecules/AddRecette";
export interface Recette {
    id: number;
    name: string;
    imgUrl: string;
    ingredients: string;
    details: string;
    note: number;
    idLegume: string;
    commentaire: string;
}
export interface Combinaison {
    id: number
    idLegume: string
    nameLegume: string;
}

const AddINgredOrRec = () => {
    const [isEditing, setIsEditing] = useState<boolean>(false)
    const handleChangeIsEditing = () => {
        setIsEditing(!isEditing);
    };

    return (
        <>
        <div hidden={!isEditing}>
        <AddIngredient></AddIngredient>
        </div>
        <div hidden={isEditing}>
        <AddRecette></AddRecette>
        </div>  
        <div className="checkIngOrRec">
                <ul>
               <div className="switch-holder">
            <div className="switch-label">
                <i className="fa fa-bluetooth-b"></i><span hidden={isEditing}>Recette</span><span hidden={!isEditing}>Ingredient</span>
            </div>
            <div className="switch-toggle">
                <input type="checkbox" id="bluetooth"/>
                <label htmlFor="bluetooth" onClick={handleChangeIsEditing}></label>
            </div>
        </div>   
        </ul>
        </div>
        </>
    )
}

export default AddINgredOrRec