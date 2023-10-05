
module.exports = function() {
    var expenseRepo = require('../repository/ExpenseRepository')
    
   

    this.addExpenseService = (incomeData) => {
      
        return new Promise(async function(resolve) {
            var response = {}
            var resp = {}
            var expensedataObject = new expenseRepo()
            try {
                var expenseresult = await expensedataObject.addExpenseData(incomeData)
            
                if (expenseresult.result.length > 0) {
                  
                    if (expenseresult.error == 'true') {
                       
                        response.error = "true"
                        response.message = "already exists"
                        response.status=expenseresult.status
                        resolve(response)
                    } else {
                       
                            response.error = "false"
                            response.message = "record inserted"
                            response.status=expenseresult.status
                            response.result = resp
                           
                            resolve(response)
                         
                    }
                } else {
                    response.error = "false"
                    response.message = "record inserted"
                    response.status=expenseresult.status
                    resolve(response)
                }
            } catch (err) {
                response.error = "true"
                response.message = "OOPS Service Error"
                resolve(response)
            }
        })
    }

      this.updateExpenseService = (incomeData) => {
      
        return new Promise(async function(resolve) {
            var response = {}
            var resp = {}
            var expensedataObject = new expenseRepo()
            try {
                var expenseresult = await expensedataObject.updateExpenseData(incomeData)
           
                if (expenseresult.result.length > 0) {
                
                    if (expenseresult.error == 'true') {
                       
                        response.error = "true"
                        response.message = "already exists"
                        response.status=expenseresult.status
                        resolve(response)
                    } else {
                      
                            response.error = "false"
                            response.message = "record inserted"
                            response.status=expenseresult.status
                            response.result = resp
                          
                            resolve(response)
                         
                    }
                } else {
                    response.error = "false"
                    response.message = "record inserted"
                    response.status=expenseresult.status
                    resolve(response)
                }
            } catch (err) {
                response.error = "true"
                response.message = "OOPS Service Error"
                resolve(response)
            }
        })
    }

       this.deleteExpenseService = (incomeData) => {
      
        return new Promise(async function(resolve) {
            var response = {}
            var resp = {}
            var expensedataObject = new expenseRepo()
            try {
                var expenseresult = await expensedataObject.deleteExpenseData(incomeData)
              
               
                   
                    if (expenseresult.error == 'true') {
                       
                        response.error = "true"
                        response.message = "record not found"
                        response.status=expenseresult.status
                        resolve(response)
                    } else {
                      
                            response.error = "false"
                            response.message = "record deleted"
                            response.status=expenseresult.status
                          
                            resolve(response)
                         
                    }
               
            } catch (err) {
                response.error = "true"
                response.message = "OOPS Service Error"
                resolve(response)
            }
        })
    }
    
    this.getTotalExpenseService = (incomeData) => {
      
        return new Promise(async function(resolve) {
            var response = {}
            var resp = {}
            var expensedataObject = new expenseRepo()
            try {
                var expenseresult = await expensedataObject.getTotalExpenseData(incomeData)
            
                if (expenseresult.result.length > 0) {
                   
                    if (expenseresult.error == 'false') {
                    
                        response.error = "false"
                        response.data=expenseresult.result[0]
                       
                        resolve(response)
                    } else {
                            response.error = "true"
                            response.message = "failed to fetch income rate"
                            resolve(response)
                         
                    }
                } else {
                    response.error = "true"
                    response.message = "No data"
                    resolve(response)
                }
            } catch (err) {
                response.error = "true"
                response.message = "OOPS Service Error"
                resolve(response)
            }
        })
    }

     this.getIndirectTotalExpenseService = (incomeData) => {
      
        return new Promise(async function(resolve) {
            var response = {}
            var resp = {}
            var expensedataObject = new expenseRepo()
            try {
                var expenseresult = await expensedataObject.getIndirectTotalExpenseData(incomeData)
            
                if (expenseresult.result.length > 0) {
                   
                    if (expenseresult.error == 'false') {
                    
                        response.error = "false"
                        response.data=expenseresult.result[0]
                       
                        resolve(response)
                    } else {
                            response.error = "true"
                            response.message = "failed to fetch income rate"
                            resolve(response)
                         
                    }
                } else {
                    response.error = "true"
                    response.message = "No data"
                    resolve(response)
                }
            } catch (err) {
                response.error = "true"
                response.message = "OOPS Service Error"
                resolve(response)
            }
        })
    }


     this.getListExpenseService = (incomeData) => {
      
        return new Promise(async function(resolve) {
            var response = {}
            var resp = {}
            var expensedataObject = new expenseRepo()
            try {
                var expenseresult = await expensedataObject.getListExpenseData(incomeData)
           
          
                if (expenseresult.result.length > 0) {
                   
                    if (expenseresult.error == 'false') {
                    
                        response.error = "false"
                        response.data=expenseresult.result
                       
                        resolve(response)
                    } else {
                            response.error = "true"
                            response.message = "failed to fetch income rate"
                            resolve(response)
                         
                    }
                } else {
                    response.error = "true"
                    response.message = "No data"
                    resolve(response)
                }
            } catch (err) {
                response.error = "true"
                response.message = "OOPS Service Error"
                resolve(response)
            }
        })
    }
}