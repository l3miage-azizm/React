import axios from "axios";
import { useState,useEffect } from "react";
import { ingredients } from "../../pages/Recettes";

interface x{
  handleclick:()=>void
}
const TableSelection= (props:{value:ingredients[]}) => { 

return (
    <>
    {props.value.map(item=>(<h1>{item.namelegume}</h1>))}
    </>
  );
};

export default TableSelection;


