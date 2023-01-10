/* eslint-disable no-dupe-keys */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React from "react";
import { RectteCardProps } from "../components/molecules/RecetteCard";
import { ingredients } from "../pages/Recettes";


interface IGlobalContext {
  listIngredietns: ingredients[];
  listIngredietnsForRecette:ingredients[]
  setListSelectionRecette:(x:ingredients)=>void;
  setListIngredients: (x: ingredients) => void;
  count: RectteCardProps[];
  incrementCount: (x: RectteCardProps) => void;
}

const GlobalContext = React.createContext<IGlobalContext>({} as IGlobalContext);

export const useGlobalContext = () => React.useContext(GlobalContext);

interface GlobalContextProviderProps {
  children: React.ReactNode;
}

const GlobalContextProvider = ({ children }: GlobalContextProviderProps) => {
  const [count, setCount] = React.useState<RectteCardProps[]>([]);
  let [listIngredietns, setList] = React.useState<ingredients[]>([]);
  const setListSelection=(x:ingredients)=>{
    if(x.isSelected===true){
    listIngredietns.push(x)  
    console.log("GlobalContext : listIngredients : " + JSON.stringify(listIngredietns)) 
  }else{
      setList(listIngredietns.filter(item=>item.id!==x.id))
      console.log("GlobalContext : listIngredients : " + JSON.stringify(listIngredietns))
    }
   }
   let [listIngredietnsForRecette, setListForRecette] = React.useState<ingredients[]>([]);
  const setListSelectionForRecette=(x:ingredients)=>{
    if(x.isSelected===true){
    listIngredietnsForRecette.push(x)  
    console.log("GlobalContext : listIngredients : " + JSON.stringify(listIngredietnsForRecette)) 
  }else{
      setList(listIngredietnsForRecette.filter(item=>item.id!==x.id))
      console.log("GlobalContext : listIngredients : " + JSON.stringify(listIngredietnsForRecette))
    }
   }
  
  return (
    <GlobalContext.Provider value={{
      listIngredietns,listIngredietnsForRecette, setListIngredients(x) {
       setListSelection(x)
      },
      count, incrementCount(x) {
      count.push(x)
      },setListSelectionRecette(x){
        setListSelectionForRecette(x)
      }
    }}>
      {children}
    </GlobalContext.Provider>
  );
};

export default GlobalContextProvider;
