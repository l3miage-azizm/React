
import { Link } from "react-router-dom";
import styled from "styled-components";
import "./Header.css";
import "./Header.tsx";
import home from "./Home.png";
import menu from "./menu.png";
import dashbord from "./dashbord.png";
import add from "./Add.png";
import { useState } from "react";


const Header = () => {
  const [homeSelect,setHomeSelect]=useState<boolean>(true)
  const [dashbordSelect,setdashbordSelect]=useState<boolean>(false)
  const [addSelect,setaddSelect]=useState<boolean>(false)
  const handleSelectHome=()=>{
    setHomeSelect(true)
    setaddSelect(false)
    setdashbordSelect(false)
  }
  const handleSelectDashbord=()=>{ 
    setHomeSelect(false)
    setaddSelect(false)
    setdashbordSelect(true)
  }
  const handleSelectADD=()=>{
    setHomeSelect(false)
    setaddSelect(true)
    setdashbordSelect(false)
  }
  return (
      <nav>
         <div className="meNu"> <img src={menu} className="menu" alt="" /></div>
        <ul className="ulHeander">
            <li>
              <Link to={"/"}><button className="bouttoN" onClick={handleSelectHome} style={{
        background: homeSelect ? '#615f14' : '',
      }} ><img src={home} className="home" alt="" /></button></Link><div className="textHeader">Home</div>            
              </li>
              <li>
              <Link to={"/Dashboard"}><button className="bouttoN" onClick={handleSelectDashbord}  style={{
        
        background: dashbordSelect ? '#615f14' : '',
      }}><img src={dashbord}  className="dashbord" alt="" /></button></Link> <div className="textHeader">Dashbord</div>            
              </li>
              <li>
                <Link to={"/AddINgredOrRec"}><button className="bouttoN" onClick={handleSelectADD}  style={{
        background: addSelect ? '#615f14' : '',
      }}><img src={add} className="add" alt="" /></button></Link><div className="textHeader">ADD</div> 
              </li>
          </ul>
        </nav>
  );
};


export default Header;
const Container = styled.header`
  border-bottom: 1px solid black;
  text-align: center;
  transition: all 0.2s ease;

  & img {
    width: 64px;
    height: 64px;
    border-radius: 50%;
    background-color: red;
  }

  & ul {
    padding: 0;
    list-style-type: none;
  }

  & li {
    display: inline-block;
    padding: 4px 12px;
    border: 1px solid black;
    border-radius: 3px;
    margin: 0 12px;
  }
`;
