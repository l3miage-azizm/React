/* eslint-disable no-whitespace-before-property */
/* eslint-disable array-callback-return */

import axios from "axios";
import { useEffect, useState } from "react";
import "./AddRecette.css"
import plus from "./plusS.png"
import iconeADD from "./iconeADD.png"
import { ingredients } from "../../pages/Recettes";
import CardeIng from "./CardeIng";
import RecetteCard from "./RecetteCard";

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

const AddRecette = () => {
    const [isEditing, setIsEditing] = useState<boolean>(false)
    let [tableIngredients, settableIngredients] = useState<string[]>([])
    let [tableDetails, settableDetails] = useState<string[]>([])
    const [quantité, setQuantité] = useState<number>(0)
    const [countEtape, setcountEtape] = useState<number>(1)
    const [urlImage, setUrlImage] = useState<string>("")
    const [idLegume, setldLegume] = useState<string>("")
    const [nameRecette, setNameRecette] = useState<string>("")
    const [inputDetails, setInputDetails] = useState<string>("")
    const [inputIngredient, setinputingredient] = useState<string>("")
    const [dataSelt, seDataSel] = useState<ingredients[]>([])
    const HandleSelect = () => {
    }
    const handleChangeImage = (e: any) => {
        setUrlImage(e.target.value);
    };

    const handleChangeInputDetails = (e: any) => {
        setInputDetails(e.target.value);
    };

    const handleChangeInputIngredients = (e: any) => {
        setinputingredient(e.target.value);
    };

    const handleChangeTitle = (e: any) => {
        setNameRecette(e.target.value);
    };

    const handleChangeQuantité = (e: any) => {
        setQuantité(e.target.value);
    };

    const handleChangeIsEditing = () => {
        setData(tab)
        setIsEditing(!isEditing);
    };

    const handleClickPLusDetails = () => {
        if (inputDetails !== "") {
            setcountEtape(countEtape + 1)
            tableDetails.push("Etape " + countEtape)
            tableDetails.push(inputDetails)
            setInputDetails("")
        }
    };

    const handleClickPLusIngredients = () => {
        if (quantité > 0 && inputIngredient !== "") {
            tableIngredients.push(quantité.toString())
            tableIngredients.push(inputIngredient)
            setQuantité(0)
            setinputingredient("")
        }
    };

    const setListSelectionForRecette = (x: ingredients) => {
        axios({
            method: 'put',
            url: 'http://localhost:3030/ingredients',
            data: x
        }).then((data) => {
            setData(data.data)
            seDataSel(data.data.filter((item: ingredients) => item.isSelected === true))
        })
    }

    const [item, setItem] = useState<Recette>({
        id: 0,
        name: "",
        imgUrl: "",
        ingredients: "",
        details: "",
        idLegume: "",
        note: 0,
        commentaire: "",
    });

    const [data, setData] = useState<ingredients[]>([{
        id: 0,
        namelegume: "",
        imageUrl: "",
        isSelected: false,
        vitamines: "",
        categorie: ''
    }]);

    const [dataRecette, setDataRecette] = useState<Recette[]>([{
        id: 0,
        name: "",
        imgUrl: "",
        ingredients: "",
        details: "",
        idLegume: "",
        note: 0,
        commentaire: "",
    }]);

    const [Recette, setRecette] = useState<Recette[]>(dataRecette);
    const filterTabIngredients = (index: number) => {
        console.log(tableIngredients[index])
        console.log(tableIngredients[index+1])
        let x = tableIngredients.filter((x, i) => i !== index && i !== (index + 1))
        settableIngredients(x)
    }
    const filterTabDetails = (index: number) => {
        let x = tableDetails.filter((x, i) => i !== index && i !== (index + 1))
        let j = 0
        for (let i = 0; i < x.length; i++) {
            if (i % 2 === 0) {
                j = j + 1
                x[i] = "Etap: " + (j)
            }
        }
        settableDetails(x)
    }

    const getQUANTandINGIngredient = (tab: string[]) => {
        let Q: string[] = []
        let I: string[] = []
        tab.map((item: string, index: number) => {
            if (index % 2 === 0) {
                Q.push(item)
            } else {
                I.push(item)
            }
        })
        return I.map((x, index) => (
            <tr onClick={() => filterTabIngredients(index)} className="hovertr">
                <td>{Q[index]}</td>
                <td>{I[index]}</td>
            </tr>
        )
        )
    }
    const zeroPad = (num: number, legth: number) => {
        var zero = legth - num.toString().length + 1;
        return Array(+(zero > 0 && zero)).join("0") + num;
    }
    const fetchDataRecette = async () => {
        let det = tableDetails.filter((item, index) => index % 2 !== 0).join('/')
        let ing = tableIngredients.join('/')
        let str = dataRecette[dataRecette.length - 1].idLegume
        let cmp = str.split('-')
        let index = parseInt(cmp[1]) + 1
        cmp[1] = zeroPad(index, 4)
        let x = cmp[0] + "-" + cmp[1]
        await axios({
            method: 'post',
            url: 'http://localhost:3030/Recette/Add',
            data: {
                id: 0,
                name: nameRecette,
                imgUrl: urlImage,
                ingredients: ing,
                details: det,
                idLegume: x,
                note: 0,
                commentaire: "",
                data: dataSelt
            }
        })
            .then((data) => {
                setDataRecette(data.data)
            })
            clearAll()
    }

    const UpdateDataRcette = async () => {
        let det = tableDetails.filter((item, index) => index % 2 !== 0).join('/')
        let ing = tableIngredients.join('/')
        await axios({
            method: 'put',
            url: 'http://localhost:3030/Recette/update',
            data: {
                id: item.id,
                name: nameRecette,
                imgUrl: urlImage,
                ingredients: ing,
                details: det,
                idLegume: idLegume,
                note: item.note,
                commentaire: item.commentaire,
                data: dataSelt
            }
        })
            .then((data) => {
                setDataRecette(data.data)
            })
            clearAll()

    }

    const DeleteDataRecette = () => {
        axios({
            method: 'delete',
            url: 'http://localhost:3030/Recette/delete',
            data: {
                id: item.id,
                idLegume: idLegume
            }
        })
            .then((data) => {
                setDataRecette(data.data)
            })
            clearAll()
    }
    const clearAll=()=>{
        setldLegume("")
        setNameRecette("")
        setUrlImage("")
        settableIngredients([])
        settableDetails([])
    }
    const getQUANTandINGDetails = (tab: string[]) => {
        let Q: string[] = []
        let I: string[] = []
        tab.map((item: string, index: number) => {
            if (index % 2 === 0) {
                Q.push(item)
            } else {
                I.push(item)
            }
        })

        return Q.map((x, index) => (
            <tr onClick={() => filterTabDetails(index + 1)} className="hovertr">
                <td>{Q[index]}</td>
                <td>{I[index]}</td>
            </tr>
        )
        )
    }
    useEffect(() => {
        axios({
            method: 'get',
            url: 'http://localhost:3030/Recette',
        }).then((data) => {
            setDataRecette(data.data)
        })
        axios({
            method: 'get',
            url: 'http://localhost:3030/',
        }).then((data) => {
            setData(data.data)
        })
    }, [])

    const [tab, setTab] = useState<ingredients[]>([])

    const getElementA = (x: Recette) => {
        setDataRecette(dataRecette)
        setItem(x)
        setldLegume(x.idLegume)
        setNameRecette(x.name)
        setUrlImage(x.imgUrl)
        settableIngredients(x.ingredients.split("/"))
        let I: string[] = []
        x.details.split('/').map((item: string, index: number) => {
            I.push("Etap : " + (index + 1))
            I.push(item)
        })
        settableDetails(I)
        axios({
            method: 'post',
            url: 'http://localhost:3030/Combinaison',
            data: x
        }).then((data) => {
            seDataSel(data.data.filter((item: ingredients) => item.isSelected === true))
            setTab(data.data)
        })
        seDataSel(data.filter((item: ingredients) => item.isSelected === true))
    }

    return (
        <>
            <div className="check">
                <ul>
                    <div className="switch-holder">
                        <div className="switch-label">
                            <i className="fa fa-bluetooth-b"></i><span>Editing</span>
                        </div>
                        <div className="switch-toggle">
                            <input type="checkbox" id="Editing" />
                            <label htmlFor="Editing" onClick={handleChangeIsEditing}></label>
                        </div>
                    </div>
                </ul>     </div>
            <div className="wrapper">
                <ul>
                    <li>
                        <label className="tableIngTitle">Nom :</label>
                    </li>
                    <li>
                        <div className="addSteps">
                            <input type="text" className="name" onChange={handleChangeTitle} value={nameRecette} />
                        </div>
                    </li>
                    <li>
                        <label className="tableIngTitle">Url image :</label>
                    </li>
                    <li>
                        <div className="addSteps">
                            <input type="text" className="name" onChange={handleChangeImage} value={urlImage} />
                        </div>
                    </li>
                    <li>
                        <label className="tableIngTitle">Ingredients :</label>
                    </li>
                    <li>
                        <div className="addSteps">
                            <div className="step">
                                <span>Quantité</span>
                                <input type="number" step="0.25" onChange={handleChangeQuantité} value={quantité} />
                            </div>
                            <input type="text" className="textIng" onChange={handleChangeInputIngredients} value={inputIngredient} />
                            <button className="btnAdd" onClick={handleClickPLusIngredients}>
                                <img src={plus} alt="" />
                            </button>
                        </div>
                    </li>
                    <li>
                        <label className="tableIngTitle">Details :</label>
                    </li>
                    <li>
                        <div className="addSteps">
                            <div className="step">
                                <span>Etape</span>
                                <span>{countEtape}</span>
                            </div>
                            <input type="text" className="textIng" onChange={handleChangeInputDetails} value={inputDetails} />
                            <button className="btnAdd" onClick={handleClickPLusDetails}>
                                <img src={plus} alt="" />
                            </button>
                        </div>
                    </li>
                    <li>
                        <label className="tableIngTitle">Iingredients de selection :</label>
                    </li>
                    <li>
                        <button className="btnADD" onClick={HandleSelect} ><img src={iconeADD} alt="" /></button>
                        <div className="tableIng">
                            {dataSelt.map((item, index) => (
                                <CardeIng key={index} {...item} setListIngredients={setListSelectionForRecette}></CardeIng>
                            ))}
                        </div>
                    </li>
                </ul>

            </div>
            <div className="detailsADD">
                <h1>Details</h1>
                <table>
                    <tbody>
                        {getQUANTandINGDetails(tableDetails)}
                    </tbody>
                </table>
            </div>
            <div className="ingredientsADD">
                <h1>Ingredients</h1>
                <table>
                    <tbody>
                        {getQUANTandINGIngredient(tableIngredients)}
                    </tbody>
                </table>
            </div>
            <ul className="btnaddUpdSupp">
                <li>
                    <button className="button" hidden={isEditing} onClick={fetchDataRecette}>Ajouter</button>
                </li>
                <li>
                    <button className="button" onClick={UpdateDataRcette}>Modifier</button>
                </li>
                <li>
                    <button className="button" onClick={DeleteDataRecette}>Supprimer</button>
                </li>
            </ul>
            <img className="imageRecette" src={urlImage} alt="" />
            <div className="gridIngredients" hidden={!isEditing}>
                <ul>
                    {dataRecette.map(item => (
                        <RecetteCard key={item.id} {...item} getElements={getElementA}></RecetteCard>
                    ))}
                </ul>
            </div>
            <div className="gridIngredients" hidden={isEditing}>
                <ul>
                    {data.map(item => (
                        <CardeIng key={item.id} {...item} setListIngredients={setListSelectionForRecette}></CardeIng>
                    ))}
                </ul>
            </div>
            <div className="titleRecette">{nameRecette}</div>

        </>
    )
}

export default AddRecette