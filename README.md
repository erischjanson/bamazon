# bamazon
Node.js and MySQL app

## Description:

This is a node command line interface program that acts as a simple online retailer. It uses a MySQL database along with the npm mysql and inquirer packages to present two views: one for customers and one for managers.  


### **Customer View**:

The customer view allows customers to view inventory and prices and to purchase products that are in stock.

A list of all available products, their ids, and their prices will display and the customer will be prompted to enter the ID of the item they want to purchase as well as the number of units. If there is sufficient inventory, the customer will receive confirmation of their order along with the total price. If there is not enough product in stock to fulfill the order, the customer will be notified and may adjust their order accordingly.

To begin the order process, follow the instructions below:

```
git clone git@github.com:erischjanson/bamazon.git //clone the repository
cd bamazon //navigate to the bamazon directory
npm install //install the dependencies
```
open mysql workbench and run the schema.sql file //create the bamazon database and products table in mysql
import or copy and paste the seed.sql file into your new products table //populate the products table with data
```
node bamazonCustomer.js // initiate the app from within the command line
```

**Customer View Demo:**
https://drive.google.com/file/d/18H0kcyCmgzfSfGqD7uaMLowG05c8h6cG/view


### **Manager View**:

The manager view allows managers to view and manage inventory. They can view items that will soon be out of stock, restock existing items, and even add new products to the database.

To begin using the manager's version of the product, please call the bamazonManager.js file from the command line using node. You will be prompted to select which action you'd like to perform and from there, the world (of bamazon) is your oyster!

```
git clone git@github.com:erischjanson/bamazon.git //clone the repository
cd bamazon //navigate to the bamazon directory
npm install //install the dependencies
```
open mysql workbench and run the schema.sql file //create the bamazon database and products table in mysql
import or copy and paste the seed.sql file into your new products table //populate the products table with data
```
node bamazonManager.js // initiate the app from within the command line
```

**Manager View Demo:**
https://drive.google.com/file/d/1XpS2Bq1Elfhj4IBDrhai1bXojgVHfK1t/view