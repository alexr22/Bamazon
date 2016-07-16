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

	console.log('Data received from Db:\n');
	for (var i=0; i<rows.length; i++) {
	//console log the id, product, department, and price for the customer
	console.log("ID: " + rows[i].id + ", Product: " + rows[i].ProductName + ", Department: " + rows[i].DepartmentName + ", Price: $" + rows[i].Price);
	}
	function getId() {
		var self = this;
		prompt.get(['chooseId'], function(err, result) {
			parseInt(result.chooseId);
			result.chooseId--;
			console.log('The item you chose is: ' + rows[result.chooseId].ProductName);

			prompt.get(['howMany'], function(err, res) {
				parseInt(res.howMany);
				parseInt(rows[result.chooseId].StockQuantity);
					if (res.howMany > rows[result.chooseId].StockQuantity) {
						console.log("Sorry, we don't have enough " + rows[result.chooseId].ProductName + "'s");
					}else {
						console.log("Okay! You just bought " + res.howMany + " " + rows[result.chooseId].ProductName + "'s for $" + rows[result.chooseId].Price * res.howMany);
						rows[result.chooseId].StockQuantity = rows[result.chooseId].StockQuantity - res.howMany;
						console.log("New stock quantity: " + rows[result.chooseId].StockQuantity)
					}
					getId();
			})
		})
	}

	getId();

});


