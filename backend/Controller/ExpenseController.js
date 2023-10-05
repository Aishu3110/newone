
module.exports = function() {
    var expenseServices = require('../service/ExpenseService')

    this.addExpenseController = async (req, callback) => {
        var response = {}
        var expenseServiceObject = new expenseServices()
        var expenseService = await expenseServiceObject.addExpenseService(req)
        if (expenseService.error == "true") {
            
            response.error = "true"
            response.message = expenseService.message
            response.status=expenseService.status
        } else {
            response.error = "false"
            response.message = expenseService.message
            response.data = expenseService.result
             response.status=expenseService.status
        }
        
        callback(response)
    }

        this.getTotalExpenseController = async (req, callback) => {
        var response = {}
      var expenseServiceObject = new expenseServices()
        var expenseService = await expenseServiceObject.getTotalExpenseService(req)
         
        if (expenseService.error == "true") {
           
            response.error = "true"
            response.message = expenseService.message
            response.status=expenseService.status
        } else {
            response.error = "false"
            response.data = expenseService.data
        }
        
        callback(response)
    }

     this.updateExpenseController = async (req, callback) => {
        var response = {}
      var expenseServiceObject = new expenseServices()
        var expenseService = await expenseServiceObject.updateExpenseService(req)
        if (expenseService.error == "true") {
            
            response.error = "true"
            response.message = expenseService.message
            response.status=expenseService.status
        } else {
            response.error = "false"
            response.message = expenseService.message
            response.data = expenseService.result
             response.status=expenseService.status
        }
        
        callback(response)
    }

      this.deleteExpenseController = async (req, callback) => {
        var response = {}
      var expenseServiceObject = new expenseServices()
        var expenseService = await expenseServiceObject.deleteExpenseService(req)
        if (expenseService.error == "true") {
            
            response.error = "true"
            response.message = expenseService.message
            response.status=expenseService.status
        } else {
            response.error = "false"
            response.message = expenseService.message
            response.data = expenseService.result
             response.status=expenseService.status
        }
        
        callback(response)
    }

        this.getTotalExpenseController = async (req, callback) => {
        var response = {}
      var expenseServiceObject = new expenseServices()
        var expenseService = await expenseServiceObject.getTotalExpenseService(req)
         
        if (expenseService.error == "true") {
           
            response.error = "true"
            response.message = expenseService.message
            response.status=expenseService.status
        } else {
            response.error = "false"
            response.data = expenseService.data
        }
        
        callback(response)
    }

    
        this.getIndirectTotalExpenseController = async (req, callback) => {
        var response = {}
        var expenseServiceObject = new expenseServices()
        var expenseService = await expenseServiceObject.getIndirectTotalExpenseService(req)
         
        if (expenseService.error == "true") {
           
            response.error = "true"
            response.message = expenseService.message
            response.status=expenseService.status
        } else {
            response.error = "false"
            response.data = expenseService.data
        }
        
        callback(response)
    }


       this.getListExpenseController = async (req, callback) => {
        var response = {}
     var expenseServiceObject = new expenseServices()
        var expenseService = await expenseServiceObject.getListExpenseService(req)
         console.log(expenseService)
        if (expenseService.error == "true") {
           
            response.error = "true"
            response.message = expenseService.message
            response.status=expenseService.status
        } else {
            response.error = "false"
            response.data = expenseService.data
        }
        
        callback(response)
    }

}


