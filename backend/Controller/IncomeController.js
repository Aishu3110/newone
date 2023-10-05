
module.exports = function() {
    var incomeService = require('../service/IncomeService')

    this.addIncomeController = async (req, callback) => {
        var response = {}
        var addIncomeServiceObject = new incomeService()
        var addIncomeService = await addIncomeServiceObject.addIncomeService(req)
        if (addIncomeService.error == "true") {
            
            response.error = "true"
            response.message = addIncomeService.message
            response.status=addIncomeService.status
        } else {
            response.error = "false"
            response.message = addIncomeService.message
            response.data = addIncomeService.result
             response.status=addIncomeService.status
        }
        
        callback(response)
    }

        this.getTotalIncomeController = async (req, callback) => {
        var response = {}
        var addIncomeServiceObject = new incomeService()
        var addIncomeService = await addIncomeServiceObject.getTotalIncomeService(req)
         
        if (addIncomeService.error == "true") {
           
            response.error = "true"
            response.message = addIncomeService.message
            response.status=addIncomeService.status
        } else {
            response.error = "false"
            response.data = addIncomeService.data
        }
        
        callback(response)
    }

     this.updateIncomeController = async (req, callback) => {
        var response = {}
        var addIncomeServiceObject = new incomeService()
        var addIncomeService = await addIncomeServiceObject.updateIncomeService(req)
        if (addIncomeService.error == "true") {
            
            response.error = "true"
            response.message = addIncomeService.message
            response.status=addIncomeService.status
        } else {
            response.error = "false"
            response.message = addIncomeService.message
            response.data = addIncomeService.result
             response.status=addIncomeService.status
        }
        
        callback(response)
    }

      this.deleteIncomeController = async (req, callback) => {
        var response = {}
        var addIncomeServiceObject = new incomeService()
        var addIncomeService = await addIncomeServiceObject.deleteIncomeService(req)
        if (addIncomeService.error == "true") {
            
            response.error = "true"
            response.message = addIncomeService.message
            response.status=addIncomeService.status
        } else {
            response.error = "false"
            response.message = addIncomeService.message
            response.data = addIncomeService.result
             response.status=addIncomeService.status
        }
        
        callback(response)
    }

        this.getTotalIncomeController = async (req, callback) => {
        var response = {}
        var addIncomeServiceObject = new incomeService()
        var addIncomeService = await addIncomeServiceObject.getTotalIncomeService(req)
         
        if (addIncomeService.error == "true") {
           
            response.error = "true"
            response.message = addIncomeService.message
            response.status=addIncomeService.status
        } else {
            response.error = "false"
            response.data = addIncomeService.data
        }
        
        callback(response)
    }

    
        this.getUnpaidTotalIncomeController = async (req, callback) => {
        var response = {}
        var addIncomeServiceObject = new incomeService()
        var addIncomeService = await addIncomeServiceObject.getUnpaidTotalIncomeService(req)
         
        if (addIncomeService.error == "true") {
           
            response.error = "true"
            response.message = addIncomeService.message
            response.status=addIncomeService.status
        } else {
            response.error = "false"
            response.data = addIncomeService.data
        }
        
        callback(response)
    }


       this.getListIncomeController = async (req, callback) => {
        var response = {}
        var addIncomeServiceObject = new incomeService()
        var addIncomeService = await addIncomeServiceObject.getListIncomeService(req)
         console.log(addIncomeService)
        if (addIncomeService.error == "true") {
           
            response.error = "true"
            response.message = addIncomeService.message
            response.status=addIncomeService.status
        } else {
            response.error = "false"
            response.data = addIncomeService.data
        }
        
        callback(response)
    }

}


