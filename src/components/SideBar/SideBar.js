import React, { useState } from "react";
import styled from "styled-components";
import ProfitGoal from "../ProfitGoal/ProfitGoal";
import Cookies from "universal-cookie";
import { Collapse } from "@mui/material";
import {GiHamburgerMenu} from "react-icons/gi"

const SideBarNav = styled.nav`
background-color: #2adb91;
height: 100vh;
display: flex;
padding: 0 2rem;
`;


function SideBar() {
  const cookies = new Cookies();
  const [hover,setHover] = useState(false);


  const handleLogout = () => {
    cookies.remove("TOKEN", { path: "/" });
    window.location.href = "/login";
  };
  return (
    <SideBarNav onMouseOut={()=>{setHover(false)}} onMouseOver={()=>{setHover(true)}}>
    <Collapse in={hover} orientation="horizontal" >
    <ProfitGoal color="#2ADB91" background="#fff" />
      <button onClick={handleLogout}>Logout</button>
    </Collapse>
        <Collapse in={!hover} orientation="horizontal">
<GiHamburgerMenu/>
      </Collapse>

      
    </SideBarNav>
  );
}

export default SideBar;
