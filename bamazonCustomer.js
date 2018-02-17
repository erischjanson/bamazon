var mysql = require("mysql");
var inquirer = require("inquirer");

var connection = mysql.createConnection({

	host: "localhost",
	port: 3306,

	user: "root",
	password: "",
	database: "bamazon"
});

connection.connect(function(error){
	if(error){
		console.log(error);
	}

	console.log("You are connected as ID " + connection.threadId);
	queryAll();
});

function queryAll(){
	connection.query("SELECT * FROM products", function(err, answer){
		if(err){
			console.log(err);
		}
		console.log(answer);		
		for (var i = 0; i < answer.length; i ++){
			console.log("ITEM: ", answer[i].product_name);
			console.log("PRICE: ", answer[i].price);
			console.log("ID: ", answer[i].item_id);
			console.log("\n");
			console.log("----------------------------------------")
			console.log("\n");
		}
	});

};



