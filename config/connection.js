var mysql = require("mysql");
var Sequelize;

// if (process.env.JAWSDB_URL) {
// 	connection = mysql.createConnection(process.env.JAWSDB_URL) 
// } else {
var sequelize = new Sequelize ({"time_bank",
	port: 3306,
	host: "127.0.0.1",
	dialect: "mysql"
	// user: "root",
	// password: "", 
	// database: "time_bank_db"
});
// }



module.exports = sequelize;