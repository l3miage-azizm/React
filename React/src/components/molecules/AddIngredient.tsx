/* eslint-disable no-whitespace-before-property */
/* eslint-disable array-callback-return */

import axios from "axios";
import { useEffect, useState } from "react";
import { ingredients } from "../../pages/Recettes";
import "./AddIngredient.css"
import CardeIngredients from "./CardIngredient";
import plus from "./plusS.png"
import vitamines from "./vitamines.png"



const AddIngredient = () => {
    const [dataUpdate, setDataUpdate] = useState<ingredients[]>([])
    const [urlImage, setUrlImage] = useState<string>("")
    const [id, setld] = useState<number>(0)
    const [valueSelect, setValueSelect] = useState<string>("")
    const [nameIngredient, setNameIngredient] = useState<string>("")
    const [vitamine, setVitamine] = useState<string>("")
    let [dataSelection, setDataSelection] = useState<string[]>([])
    const handleChangeImage = (e: any) => {
        setUrlImage(e.target.value);
    };
    const handleChoice = (e: any) => {
        setValueSelect(e.target.value);
    };

    const handleChangeInputVitamine = (e: any) => {
        setVitamine(e.target.value);
    };

    const handleChangeTitle = (e: any) => {
        setNameIngredient(e.target.value);
    };

    const handleClickPLusVitamine = () => {
        if (vitamine !== "") {
            dataSelection.push(vitamine)
            setDataSelection(dataSelection)
            setVitamine("")
        }
    };

    const setListSelectionForRecette = (x: ingredients) => {
        setld(x.id)
        setItem(x)
        setNameIngredient(x.namelegume)
        setUrlImage(x.imageUrl)
        setValueSelect(x.categorie)
        let tab = x.vitamines.split('/')
        setDataSelection(tab)
    }

    const clearAll = () => {
        setNameIngredient("")
        setUrlImage("")
        setValueSelect("")
        setDataSelection([])
    }
    const [item, setItem] = useState<ingredients>({
        id: 0,
        namelegume: "",
        imageUrl: "",
        isSelected: false,
        vitamines: "",
        categorie: ''
    });

    const [data, setData] = useState<ingredients[]>([{
        id: 0,
        namelegume: "",
        imageUrl: "",
        isSelected: false,
        vitamines: "",
        categorie: ''
    }]);

    const fetchData = () => {
        axios({
            method: 'post',
            url: 'http://localhost:3030/ingredients/Add',
            data: {
                namelegume: nameIngredient,
                imageUrl: urlImage,
                vitamines: dataSelection.join('/'),
                categorie: valueSelect
            }
        }).then((data) => {
            setData(data.data)
        })
        clearAll()
    }

    const UpdateData = () => {
        axios({
            method: 'put',
            url: 'http://localhost:3030/ingredient/update',
            data: {
                id: id,
                namelegume: nameIngredient,
                imageUrl: urlImage,
                vitamines: dataSelection.join('/'),
                categorie: valueSelect
            }
        })
            .then((data) => {
                setData(data.data)
            })
        clearAll()
    }

    const DeleteData = () => {
        axios({
            method: 'delete',
            url: 'http://localhost:3030/ingredient/delete',
            data: {
                id: item.id,
            }
        }).then((data) => {
            setData(data.data)
        })
        clearAll()
    }

    useEffect(() => {
        axios({
            method: 'get',
            url: 'http://localhost:3030/',
        }).then((data) => {
            setData(data.data)
        })
    }, [])

    const deleteVitamine = (item: string) => {
        setDataSelection(dataSelection.filter(itemX => itemX !== item))
    }

    return (
        <>
            <div className="wrapperING">
                <ul className="ulWrappe">
                    <li>
                        <label className="tableIngTitle">Nom :</label>
                    </li>
                    <li>
                        <div className="addSteps">
                            <input type="text" className="name" onChange={handleChangeTitle} value={nameIngredient} />
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
                        <label className="tableIngTitle">Categorie :</label>
                    </li>
                    <li>
                        <div className="Select">
                            <select onChange={handleChoice} value={valueSelect}>
                                <option value="" >Choisir votre categorie?</option>
                                <option value="légume">Legumes</option>
                                <option value="sauce">Sauces</option>
                                <option value="viande">Viandes</option>
                                <option value="épice" >Epices</option>
                            </select>
                        </div>
                    </li>
                    <li>
                        <div className="addSteps">
                            <div className="step">
                                <img src={vitamines} className="imagUrl" alt="" />
                            </div>
                            <input type="text" className="textVt" onChange={handleChangeInputVitamine} onSubmit={handleClickPLusVitamine} value={vitamine} />
                            <button className="btnAdd" onClick={handleClickPLusVitamine}>
                                <img src={plus} alt="" />
                            </button>
                        </div>
                    </li>
                    <li>
                        <label className="tableIngTitle">Vitamines :</label>
                    </li>
                    <div className="tableVitamine">
                        {dataSelection.map((item) => (
                            <div hidden={item === ""} className="Vitamine" onClick={() => deleteVitamine(item)}>{item}</div>
                        ))}
                    </div>

                </ul>

            </div>
            <div className="detailsAdd">
            </div>
            <div className="ingredientsAdd">
            </div>
            <ul className="listBTN">
                <li>
                    <button className="buttn" onClick={fetchData}>Ajouter</button>
                </li>
                <li>
                    <button className="buttn" onClick={UpdateData}>Modifier</button>
                </li>
                <li>
                    <button className="buttn" onClick={DeleteData}>Supprimer</button>
                </li>
            </ul>
            <img className="imageIngredient" src={urlImage} alt="" />
            <div className="gridIngredients" >
                <ul>
                    {data.map(item => (
                        <CardeIngredients key={item.id} {...item} setListIngredients={setListSelectionForRecette}></CardeIngredients>
                    ))}
                </ul>
            </div>

            <div className="titleRecette">{nameIngredient}</div>
        </>
    )
}

export default AddIngredient