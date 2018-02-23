var mysql = require("mysql");
var inquirer = require("inquirer");

var connection = mysql.createConnection({
	host: "localhost",
	port: 3306,

	user: "root",
	password: "",
	database: "bamazon"
});

//establishing connection with mysql database
connection.connect(function(error){
	if(error){
		console.log(error);
	}
	console.log("You are connected as ID " + connection.threadId);
	queryAll();
	
});

//displays all available products to the user along with their price and id
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
			console.log("----------------------------------------");			
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
		var query = "SELECT * FROM products WHERE ?";
		connection.query(query, {item_id: answer.idToBuy}, function(error, results){			
			var unitsRemaining;
			var unitPrice;
			for (var i = 0; i < results.length; i++){				
				unitsRemaining = results[i].stock_quantity;
				unitPrice = results[i].price;
				
			}

			//console.log(unitsRemaining);
			//if there is enough stock, subtract requested units from that item's remaining stock
			if(answer.units <= unitsRemaining){				
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
						console.log("Thank you for shopping with Bamazon. Your order has been placed.");
						console.log("The total for your purchase is: " + (unitPrice*answer.units).toFixed(2));
					}

					);
				//if there is not enough stock, let the user know
			} else {
				console.log("Sorry, we do not currently have enough stock to place your order.");
				chooseItem();
			}

		});
	});
};




