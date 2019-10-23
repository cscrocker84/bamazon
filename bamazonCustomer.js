require("dotenv").config();
var mysql = require("mysql");
var inquirer = require("inquirer");

var connection = mysql.createConnection({
    host: "localhost",

    // Your port; if not 3306
    port: 3306,

    // Your username
    user: "root",

    // Your password
    password: "Ohiosucks11",
    database: "bamazon_db"
});

connection.connect(function(err){
    if(err) throw err
    console.log("connected")
    startBamazon()
});

function startBamazon(){
    inquirer.prompt([
        {
            type: "list",
            message: "please select [Products] to view and purcase products or [Exit] to exit application",
            choices: ["Products", "Exit"],
            name: "choice"
        }
    ]).then(function(answer){
        if(answer.choice === "Products"){
            loadProducts();
        } else{
            connection.end();
        }
    })
}

function loadProducts(){
    // display all products available to purchase
    connection.query("SELECT * FROM products", function(err, res){
        if(err) throw err
        console.table(res)
        // run function to allow customer to purchase a product
        buyProducts()
    })
}