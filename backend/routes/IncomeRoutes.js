const express = require('express');
const router = express.Router();
const {check,validationResult}=require('express-validator')
const pool = require('../db/db');
const IncomeController=new (require('../Controller/IncomeController'))()

router.post('/addincome',app.auth,app.cors,  [
    check('CompanyName')
      .isLength({ min: 1 })
      .withMessage('Invalid: Company Name must have at least 1 character'),
      check('status').isIn(['Paid','UnPaid','Overdue','Declined'])
      .optional().withMessage('invalid: status')
  ],function(request, response) {
    const errors = validationResult(request);

    if (!errors.isEmpty()) {
        return response.status(400).json({ errors: errors.array() });
    }
     
            // var userControllerObject = new userController()
            IncomeController.addIncomeController(request, function({message,status}) {
                console.log(message)
                console.log(status,'status')
                return response.status(status).send(message)
            })
        

  })



  router.get('/getincomedetails', app.auth,app.cors, function(request, response) {
     
            // var userControllerObject = new userController()
            IncomeController.getListIncomeController(request, function({data}) {
                
                console.log(data)
                return response.send(data)
            })
        

  })

    router.put('/updateincome/:id', app.auth,app.cors, [
    check('Company Name')
      .isLength({ min: 1 })
      .withMessage('Invalid: Company Name must have at least 1 character'),
      check('status').isIn(['Paid','UnPaid','Overdue','Declined'])
      .optional().withMessage('invalid: status')
  ],function(request, response) {
          console.log(request.params.id)
          const errors = validationResult(request);

    if (!errors.isEmpty()) {
        return response.status(400).json({ errors: errors.array() });
    }
            // var userControllerObject = new userController()
            IncomeController.updateIncomeController(request, function({message,status}) {
                console.log(message)
                console.log(status,'status')
                return response.status(status).send(message)
            })
        

  })

   router.put('/deletesinglerecord/:id',app.auth,app.cors,  [
    check('Company Name')
      .isLength({ min: 1 })
      .withMessage('Invalid: Company Name must have at least 1 character'),
      check('status').isIn(['Paid','UnPaid','Overdue','Declined'])
      .optional().withMessage('invalid: status')
  ],function(request, response) {
          console.log(request.params.id)
          const errors = validationResult(request);

    if (!errors.isEmpty()) {
        return response.status(400).json({ errors: errors.array() });
    }
            // var userControllerObject = new userController()
            IncomeController.deleteIncomeController(request, function({message,status}) {
                console.log(message)
                console.log(status,'status')
                return response.status(status).send(message)
            })
        

  })




  router.get('/getTotalIncomeRate',app.auth,app.cors, function(request, response) {
     
            // var userControllerObject = new userController()
            IncomeController.getTotalIncomeController(request, function({data}) {
               console.log(data)
                return response.send(data)
            })
        

  })

    router.get('/getUnpaidTotalIncomeRate',app.auth,app.cors, function(request, response) {
        console.log("unpaid")
     
            // var userControllerObject = new userController()
            IncomeController.getUnpaidTotalIncomeController(request, function({data}) {
               console.log(data)
                return response.send(data)
            })
        

  })




module.exports = router;

