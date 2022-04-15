import React, { useState, useEffect } from "react";
import { Line, Bar } from "react-chartjs-2";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  LineController,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import axios from "axios";
import Cookies from "universal-cookie";
import Row from "../../kit/Row";
import {
  MdOutlineArrowBackIos,
  MdOutlineArrowForwardIos,
} from "react-icons/md";
import NextBackButtons from "../NextBackButtons";
import CheckBoxes from "../CheckBoxes";
import TimeType from "../TimeType";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  LineController,

  Title,
  Tooltip,
  Legend,
  PointElement,
  LineElement,
  
);

function LineChart(props) {
  const cookies = new Cookies();
  const token = cookies.get("TOKEN");
  const headers = { headers: { Authorization: "Bearer " + token } };

  const [data, setData] = useState([]);
  const [value, setValue] = useState("monthly");
  const [range, setRange] = useState(0);
  const [check, setCheck] = useState({});
  useEffect(() => {
    console.log(
      `${process.env.REACT_APP_API_URI}api/transactions/${value}?range=${range}`
    );
    let getData = async () => {
      axios({
        method: "GET",
        url: `${process.env.REACT_APP_API_URI}api/transactions/${value}?range=${range}`,
        ...headers,
      }).then((res) => {
        console.log(res.data.data);
        setData(res.data.data);
      });
    };
    getData();
  }, [value, range]);

  const options = {
    responsive: true,
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

  let chartData = {
    labels: data.map((elt) => elt.x),
    datasets: [
      {
        label: "total",
        data: data,
        backgroundColor: "#3358df",
        borderColor: "#3358df",
        hidden: check.total,
        type: "line",
        parsing: {
          yAxisKey: "total",
        },
      },
      {
        label: "income",
        data: data,
        backgroundColor: "#2adb86",
        borderColor: "#2adb86",
        hidden: check.income,

        parsing: {
          yAxisKey: "income",
        },
      },
      {
        label: "expense",
        data: data,
        backgroundColor: "#DB2A35",
        borderColor: "#DB2A35",
        hidden: check.expense,

        parsing: {
          yAxisKey: "expense",
        },
      },
    ],
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        width: "80%",
      }}
    >
      <Row width="100%" justify="space-between" align="center" grow="1">
        <Row>
          <NextBackButtons setRange={setRange} range={range} />
          <CheckBoxes setCheck={setCheck} />
        </Row>
        <TimeType setRange={setRange} setValue={setValue} />
      </Row>
      <div style={{ width: "100%", padding: "2rem 0 0 0 " }}>
        <Bar options={options} data={chartData} />
      </div>
    </div>
  );
}

export default LineChart;
