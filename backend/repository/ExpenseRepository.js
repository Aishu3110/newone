module.exports = function() {
   
     var mysqlExecute = require('../db/db')
    //  console.log(mysqlExecute)
  
   

    this.addExpenseData = (req) => {
        var output = {}
        return new Promise(async function(resolve) {
            var output = {}
              try {
                var mysqlExecuteCall = new mysqlExecute()
                 const invoicenumber=req.body.InvoiceNumber;
    const particulars=req.body.Particulars;
    const duedate = req.body.DueDate;
    const actiondate =req.body.ActionDate; 
    const paymentType=req.body.PaymentType;
    const accountType=req.body.AccountType;
    const amount=req.body.Amount;
    const cgst=req.body.CGST;
    const sgst=req.body.SGST;
    const igst=req.body.IGST;
    const totalamount=req.body.TotalAmount;
    
        var query =`SELECT InvoiceNumber from expense_table where InvoiceNumber=? and IsDeleted=0`;
         var queryRequest =[req.body.InvoiceNumber]
         var queryResponse = await mysqlExecuteCall.executeWithParams(query, queryRequest)

         if (queryResponse.error == 'false') {
                    if(queryResponse.result.length>0)
                    {
                      resolve({result:queryResponse.result,error:"true",status:403,message:"already exists"})
                    }
                    else{
                        var query="INSERT INTO expense_table (InvoiceNumber,Particulars,PaymentType,AccountType,Amount,CGST,SGST,IGST,TotalAmount,DueDate,ActionDate) VALUES ?";
         var queryRequest =[[invoicenumber,particulars,paymentType,accountType,amount,cgst,sgst,igst,totalamount,duedate,actiondate]]
                         var queryResponse = await mysqlExecuteCall.executeWithParams(query,[ queryRequest])
if (queryResponse.error == 'false') {
                    resolve({status:200,message:"record insert success",result:[]})
                } else {
                    resolve(queryResponse)
                }

                    }
                } else {
                    resolve(queryResponse)
                }
  
               
            } catch (err) {
                err.error = "true"
                err.message = "OOPS DAO Exception"
                resolve(err)
            }
        })
    }

      this.updateExpenseData = (req) => {
        var output = {}
        return new Promise(async function(resolve) {
            var output = {}
              try {
                var mysqlExecuteCall = new mysqlExecute()
                const id=req.params.id;
  const invoicenumber=req.body.InvoiceNumber;
    const particulars=req.body.Particulars;
    const duedate = req.body.DueDate;
    const actiondate =req.body.ActionDate; 
    const paymentType=req.body.PaymentType;
    const accountType=req.body.AccountType;
    const amount=req.body.Amount;
    const cgst=req.body.CGST;
    const sgst=req.body.SGST;
    const igst=req.body.IGST;
    const totalamount=req.body.TotalAmount;
   
        var query =`Select * from expense_table where InvoiceNumber=? and id=? and IsDeleted=0`;
         var queryRequest =[invoicenumber,id]
                         var queryResponse = await mysqlExecuteCall.executeWithParams(query, queryRequest)

         if (queryResponse.error == 'false') {
                    if(queryResponse.result.length>0)
                    {
        const query="UPDATE expense_table SET InvoiceNumber=?,Particulars=?,DueDate=?,PaymentType=?,AccountType=?,Amount=?,CGST=?,SGST=?,IGST=?,TotalAmount=?,ActionDate=? where id=?";
         var queryRequest =[invoicenumber,particulars,duedate,paymentType,accountType,amount,cgst,sgst,igst,totalamount,actiondate,id]
                         var queryResponse = await mysqlExecuteCall.executeWithParams(query, queryRequest)
                       if (queryResponse.error == 'false') {
                    resolve({status:200, message: "Record updated successfully" ,result:[]})
                } else {
                    resolve(queryResponse)
                }
                    }
                    else{
                        var query=`Select * from expense_table where InvoiceNumber=? and IsDeleted=0`;
         var queryRequest =[invoicenumber]
                         var queryResponse = await mysqlExecuteCall.executeWithParams(query, queryRequest)
if (queryResponse.error == 'false') {
     if(queryResponse.result.length>0)
                    {
                      resolve({result:queryResponse.result,error:"true",status:403,message:"already exists"})
                    }
                    else{
            const query="UPDATE expense_table SET InvoiceNumber=?,Particulars=?,DueDate=?,PaymentType=?,AccountType=?,Amount=?,CGST=?,SGST=?,IGST=?,TotalAmount=?,ActionDate=? where id=?";
         var queryRequest =[invoicenumber,particulars,duedate,paymentType,accountType,amount,cgst,sgst,igst,totalamount,actiondate,id]
                         var queryResponse = await mysqlExecuteCall.executeWithParams(query, queryRequest)
                       if (queryResponse.error == 'false') {
                    resolve({status:200, message: "Record updated successfully" ,result:[]})
                } else {
                    resolve(queryResponse)
                }
                    }
                   
                } else {
                    resolve(queryResponse)
                    console.log(queryResponse)
                }

                    }
                } else {
                    resolve(queryResponse)
                    console.log(queryResponse)
                }   
            } catch (err) {
                err.error = "true"
                err.message = "OOPS DAO Exception"
                resolve(err)
            }
        })
    }

    this.deleteExpenseData = (req) => {
        var output = {}
        return new Promise(async function(resolve) {
            var output = {}
              try {
                var mysqlExecuteCall = new mysqlExecute()
                const id=req.params.id;
    const query=`UPDATE expense_table SET IsDeleted=1 where id=?`;
       var queryRequest =[id]
                         var queryResponse = await mysqlExecuteCall.executeWithParams(query, queryRequest)
                         if (queryResponse.error == 'false') {
                           if(queryResponse.result.affectedRows==0)
                           {
                            resolve({status:404,message:"Record not found",error:"true"})
                           }
                           resolve({status:300,message:"Record deleted successfully",error:"false"})
                         }
                         else{
                             resolve({status:500,message:"Database Error",error:"true"})
                         }
            } catch (err) {
                err.error = "true"
                err.message = "OOPS DAO Exception"
                resolve(err)
            }
        })
    }


    this.getTotalExpenseData = (req) => {
        var output = {}
        return new Promise( async function(resolve) {
            var output = {}
            try {
                var mysqlExecuteCall = new mysqlExecute()
                var query = "Select sum(TotalAmount) as Total from expense_table where PaymentType='Direct' and IsDeleted=0"
                var queryResponse = await mysqlExecuteCall.executeWithoutParams(query)
                if (queryResponse.error == 'false') {
                    console.log(queryResponse)
                    resolve(queryResponse)
                } else {
                    console.log(queryResponse)
                    resolve(queryResponse)
                }
            } catch (err) {
                err.error = "true"
                err.message = "OOPS DAO Exception"
                resolve(err)
            }
        })
    }

      this.getIndirectTotalExpenseData = (req) => {
        var output = {}
        return new Promise( async function(resolve) {
            var output = {}
            try {
                var mysqlExecuteCall = new mysqlExecute()
                var query = "Select sum(TotalAmount) as Total from expense_table where PaymentType='Indirect' and IsDeleted=0"
                var queryResponse = await mysqlExecuteCall.executeWithoutParams(query)
                if (queryResponse.error == 'false') {
                    console.log(queryResponse)
                    resolve(queryResponse)
                } else {
                    console.log(queryResponse)
                    resolve(queryResponse)
                }
            } catch (err) {
                err.error = "true"
                err.message = "OOPS DAO Exception"
                resolve(err)
            }
        })
    }
   this.getListExpenseData = (req) => {
        var output = {}
        return new Promise( async function(resolve) {
            var output = {}
            try {
                var mysqlExecuteCall = new mysqlExecute()
                var query = "SELECT id,InvoiceNumber,CGST,Particulars,PaymentType,AccountType,Amount,SGST,IGST,TotalAmount,DueDate,ActionDate from expense_table where  IsDeleted=0"
                var queryResponse = await mysqlExecuteCall.executeWithoutParams(query)
                if (queryResponse.error == 'false') {
                    console.log(queryResponse)
                    resolve(queryResponse)
                } else {
                    console.log(queryResponse)
                    resolve(queryResponse)
                }
            } catch (err) {
                err.error = "true"
                err.message = "OOPS DAO Exception"
                resolve(err)
            }
        })
    }
    
}