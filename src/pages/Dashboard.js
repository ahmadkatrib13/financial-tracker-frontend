import React, { useEffect , useState} from "react";
import Title1 from "../components/kit/Title1";
import Column from "../components/kit/Column";
import Row from "../components/kit/Row";
import { ReactComponent as IncomeSVG } from "../assets/images/IncomeSVG.svg";
import { ReactComponent as ExpenseSVG } from "../assets/images/ExpenseSVG.svg";
import SmallCard from "../components/Dashboard/SmallCard";
import BigCard from "../components/Dashboard/BigCard";
import Card from "../components/kit/Card";
import LineChart from "../components/Charts/Line/LineChart";
import PieChart from "../components/Charts/Pie/PieChart";
import Cookies from "universal-cookie";
import axios from "axios";

function Dashboard() {
  const cookies = new Cookies();
  const token = cookies.get("TOKEN");
  const headers = {headers: {Authorization: "Bearer " + token}}
  const [data,setData] = useState({});
  useEffect(()=>{
    
    
      const getAmounts = async () => {
        try {
          let res = await axios({
            method: "GET",
            url: `${process.env.REACT_APP_API_URI}api/transactions/total`,
            ...headers
          });
  
          setData(res.data.data);
          console.log(res.data.data)
        } catch (err) {
          console.log(err);
        }
      }
      getAmounts();

    
  },[]);
  return (
    <>
      <Title1>Overview</Title1>
      <Row grow="1">
        <Column grow="1">
          <SmallCard
            title="Total Income"
            sign="+"
            color="#2adb86"
            currency="$"
            value={data.income||0}
            img={<IncomeSVG />}
          />
          <SmallCard
            title="Total Expense"
            sign="-"
            color="#DB2A35"
            currency="$"
            value={data.expense||0}
            img={<ExpenseSVG />}
          />
        </Column>
        <BigCard
          title="Current Balance"
          color="#7CB4f9"
          currency="$"
          value={data.total||0}
        />
      </Row>
      <Row  top="2rem">
      <Card margin="0" direction="column" justify="center" align="center">
          <LineChart />
        </Card>
      </Row>
      <Row  top="2rem">
      <Card margin="0" direction="row" justify="center" align="center">
          <PieChart />
        </Card>
      </Row>
    </>
  );
}

export default Dashboard;
