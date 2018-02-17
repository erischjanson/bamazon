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

//returns all products along with their price and id
function queryAll(){
	connection.query("SELECT * FROM products", function(error, response){
		if(error){
			console.log(error);
		}
		
		console.log("ITEMS FOR SALE ON BAMAZON:" + "\n");		
		for (var i = 0; i < response.length; i ++){
			console.log("ITEM: ", response[i].product_name);
			console.log("PRICE: ", response[i].price);
			console.log("ID: ", response[i].item_id);
			console.log("\n");
			console.log("----------------------------------------")
			console.log("\n");
		}

		chooseItem();
	});

};

//inquirer prompts to find out what the user wants
function chooseItem(){

	inquirer.prompt([
{
	type:"input",
	message: "Enter the ID of the item you wish to purchase.",
	name: "idToBuy"
},

{
	type: "input",
	message: "How many units would you like to buy?",
	name: "units"
}
	]).then(function(answer){
		console.log(answer);
		var query = "SELECT * FROM products WHERE ?";
		connection.query(query, {item_id: answer.idToBuy}, function(error, results){
			console.log(results);
			var unitsRemaining;
			var unitPrice;
			for (var i = 0; i < results.length; i++){
				//console.log(results[i].stock_quantity);
				unitsRemaining = results[i].stock_quantity;
				unitPrice = results[i].price;
				//console.log(unitsRemaining);
			}

			console.log(unitsRemaining);
			//if there is enough stock, subtract requested units from that item's remaining stock
			if(answer.units <= unitsRemaining){
				console.log("Great! Let's go ahead and make your purchase");
				var query = "UPDATE products SET ? WHERE ?";
				connection.query(
					query,
					[
						{
							stock_quantity: unitsRemaining-answer.units
						},
						{
							item_id: answer.idToBuy
						}
					],
					function(error){
						if(error){
							console.log(error);
							
						}
						console.log("Bid place successfully");
						console.log("The total for your purchase is: " + unitPrice*answer.units);
					}

					);
				//if there is not enough stock, let the user know
			} else {
				console.log("Sorry, we do not currently have enough stock to place your order.");
			}

		});
	});
};




