
module.exports = function() {
    var addIncomeRepo = require('../repository/IncomeRepository')
    
   

    this.addIncomeService = (incomeData) => {
      
        return new Promise(async function(resolve) {
            var response = {}
            var resp = {}
            var incomedataObject = new addIncomeRepo()
            try {
                var addIncomeresult = await incomedataObject.addIncomeData(incomeData)
            
                if (addIncomeresult.result.length > 0) {
                  
                    if (addIncomeresult.error == 'true') {
                       
                        response.error = "true"
                        response.message = "already exists"
                        response.status=addIncomeresult.status
                        resolve(response)
                    } else {
                       
                            response.error = "false"
                            response.message = "record inserted"
                            response.status=addIncomeresult.status
                            response.result = resp
                           
                            resolve(response)
                         
                    }
                } else {
                    response.error = "false"
                    response.message = "record inserted"
                    response.status=addIncomeresult.status
                    resolve(response)
                }
            } catch (err) {
                response.error = "true"
                response.message = "OOPS Service Error"
                resolve(response)
            }
        })
    }

      this.updateIncomeService = (incomeData) => {
      
        return new Promise(async function(resolve) {
            var response = {}
            var resp = {}
            var incomedataObject = new addIncomeRepo()
            try {
                var addIncomeresult = await incomedataObject.updateIncomeData(incomeData)
           
                if (addIncomeresult.result.length > 0) {
                
                    if (addIncomeresult.error == 'true') {
                       
                        response.error = "true"
                        response.message = "already exists"
                        response.status=addIncomeresult.status
                        resolve(response)
                    } else {
                      
                            response.error = "false"
                            response.message = "record inserted"
                            response.status=addIncomeresult.status
                            response.result = resp
                          
                            resolve(response)
                         
                    }
                } else {
                    response.error = "false"
                    response.message = "record inserted"
                    response.status=addIncomeresult.status
                    resolve(response)
                }
            } catch (err) {
                response.error = "true"
                response.message = "OOPS Service Error"
                resolve(response)
            }
        })
    }

       this.deleteIncomeService = (incomeData) => {
      
        return new Promise(async function(resolve) {
            var response = {}
            var resp = {}
            var incomedataObject = new addIncomeRepo()
            try {
                var addIncomeresult = await incomedataObject.deleteIncomeData(incomeData)
              
               
                   
                    if (addIncomeresult.error == 'true') {
                       
                        response.error = "true"
                        response.message = "record not found"
                        response.status=addIncomeresult.status
                        resolve(response)
                    } else {
                      
                            response.error = "false"
                            response.message = "record deleted"
                            response.status=addIncomeresult.status
                          
                            resolve(response)
                         
                    }
               
            } catch (err) {
                response.error = "true"
                response.message = "OOPS Service Error"
                resolve(response)
            }
        })
    }
    
    this.getTotalIncomeService = (incomeData) => {
      
        return new Promise(async function(resolve) {
            var response = {}
            var resp = {}
            var incomedataObject = new addIncomeRepo()
            try {
                var getTotalIncomeresult = await incomedataObject.getTotalIncomeData(incomeData)
            
                if (getTotalIncomeresult.result.length > 0) {
                   
                    if (getTotalIncomeresult.error == 'false') {
                    
                        response.error = "false"
                        response.data=getTotalIncomeresult.result[0]
                       
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

     this.getUnpaidTotalIncomeService = (incomeData) => {
      
        return new Promise(async function(resolve) {
            var response = {}
            var resp = {}
            var incomedataObject = new addIncomeRepo()
            try {
                var getTotalIncomeresult = await incomedataObject.getUnpaidTotalIncomeData(incomeData)
            
                if (getTotalIncomeresult.result.length > 0) {
                   
                    if (getTotalIncomeresult.error == 'false') {
                    
                        response.error = "false"
                        response.data=getTotalIncomeresult.result[0]
                       
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


     this.getListIncomeService = (incomeData) => {
      
        return new Promise(async function(resolve) {
            var response = {}
            var resp = {}
            var incomedataObject = new addIncomeRepo()
            try {
                var getTotalIncomeresult = await incomedataObject.getListIncomeData(incomeData)
           
          
                if (getTotalIncomeresult.result.length > 0) {
                   
                    if (getTotalIncomeresult.error == 'false') {
                    
                        response.error = "false"
                        response.data=getTotalIncomeresult.result
                       
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