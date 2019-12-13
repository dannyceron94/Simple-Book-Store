import React, { useState, useEffect } from 'react';
import logo from './logo.svg';
import './App.css';
// import { disconnect } from 'cluster';
const axios = require('axios');

function Users() {

  const [Data, setData] = useState([]);
  const [orderName, setOrderName] = useState('');
  const fetchData = () => {
    const body = {
      name: orderName,
    };
    console.log(body)
    axios.post('/findOrder', body)
      .then((res) => {
        console.log(res.data);
        if(res.data==='Data not found'){
          setData(res.data);
        }
        const orders = res.data.map((order) =>
          // console.log(order.Order_Id)

          <div className="orderBox">
            <div className="row">
              <div className="col">{order.Customer_Id}</div>
              <div className="col">{order.Order_Id}</div>
            </div>

          </div>
        );
        
        setData(orders);
      }).catch(console.log)
  }
  return (
    <div className="Fscreen">

      <div className="searchbox">
        <div className="searchBar">
          <input value={orderName} placeholder="Enter Customer ID"
            onChange={e => { setOrderName(e.target.value) }} />
          <button onClick={fetchData}> search Orders</button>

        </div>
        <div className="oderBox">
          <div className="row">
            <div className="col">Cotumer ID</div>
            <div className="col">Order ID</div>
          </div>
        </div>
        {Data}
      </div>
      <div className="footer">
        about footer
        </div>
    </div>

  );
}

export default Users;
