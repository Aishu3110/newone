module.exports = function() {
    var mysqlExecute = require('../db/db.js')


    this.addIncomeData = (auth) => {
        var output = {}
        return new Promise(async function(resolve) {
            var output = {}
            try {
                var mysqlExecuteCall = new mysqlExecute()
                var query = "SELECT InvoiceNumber from income_table where InvoiceNumber=? and IsDeleted=0"
                var queryRequest = [auth.body.InvoiceNumber]
                var addincomeResponse = await mysqlExecuteCall.executeWithParams(query, queryRequest)
                if (addincomeResponse.error == 'false') {
                    resolve(addincomeResponse)
                } else {
                    resolve(addincomeResponse)
                }
            } catch (err) {
                err.error = "true"
                err.message = message.OOPS_auth_data_access_error
                resolve(err)
            }
        })
    }
}