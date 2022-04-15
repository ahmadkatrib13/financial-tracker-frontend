import React, { useEffect, useState } from "react";
import { Pie, Doughnut } from "react-chartjs-2";
import randomcolor from "randomcolor";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import Cookies from "universal-cookie";
import axios from "axios";
import NextBackButtons from "../NextBackButtons";
import Row from "../../kit/Row";
import Column from "../../kit/Column";
import { Grid } from "@mui/material";
import Title3 from "../../kit/Title3";
import styled from "styled-components";
import Title2 from "../../kit/Title2";
import CheckBoxes from "../CheckBoxes";
import TimeType from "../TimeType";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  PointElement,
  LineElement
);

const options = {
  responsive: true,
  rotation: -90,
  parsing: {
    key: "sum",
  },
  plugins: {
    legend: {
      display: false,
    },
  },
  // scales: {
  //   xAxis: {
  //     type: 'time',
  //   }
  // }
};

const DateTitle = styled.span`
  margin: ${(props) => props.margin || "0"};
  padding: ${(props) => props.margin || "0 1rem"};
  font-weight: 500 !important;
  font-size: 1.5rem;
  letter-spacing: -0.06em;
  color: ${(props) => props.color || "black"};
  opacity: ${(props) => props.opacity || 0.6};
`;

function PieChart() {
  const cookies = new Cookies();
  const token = cookies.get("TOKEN");
  const headers = { headers: { Authorization: "Bearer " + token } };
  const [data, setData] = useState({ incomes: [], expenses: [] });
  const [value, setValue] = useState("monthly");
  const [range, setRange] = useState(0);
  const [bgIncomes, setBgIncomes] = useState("#DDD");
  const [bgExpenses, setBgExpenses] = useState("#DDD");
  useEffect(() => {
    let getData = async () => {
      axios({
        method: "GET",
        url: `${process.env.REACT_APP_API_URI}api/categories/${value}?range=${range}`,
        ...headers,
      }).then((res) => {
        setData(res.data);
      });
    };
    getData();
  }, [value, range]);

  useEffect(() => {
    console.log(data);
    if (data.incomes.length != 0){
      setBgIncomes(
        randomcolor({
          count: data.incomes?.length,
          hue: "green",
          luminosity: "light",
        })
      )}else setBgIncomes("#DDD");
      if (data.expenses.length != 0){
      setBgExpenses(
        randomcolor({
          count: data.expenses.length,
          hue: "red",
          luminosity: "light",
        })
      )}else{
        setBgExpenses("#DDD")
      };
  }, [data]);

  return (
    <Grid container spacing={2} justifyContent="center">
      <Grid xs={0} md={1} />
      <Grid item xs={11} md={10}>
        <Row justify="space-between">
          <NextBackButtons setRange={setRange} range={range} />
          <TimeType setValue={setValue} setRange={setRange} />
        </Row>
      </Grid>
      <Grid xs={0} md={1} />

      <Grid item xs={12} textAlign="center">
        <DateTitle>{data.start}</DateTitle>
        <DateTitle>-</DateTitle>
        <DateTitle>{data.end}</DateTitle>
      </Grid>

      <Grid item xs={8} md={4} justifyContent={"center"} textAlign={"center"}>
        <Title2 padding={"1rem 0"} color={"#2adb86"} opacity={1}>
          Incomes
        </Title2>
        <Doughnut
          options={options}
          data={{
            labels:
              data.incomes.length == 0
                ? ["NO DATA"]
                : data.incomes.map(elt=>elt.name),

            datasets: [
              {
                backgroundColor:bgIncomes,
                data:
                  data.incomes.length == 0
                    ? [{ name: "NO DATA", sum: 100 }]
                    : data.incomes,
              },
            ],
          }}
        />
      </Grid>
      <Grid item xs={12} md={2} />
      <Grid item xs={8} md={4} justifyContent={"center"} textAlign={"center"}>
        <Title2 padding={"1rem 0"} color={"#DB2A35"} opacity={1}>
          Expenses
        </Title2>

        <Doughnut
          options={options}
          data={{
            labels:
              data.expenses.length == 0
                ? ["NO DATA"]
                :data.expenses.map(elt=>elt.name) ,
            datasets: [
              {
                data:
                  data.expenses.length == 0
                    ? [{ name: "NO DATA", sum: 100 }]
                    : data.expenses,
                backgroundColor:bgExpenses
              },
            ],
          }}
        />
      </Grid>
    </Grid>
  );
}

export default PieChart;
