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
});

function managerAction(){

	inquirer.prompt([
		{
			type: "list",
			name: "action",
			message: "What would you like to do?",
			choices: ["View products for sale", "View low inventory", "Add to inventory", "Add new product"],
			filter: function(val){
				if (val === "View products for sale"){
					return "viewAll";
				} else if (val === "View low inventory"){
					return "lowInventory";
				} else if (val === "Add to inventory"){
					return "addInventory";
				} else if (val === "Add new product"){
					return "addProduct";
				}

			}
		}

		]).then(function(answers){
			console.log(answers);
			console.log(JSON.stringify(answers));
			if(answers.action === "viewAll"){
				viewAllInventory();
			} else if (answers.action === "lowInventory"){
				viewLowInventory();
			} else if (answers.action === "addInventory"){
				addInventory();
			} else if (answers.action === "addProduct"){
				addNewProduct();
			}
		});
};

function viewAllInventory(){
	console.log("Here are the products for sale");
	connection.query("SELECT * FROM products", function(error, response){
		if(error){
			console.log(error);
		}
		console.log(response);
		for(var i = 0; i < response.length; i++){
			console.log("ID: " + response[i].item_id + "\nITEM: " + response[i].product_name + "\nPrice: " + response[i].price + "\nQuantity: " + response[i].stock_quantity + "\n------------------");
		}
	})
}

function viewLowInventory(){
	console.log("Here is inventory with fewer than five units in stock.");
	connection.query("SELECT * FROM products WHERE stock_quantity < 5", function(error, response){
		if(error){
			console.log(error);
		}
		console.log(response);
		for (var i = 0; i < response.length; i++){
			console.log("WARNING! There are fewer than 5 units in stock for these items!\nID: " + response[i].item_id + "\nItem: " + response[i].product_name);
		}
	})
}

function addInventory(){
	console.log("Now you can add more inventory");
	inquirer.prompt([
{
	type:"input",
	message: "Please enter the ID of the item whose quantity you want to increase",
	name: "item"
},
{
	type:"input",
	message: "How many units would you like to add?",
	name: "units"
}
		]).then(function(answers){
			var itemToAdd = answers.item;
			var quantityToAdd = parseInt(answers.units);
			var currentStock;	
			var itemName = "";

			var query = "SELECT * FROM products WHERE ?";
			connection.query(query, {item_id: itemToAdd}, function(error, results){
				if(error){
					console.log(error);
				}
				
				for (var i = 0; i < results.length; i++){
					currentStock=parseInt(results[i].stock_quantity);
					console.log("Current Stock: " + currentStock);
					console.log("Adding " + quantityToAdd + " units of " + results[i].product_name + ".");
				}
				
				var updateQuery = "UPDATE products SET ? WHERE ?";
				connection.query(
					updateQuery,
					[
						{
							stock_quantity: currentStock+quantityToAdd
						},
						{
							item_id: itemToAdd
						}

					],
					function(error){
						if(error){
							console.log(error);
						}
						console.log("Successfully added.");
					})
			})
		})
}

function addNewProduct(){
	console.log("Now you can add a new product");
}

managerAction();


