var mysql = require('mysql');
var prompt = require('prompt');

prompt.start();

var con = mysql.createConnection({
	host: "localhost",
	port: 3306,
	user: "root",
	password: "",
	database: "Bamazon"
})

con.connect(function(err){
  if(err){
    console.log('Error connecting to Db');
    return;
  }
  console.log('Connection established');
});

con.query('SELECT * FROM Products',function(err,rows){
	if(err) throw err;

	function manager() {
		console.log('1. View Products for Sale\n2. View low inventory\n3. Add to inventory\n4. Add new product');
		prompt.get(['chooseOption'], function(err, res) {
			parseInt(res.chooseOption);
			if (res.chooseOption == 1) {
				for (var i=0; i<rows.length; i++) {
					console.log("ID: " + rows[i].id + ", Product: " + rows[i].ProductName + ", Department: " + rows[i].DepartmentName + ", Price: $" + rows[i].Price);
				}
				console.log("\n");
				manager();

			}else if (res.chooseOption == 2) {
				for (var i=0; i<rows.length; i++) {
					if (rows[i].StockQuantity < 5) {
						console.log("Only " + rows[i].StockQuantity + " " + rows[i].ProductName + "s remaining.\n");
					}
				}
				manager();

			}else if (res.chooseOption == 3) {
				function addInv() {
					for (var i  = 0; i<rows.length; i++) {
						console.log("ID: " + rows[i].id + ", Product: " + rows[i].ProductName + ", Stock Quantity: " + rows[i].StockQuantity);
						}
					prompt.get(["chooseIdToAdd"], function(err, res) {
						parseInt(res.chooseIdToAdd);
						res.chooseIdToAdd--;
						console.log("Adding more " + rows[res.chooseIdToAdd].ProductName + "s")
							prompt.get(["howManyMore"], function(err, response) {
								parseInt(response.howManyMore);
								rows[res.chooseIdToAdd].StockQuantity = parseInt(rows[res.chooseIdToAdd].StockQuantity) + parseInt(response.howManyMore);
								console.log("There are now " + rows[res.chooseIdToAdd].StockQuantity + " " + rows[res.chooseIdToAdd].ProductName + "s");					
							})
						return false;
					})
				}
				addInv();

				
			}else if (res.chooseOption == 4) {
				console.log(rows[rows.length-1]);
				prompt.get(["newProduct"], function(err, res) {
					console.log(rows.ProductName)
					rows[rows.length + 1].ProductName.push(res.newProduct)
					console.log(rows)
				})
				
			}else{
				console.log("Please enter a number between 1 and 4");
				manager();
			}
		})

	}
	manager()

})