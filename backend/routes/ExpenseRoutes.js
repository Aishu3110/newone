const express = require('express');
const router = express.Router();
const {check,validationResult}=require('express-validator')
const pool = require('../db/db');
const ExpenseController=new (require('../Controller/ExpenseController'))()

router.post('/addexpense', [
    check('Company Name')
      .isLength({ min: 1 })
      .withMessage('Invalid: Company Name must have at least 1 character'),
      check('PaymentType').isIn(['Direct','Indirect'])
      .optional().withMessage('invalid: Payment Type'),
      check('AccountType').isIn(["Cash", "Solution", "Workz", "Digital", "Director Fund"])
      .optional().withMessage('invalid: Account Type')
  ],function(request, response) {
    console.log("expense")
    const errors = validationResult(request);

    if (!errors.isEmpty()) {
        return response.status(400).json({ errors: errors.array() });
    }
            // var userControllerObject = new userController()
            ExpenseController.addExpenseController(request, function({message,status}) {
                console.log(message)
                console.log(status,'status')
                return response.status(status).send(message)
            })
        

  })



  router.get('/getexpensedetails', function(request, response) {
     
            // var userControllerObject = new userController()
            ExpenseController.getListExpenseController(request, function({data}) {
                
                console.log(data)
                return response.send(data)
            })
        

  })

    router.put('/updateexpense/:id', [
    check('Company Name')
      .isLength({ min: 1 })
      .withMessage('Invalid: Company Name must have at least 1 character'),
      check('PaymentType').isIn(['Direct','Indirect'])
      .optional().withMessage('invalid: Payment Type'),
      check('AccountType').isIn(["Cash", "Solution", "Workz", "Digital", "Director Fund"])
      .optional().withMessage('invalid: Account Type')
  ],function(request, response) {
          console.log(request.params.id)
          const errors = validationResult(request);

    if (!errors.isEmpty()) {
        return response.status(400).json({ errors: errors.array() });
    }
            // var userControllerObject = new userController()
            ExpenseController.updateExpenseController(request, function({message,status}) {
                console.log(message)
                console.log(status,'status')
                return response.status(status).send(message)
            })
        

  })

   router.put('/deletesingleexpenserecord/:id', [
    check('Company Name')
      .isLength({ min: 1 })
      .withMessage('Invalid: Company Name must have at least 1 character'),
      check('PaymentType').isIn(['Direct','Indirect'])
      .optional().withMessage('invalid: Payment Type'),
      check('AccountType').isIn(["Cash", "Solution", "Workz", "Digital", "Director Fund"])
      .optional().withMessage('invalid: Account Type')
  ],function(request, response) {
          console.log(request.params.id)
          const errors = validationResult(request);

    if (!errors.isEmpty()) {
        return response.status(400).json({ errors: errors.array() });
    }
            // var userControllerObject = new userController()
            ExpenseController.deleteExpenseController(request, function({message,status}) {
                console.log(message)
                console.log(status,'status')
                return response.status(status).send(message)
            })
        

  })




  router.get('/getDirectTotalExpenseRate',function(request, response) {
     
            // var userControllerObject = new userController()
            ExpenseController.getTotalExpenseController(request, function({data}) {
               console.log(data)
                return response.send(data)
            })
        

  })

    router.get('/getIndirectTotalExpenseRate',function(request, response) {
        console.log("unpaid")
     
            // var userControllerObject = new userController()
            ExpenseController.getIndirectTotalExpenseController(request, function({data}) {
               console.log(data)
                return response.send(data)
            })
        

  })




module.exports = router;

