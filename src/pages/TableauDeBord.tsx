
import axios from "axios";
import { count } from "console";

import { useEffect, useState } from "react"
import { Link } from "react-router-dom";
import { RectteCardProps } from "../components/molecules/RecetteCard";
import Recherche from "./Recherche";
import { ingredients } from "./Recettes";
import "./TableauDeBord.css"


interface MenuPageProps {
    listIngredietns: ingredients[];
    setListIngredients: (x: ingredients) => void;
    incrementCount: (x: RectteCardProps) => void;
}

const Menu = ({ listIngredietns, setListIngredients, incrementCount }: MenuPageProps) => {
    const [isSelected, SetIsSelected] = useState(false)
    let [countList, setCount] = useState<number>(0)
    const [data, setData] = useState<ingredients[]>([{
        id: 0,
        namelegume: "",
        imageUrl: "",
        isSelected: false,
        vitamines: "",
        categorie: ''
    }]);
    useEffect(() => {
        axios({
            method: 'get',
            url: 'http://localhost:3030/',
        })
            .then((data) => {
                setData(data.data)
                console.log(stateFilter)
                SetIsSelected(false)
            })
    }, [])
    const [stateFilter, setStateFilter] = useState("")
    const setDataR = (data: RectteCardProps[]) => {
        let x = data.map(data => data)
        console.log("x setdata  " + x)
        data.forEach(item => incrementCount(item))
    }
    const handleCountPlus = () => {
        setCount(countList + 1)
        console.log("compteur de selection legumes : " + countList)
    }
    const handleCountMoins = () => {
        setCount(countList - 1)
        console.log("compteur de selection legumes : " + countList)
    }
    const getRecette = () => {
        SetIsSelected(true)
        countList = 0
        axios({
            method: 'post',
            url: 'http://localhost:3030/recettes',
            data: listIngredietns
        })
            .then((dataFr) => {
                let x = JSON.stringify(dataFr.data)
                console.log("datafr :" + x)
                setDataR(dataFr.data)
            })
    }

    console.log(stateFilter)
    const handleChange = (e: any) => {
        setStateFilter(e.target.value)
    }
    return (
        <>
            <div className="select">
                <select onChange={handleChange}>
                    <option value="" >Choisir votre categorie?</option>
                    <option value="legume">Legumes</option>
                    <option value="sauce">Sauces</option>
                    <option value="viande">Viandes</option>
                    <option value="epice" >Epices</option>
                </select>
            </div>
            <Recherche setCountMoins={handleCountMoins} setCountPlus={handleCountPlus} listeData={data} setListIngredients={setListIngredients} filter={stateFilter}></Recherche>
            <div hidden={countList < 3 || countList > 5}>
            <button className="btn1" onClick={getRecette} hidden={isSelected}>Valider</button>
            <Link to={'/Recettes'}><button className="btn1" hidden={ !isSelected}>Consulter les recettes</button></Link>
            </div>
            </>)
}

export default Menu;