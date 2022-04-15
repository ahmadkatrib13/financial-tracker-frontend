import styled from "styled-components";
import React, { useState ,useEffect} from "react";
import CircularProgress from "./CircularProgress";
import axios from "axios";
import Cookies from "universal-cookie";
import Title3 from '../kit/Title3';

const ProfitGoalCard = styled.div`
  width: 200px;
  background-color: ${(props) => props.background};
  border-radius: 1rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0.75rem 0 1.5rem 0;
  gap: 2.25rem;
  margin: ${(props) => props.margin};
`;

const ProfitGoalTitle = styled.div`
  font-size: 1.5rem;
  font-weight: 800;
  letter-spacing: -0.06rem;
  color: ${props => props.color};
`;

function ProfitGoal(props) {
  const cookies = new Cookies();
  const token = cookies.get("TOKEN");
  const headers = { headers: { Authorization: "Bearer " + token } };
  const [profit, setProfit]=useState({
    total:0,
    percentage:0,
    profit_goal:0,
  });

  
  // const [inputMode,setInputMode]=useState(false);

  useEffect(()=>{
    const getGoal = async()=>{
      try{ 
        let res = await axios({
        method: "GET",
        url: `${process.env.REACT_APP_API_URI}api/profit`,
        ...headers,
      });console.log(res.data.data);
      setProfit(res.data.data);
     
    } catch(err){
      console.log(err);
    }
  }
  getGoal();
},[])

  return (
    <ProfitGoalCard {...props} >
    {/* onClick={()=>{setInputMode(true)}} */}
    
      <ProfitGoalTitle {...props}>Profit Goal</ProfitGoalTitle>

    <CircularProgress total={profit.total} profit={profit.profit_goal} setProfit={setProfit} profitID={profit.id} size={130} percentage={profit.percentage} color={props.color} />
    </ProfitGoalCard>
  );
}

export default ProfitGoal;
