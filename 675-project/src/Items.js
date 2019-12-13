import React, { useState, useEffect } from 'react';
import logo from './logo.svg';
import './App.css';
import { func } from 'prop-types';
const axios = require('axios');


function Items() {

    const [Data, setData] = useState([]);
    // const [dlist, setDlist] = useState([]);

    const fetchItems = async () => {
        let response = await axios.get(`/getBooks`);

        const bookslist =
            response.data.map((allData) =>
                <div className="itembox">
                    <div className="col" key={allData.Item_Id}>
                        <div className="centerDiv">
                            <div className="row">
                                <img src="https://www.shareicon.net/data/128x128/2015/09/28/648009_school_512x512.png" />
                            </div>
                        </div>


                        <div><h6>${allData.Price}</h6></div>
                        <div>{allData.Book_Name}</div>
                        <div>{allData.Author}</div>
                        <div>{allData.Subject}</div>
                        <div>{allData.ISBN}</div>
                    </div>
                </div>
            );


        setData(bookslist);
        console.log(response.data);
    }
    // cannot use async function directly in useEffect
    useEffect(() => { fetchItems(Data) }, [Data]);


    return (
        <div>

            <h1>Text Books</h1>

            <div className="row ">

                {Data}


            </div>


        </div>

    );
}

export default Items;