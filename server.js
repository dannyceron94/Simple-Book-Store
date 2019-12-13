const express = require('express');
const mysql = require('mysql');
const app = express();
app.use(express.json());//need this to be able to parse requests
// const express = require('express');

//connection to sql
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    datebase: 'my_db'
});
db.connect((err, res) => {
    if (err) {
        console.log(err);
    }
    
    var sql = "USE my_db";
    db.query(sql, function (err, result) {
        if (err) throw err;
        console.log("database scuccesfully selected");
    });
});



//create database
app.get('/createdb', (req, res) => {
    let sql = 'CREATE DATABASE my_db'
    db.query(sql, (err, result) => {
        if (err) {
            throw err;
        }
        res.send('database createsd');


    });
});

//create tables
app.get('/customertable', (req, res) => {
    let sql = 'CREATE TABLE Customers (Customer_Id INTEGER, Name VARCHAR(30),Address 	VARCHAR(30),Phone VARCHAR(30),Email VARCHAR(30),Password VARCHAR(30),PRIMARY KEY (Customer_Id))';
    db.query(sql, (err, result) => {
        if (err) throw err;
        console.log(result);
        res.send('Customers table created');
    });
});
app.get('/books', (req, res) => {
    let sql = 'CREATE TABLE Books (' +
        'Item_Id 	     	INTEGER,' +
        'Book_Name		VARCHAR(30),' +
        'Author 	     	VARCHAR(30),' +
        'ISBN   	     	VARCHAR(30),' +
        'Subject  	    	VARCHAR(30),' +
        'Publisher		VARCHAR(30),' +
        'Price			FLOAT,' +
        'Quantity		INTEGER,' +
        'PRIMARY KEY (Item_Id)' +
        ')';
    db.query(sql, (err, result) => {
        if (err) throw err;
        console.log(result);
        res.send('Customers table created');
    });
});
app.get('/orders', (req, res) => {
    let sql = 'CREATE TABLE Orders (' +
        'Order_Id 	     	INTEGER,' +
        'Item_Id 	     	INTEGER,' +
        'Date		     	DATE,' +
        'Quantity 	     	INTEGER,' +
        'Total_Price   	     	FLOAT,' +
        'Customer_Id      	INTEGER,' +
        'Shipping_Address	VARCHAR(30),' +
        'PRIMARY KEY (Order_Id),' +
        'FOREIGN KEY (Customer_Id) REFERENCES Customers(Customer_Id))';
    db.query(sql, (err, result) => {
        if (err) throw err;
        console.log(result);
        res.send('Customers table created');
    });
});

app.get('/clothes', (req, res) => {
    let sql = 'CREATE TABLE Clothes (' +
        'Item_Id 	     	INTEGER,' +
        'Item_Name		VARCHAR(30),' +
        'Clothes_Type    	VARCHAR(30),' +
        'Color   	     	VARCHAR(30),' +
        'Size	  	    	VARCHAR(30),' +
        'Price			FLOAT,' +
        'Quantity		INTEGER,' +
        'PRIMARY KEY (Item_Id)' + ')';
    db.query(sql, (err, result) => {
        if (err) throw err;
        console.log(result);
        res.send('Customers table created');
    });
});



//inser into table
app.get('/inseruser', (req, res) => {
    var count = 3;
    while (count < 10) {
        var sql = "INSERT INTO Orders (Order_Id, Item_Id, Date, Quantity, Total_Price, Customer_Id, Shipping_Address)"
                                    + "VALUES (1"+count+",3,'2020-01-20',1,35.32,(SELECT C.Customer_Id FROM Customers C Where C.Customer_Id="+count+"),'N/A')";
        db.query(sql, (err, result) => {
            if (err) throw err;
            console.log('usr added');
        })
        count++;
    }

    res.send('user was added');
});
app.get('/insert', (req, res) => {
   

    var sql = "INSERT INTO Customers (Item_Id ,Book_Name, Author, ISBN, Subject, Publisher , Price, Quantity )"
            + "VALUES (1,'Basic Physics','J. Wiley','9780471134473','physics','Karl F','17.82','10'),(2,'Calculus'"+
            ",'Morries','97804711343','Mathematics','Dover','24.49','5'),(3,'Algorithms','Roberts Sed','9780471112345',"+
            "'Computer Science','Addison','35.32','15'),(4,'Nineteen','George Owel','9780471154321','English','Everyman','15.99','8')";
    db.query(sql, (err, result) => {
        if (err) throw err;
        console.log('usr added');
    });
    


    res.send('user was added');
});


//getuserdata
app.get('/getusers', (req, res) => {
    var sql = "SELECT * FROM Customers";
    db.query(sql, (err, result) => {
        if (err) throw err;
        console.log(result);
        res.send(result);
    });
});

app.get('/getBooks', (req, res) => {
    var sql = "SELECT * FROM Books";
    db.query(sql, (err, result) => {
        if (err) throw err;
        console.log(result);
        res.send(result);
    });
});

app.post('/findOrder*',(req, res)=>{
    console.log(req.body.name);
    var sql = "SELECT Order_Id, Customer_Id"+" FROM orders"+" WHERE Customer_Id = "+req.body.name;
    db.query(sql, (err, result) => {
        if (err){
            console.log(err);
        }
        if(result==""){
            result = "Data not found";
        } 
        console.log(result);
        res.send(result);
    });
})

app.listen('3000', (err, result) => {
    console.log('server running');
})