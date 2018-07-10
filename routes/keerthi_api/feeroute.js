var express = require('express');
var router = express.Router();
var winston = require('winston');
var Fee= require('../../models/Keerthi_models/fee');
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

/*Fee payment*/
router.post('/feepayment', function(req,res,next){
  var t= new Fee({
    Student_Id:req.body.Student_Id,
    Student_Type:req.body.Student_Type,
    SNo:req.body.SNo,
    Total_Fee:req.body.Total_Fee,
    /*Fee_Paid:req.body.Fee_Paid,
    Date:req.body.Date,
    Description:req.body.Description,
    Pending_Fee:req.body.Pending_Fee
    /*Amount:req.body.Amount,
    Payment_Mode:req.body.Payment_Mode*/
  })


    t.save(function(err,suc){
      if(err)
      res.send(err)
      else
      return res.status(201).send({"Message":"Created", type:"internal"});
  })

})


/*Get all details*/
router.get('/getall', function(req, res, next) {
  winston.log('info',"Info: Get all class records")
  console.log("info");
  Fee.find({},function(err,data){
      if(err)
      res.status(500).send(err);
      else {
        res.status(200).json(data);
      }
  })
});

router.get('/findbystudentid/:Student_Id', function(req, res, next) {
  winston.log('info',"Info: Get all payment records")
  console.log("info");
  Fee.find({Student_Id: req.params.Student_Id},function(err,data){
      if(err)
      res.status(500).send(err);
      else {
        res.status(200).json(data);
      }
  })
});
module.exports = router;
