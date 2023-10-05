// const mysql = require('mysql');
// const pool = mysql.createPool({
//       host:"localhost",
//     user:"root",
//     password:"aafiya.",
//     database:"finance"
// });
// module.exports = pool;

module.exports = function() {
    var mysql = require('mysql');
    //local mysql db connection

  const pool = mysql.createPool({
      host:"localhost",
    user:"root",
    password:"",
    database:"finance"
});


    this.executeWithParams = (requestQuery, params) => {
        var output = {}
        return new Promise(function(resolve) {
            try {
                pool.getConnection(function(err, connection) {
                    connection.query(requestQuery, params, function(error, results, fields) {
                        if (error) {
                            output.error = "true"
                            output.message = error
                            resolve(output)
                            connection.destroy()
                        } else {
                            output.error = "false"
                            output.message = error
                            output.result = results
                            resolve(output)
                            connection.destroy()
                        }
                    })
                })
            } catch (err) {
                err.error = "true"
                err.message = "OOPS Database Exception"
                resolve(err)
            }
        })
    }

    this.executeWithoutParams = (requestQuery) => {
        var output = {}
        return new Promise(function(resolve) {
            var output = {}
            try {
                pool.getConnection(function(err, connection) {
                    connection.query(requestQuery, function(error, results, fields) {
                        if (error) {
                            output.error = "true"
                            output.message = error
                            resolve(output)
                            connection.destroy()
                        } else {
                            output.error = "false"
                            output.message = error
                            console.log(results)
                            output.result = results
                            resolve(output)
                            connection.destroy()
                        }
                    })
                })
            } catch (err) {
                err.error = "true"
                err.message = "OOPS Database Exception"
                resolve(err)
            }
        })
    }

}