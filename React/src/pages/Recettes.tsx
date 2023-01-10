/* eslint-disable array-callback-return */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-hooks/rules-of-hooks */

import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import RecetteCard, { RectteCardProps } from "../components/molecules/RecetteCard";
import "./Recettes.css";

import moin from "./moin.png"
import plus from "./plus.png"
import QrCode from "../components/molecules/qrcode";
import StopWatch from "../components/molecules/StopWatch";
import axios from "axios";
import { url } from "inspector";


export interface ingredients {
  id: number,
  namelegume: string,
  imageUrl: string,
  isSelected: boolean,
  vitamines: string
  categorie: string
}

const Recettes = (props: { value: RectteCardProps[], listIngredients: ingredients[], setDetails: (x: any) => void }) => {
  const [textValue, setTextValue] = useState("")
  const [note, setNote] = useState(0)
  const [state, setStat] = useState(false)
  const [listIng, setListIng] = useState(props.listIngredients)
  const [count, setCount] = useState<number>(1)
  const [data, setData] = useState(props.value);
  const [item, setItem] = useState<RectteCardProps>(
    data[0]
  );

  const getElementA = (x: any) => {
    setStat(false)
    props.setDetails(x.details)
    setItem(x)
  }

  const handlePlus = () => {
    if (count > 50) {
      setCount(50)
    } else {
      setCount(count + 1)
    }
  }

  const getQUANTandING = (item: any, count: number) => {
    let Q: number[] = []
    let I: string[] = []
    item.ingredients.split('/').map((item: string, index: number) => {
      if (index % 2 === 0) {
        Q.push(count * parseFloat(item))
      } else {
        I.push(item)
      }
    })
    return Q.map((x, index) => (
      <tr>
        <td>{Q[index]}</td>
        <td>{I[index]}</td>
      </tr>
    )
    )
  }

  const getDetails = (item: any) => {
    let Q: number[] = []
    let I: string[] = []
    item.details.split('/').map((item: string, index: number) => {
      Q.push(index + 1)
      I.push(item)
    })
    console.log(I)
    return Q.map((x, index) => (
      <tr>
        <td>Etape {index}</td>
        <td>{I[index]}</td>
      </tr>
    )
    )
  }

  const handleMoins = () => {
    if (count < 1) {
      setCount(1)
    } else {
      setCount(count - 1)
    }
  }

  const setDivIngredients = () => {
    const tableMargin = ["icone", "icone1", "icone2", "icone3", "icone4"]
    return listIng.map((item, index) => (
      <div className={tableMargin[index]}><img src={item.imageUrl} alt={item.namelegume} className="iconeLeg" /></div>
    ))
  }
  const setNoteANDComment = () => {
    axios({
      method: 'Post',
      url: 'http://localhost:3030/SetNoteAndComment',
      data: { note: note, commentaire: textValue, id: item.id }
    }).then(data =>
      console.log(data.data))
  }
  return (
    <>
      <div className="title">{item?.name}</div>
      <div className="note" hidden={state}>
        <StopWatch setStat={() => setStat(true)}></StopWatch>
      </div>
      <div className="note3" hidden={!state}>
        <p className="noteRec">Noter la recette</p>
        <div className="rating rating2">
          <a onClick={() => setNote(5)} href="#5" title="Give 5 stars">★</a>
          <a onClick={() => setNote(4)} href="#4" title="Give 4 stars">★</a>
          <a onClick={() => setNote(3)} href="#3" title="Give 3 stars">★</a>
          <a onClick={() => setNote(2)} href="#2" title="Give 2 stars">★</a>
          <a onClick={() => setNote(1)} href="#1" title="Give 1 star">★</a>
        </div>
        <p className="commentaire">Commentaire</p>
        <div className="rev-box">
          <input className="review" id="review"
            type='text'
            value={textValue}
            onChange={e => setTextValue(e.target.value)}></input>
        </div>
        <button className="btnSoumission" onClick={setNoteANDComment}>Soumettre</button>
      </div>
      <div className="note1">
        <Link to={'/Details'}><QrCode></QrCode></Link>
      </div>
      <img className="image" src={item?.imgUrl} alt={item?.name} />
      {setDivIngredients()}
      <div className="grid1">
        <ul>
          {data.map(item => (
            <RecetteCard getElements={getElementA} key={item.ingredients} {...item}></RecetteCard>
          ))}
        </ul>
      </div>
      <div>
        <h1 className="btnG">Ingredients</h1>
        <h1 className="btnD">Details</h1>
        <div className="bordG">
          <div className="ingredients">
            <div>
              <div className="personne">
                <button className="moins" onClick={handleMoins}><img src={moin} alt="" />
                </button><p className="prs">({count}) x Personne(s)</p><button className="plus" onClick={handlePlus}>
                  <img src={plus} alt="" /></button></div>
            </div>
            <table hidden={item.details === ""}>
              <tbody>
                {
                  getQUANTandING(item, count)
                }
              </tbody>
            </table>
          </div>
        </div>
        <div className="bordD">
          <div className="details">
            <div>
              <table hidden={item.details === ""}>
                <tbody>
                  {getDetails(item)}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Recettes;
