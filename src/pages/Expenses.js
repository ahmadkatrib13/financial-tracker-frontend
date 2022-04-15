import React, { useState, useRef, useCallback, useEffect } from "react";
import Title1 from "../components/kit/Title1";
import Column from "../components/kit/Column";
import Row from "../components/kit/Row";
import { ReactComponent as TodaySVG } from "../assets/images/TodayRed.svg";
import { ReactComponent as MonthSVG } from "../assets/images/MonthRed.svg";
import { ReactComponent as YearSVG } from "../assets/images/YearRed.svg";
import { ReactComponent as ExpenseSVG } from "../assets/images/BlueExpenses.svg";
import SmallCard from "../components/Dashboard/SmallCard";
import TransactionCard from "../components/Expenses/TransactionCard";
import AddTransactionCard from "../components/Expenses/AddTransactionCard";

import Button from "../components/kit/Button";
import { Card, Collapse } from "@mui/material";
import axios from "axios";
import Cookies from "universal-cookie";



function Expenses() {
  const cookies = new Cookies();
  const token = cookies.get("TOKEN");
  const headers = {headers: {Authorization: "Bearer " + token}}
  const [categories, setCategories] = useState([]);
  const [addMode, setAddMode] = useState(false);
  const [query, setQuery] = useState("");
  const [pageNumber, setPageNumber] = useState(1);
  const [transactions,setTransactions] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)
  const [hasMore, setHasMore] = useState(false)
  const [requestNb,setRequestNb] =useState(0);
  const [amounts, setAmounts] = useState({
    this_day: "__",
    this_month: "__",
    this_year: "__",
    current: "__"
})

  useEffect(()=>{
    axios({
      method: 'GET',
      url: `${process.env.REACT_APP_API_URI}api/transactions/total/expenses`,
      ...headers
      }).then(res => {
        setAmounts(res.data.data);
      })
    
  },[transactions])
  
  useEffect(() => {
    setTransactions([])
  }, [query])

  useEffect(() => {
    setLoading(true)
    setError(false)
    axios({
      method: 'GET',
      url: `${process.env.REACT_APP_API_URI}api/transactions/expenses?page=${pageNumber}`,
      // params: { q: query, page: pageNumber },
            ...headers,

    }).then(res => {
      setTransactions(prevTransactions => {
        return [...prevTransactions, ...res.data.data.data]
      })
      setHasMore(res.data.data.to > 0)
      setLoading(false)
    }).catch(e => {
      if (axios.isCancel(e)) return
      setError(true)
    })
  }, [query, pageNumber])
  
  const observer = useRef(null);
  const lastTransactionEltRef = useCallback(
    (node) => {
      if (loading) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          setPageNumber((prevPageNumber) => prevPageNumber + 1);
        }
      });
      if (node) observer.current.observe(node);
    },
    [loading, hasMore]
  );

  useEffect(() => {
    const getCategories = async () => {
      try {
        let res = await axios({
          method: "GET",
          url: `${process.env.REACT_APP_API_URI}api/categories/expense`,
          ...headers
        });

        setCategories(res.data.data);
        console.log(res);
      } catch (err) {
        console.log(err);
      }
    };
    getCategories();
  }, []);

const sortbyDates = (a,b)=>{
  const a_date_time = new Date(a.date_time).getTime();
  const b_date_time = new Date(b.date_time).getTime();
  const a_updated_at = new Date(a.updated_at).getTime();
  const b_updated_at = new Date(b.updated_at).getTime();
  if(b_date_time == a_date_time) return b_updated_at - a_updated_at;
  return b_date_time - a_date_time;
}

const pushRecord=(t)=>{
  setRequestNb(old=>{return old+1});
  }

  useEffect(()=>{
    setTransactions([]);
    setPageNumber(1);

    setLoading(true)
    setError(false)
  },[requestNb])
  
  const editRecord=(t,index)=>{
    setTransactions(state=>{
      let newState = [...state]
      newState.splice(index,1,t);
      newState.sort(sortbyDates);
      return newState    })
  }
  const deleteRecord = (index) => {
    setTransactions((state) => {
      if (state.length == 1) return [];
      state.splice(index, 1);
      state.sort(sortbyDates);
      return [...state];
    });
  };
  useEffect(()=>{
    console.log(transactions)
  },[transactions])


  return (
    <>
      <Title1>Overview</Title1>
      <Row grow="1">
        <Column grow="1">
          <SmallCard
            title="Today"
            color1="#000"
            color2="#DB2A35"
            currency="$"
            value={Number(amounts.this_day).toLocaleString()}
            opacity="1"
            img={<TodaySVG />}
          />
          <SmallCard
            title="This Month"
            color2="#DB2A35"
            currency="$"
            value={Number(amounts.this_month).toLocaleString()}
            img={<MonthSVG />}
          />
        </Column>
        <Column grow="1">
          <SmallCard
            title="This Year"
            color2="#DB2A35"
            currency="$"
            value={Number(amounts.this_year).toLocaleString()}
            img={<YearSVG />}
            gap="1rem"
          />
          <SmallCard
            title="Current"
            color2="#DB2A35"
            currency="$"
            value={Number(amounts.current).toLocaleString()}
            img={<ExpenseSVG />}
          />
        </Column>
      </Row>
      <Row top="2rem" justify="space-between" align="center" grow="0">
        <Title1>Latest Expenses</Title1>
        <Button
          onPress={() => {
            setAddMode(!addMode);
          }}
        >
          {addMode ? "Cancel" : "ADD +"}
        </Button>
      </Row>
      <Column top="1rem">
        <Collapse in={addMode}>
          <AddTransactionCard categories={categories} pushRecord={pushRecord} closeAddMode={()=>{setAddMode(false)}} />
        </Collapse>
        {transactions.map((transaction, index) => {
          if (transactions.length === index + 1) {
            return (
              <div ref={lastTransactionEltRef} key={index}>
                <TransactionCard
                  margin="0"
                  color="#2ADB91"
                  transaction={transaction}
                  categories={categories}
                />
              </div>
            );
          } else {
            return (
              <div key={index}>
                <TransactionCard
                  key={index}
                  index={index}
                  margin="0"
                  color="#2ADB91"
                  transaction={transaction}
                  categories={categories}
                  editRecord={editRecord}
                  deleteRecord={deleteRecord}
                />
              </div>
            );
          }
        })}
        <Card>{loading && "Loading..."}</Card>
        <Card>{error && "Error"}</Card>
      </Column>
      {loading && (
        <div style={{ "text-align": "center", padding: "1rem" }}>
          Loading...
        </div>
      )}
      {error && (
        <div style={{ "text-align": "center", padding: "1rem" }}> error</div>
      )}
      {!hasMore && (
        <div style={{ "text-align": "center", padding: "1rem" }}>
          end of page
        </div>
      )}
    </>
  );
}

export default Expenses;
