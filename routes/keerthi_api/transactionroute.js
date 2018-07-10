var express = require('express');
var router = express.Router();
var winston = require('winston');
var Transaction= require('../../models/Keerthi_models/transaction');
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/getbystudentid/:Student_Id', function(req, res, next) {
  winston.log('info',"Info: Get all class records")
  console.log("info");
  Transaction.find({Student_Id: req.params.Student_Id},function(err,data){
      if(err)
      res.status(500).send(err);
      else {
        res.status(200).json(data);
      }
  })
});


/*Fee payment*/
router.post('/newtransaction', function(req,res,next){
  var t= new Transaction(
    req.body
  /* Student_Id:req.body.Student_Id,
    Amount:req.body.Amount,
    Payment_Mode:req.body.payment,
    Date:req.body.date*/
  )


    t.save(function(err,suc){
      if(err)
      res.send(err)
      else
      return res.status(201).send({"Message":"Created", type:"internal"});
  })

})


router.post('/transaction/:Student_Id', function(req,res,next){
  var t= new Transaction(
    req.body
  /* Student_Id:req.body.Student_Id,
    Amount:req.body.Amount,
    Payment_Mode:req.body.payment,
    Date:req.body.date*/
  )


    t.save(function(err,suc){
      if(err)
      res.send(err)
      else
      return res.status(201).send({"Message":"Created", type:"internal"});
  })

})




/* Update particular teacher details */
router.put('/update/:Student_Id', function(req,res,next){
  winston.log('info',"Info level");
var query={Student_Id: req.params.Student_Id
    };
      Transaction.update(query, req.body, function(err,data){
                   if(err) res.status(404).json(err);
                   else {
                     res.status(202).send({"Message":"Created", type:"internal"})
                   }

  })
})


/*Get all details*/
router.get('/transaction', function(req, res, next) {
  winston.log('info',"Info: Get all class records")
  console.log("info");
  Transaction.find({},function(err,data){
      if(err)
      res.status(500).send(err);
      else {
        res.status(200).json(data);
      }
  })
});


/*Get all details*/
router.get('/transactiondetails/:Student_Id', function(req, res, next) {
  winston.log('info',"Info: Get all transaction records")
  console.log("info");
  Transaction.find({Student_Id: req.params.Student_Id},function(err,data){
      if(err)
      res.status(500).send(err);
      else {
        res.status(200).json(data);
      }
  })
});

module.exports = router;
