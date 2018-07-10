var express = require('express');
var router = express.Router();

var winston = require('winston');
var Admin= require('../../models/Keerthi_models/admin');
var Password= require('../../models/Keerthi_models/password1');

var http = require("http");
var nodemailer = require('nodemailer');
var bodyParser = require('body-parser');
var path = require('path');
var xoauth2 = require('xoauth2');



/*gmail authorization to send emails to the users*/
let transporter = nodemailer.createTransport({
    service:'gmail',

    auth: {
      xoauth2: xoauth2.createXOAuth2Generator({
        user: 'keerthi.regnis@gmail.com',

  clientId: '487571564592-ebi9vkjo2tk10um0fq26gkn0k3u6v9vm.apps.googleusercontent.com',
  clientSecret: 'wwo0sYyKHTNzl9UJwgXDXBPc',
  refreshToken: '1/t87TEHx9TY6wr_KuoHhmbch7084TVjZxX51jRlDnaj0qWbtHhczmvLiFkSv28HFd'

 })
}
});

var email_smtp = nodemailer.createTransport({
  host: "smtp.gmail.com",
  auth: {
    type: "OAuth2",
    user: 'keerthi.regnis@gmail.com',

clientId: '487571564592-ebi9vkjo2tk10um0fq26gkn0k3u6v9vm.apps.googleusercontent.com',
clientSecret: 'wwo0sYyKHTNzl9UJwgXDXBPc',
refreshToken: '1/t87TEHx9TY6wr_KuoHhmbch7084TVjZxX51jRlDnaj0qWbtHhczmvLiFkSv28HFd'
  }
});


/*Logger*/
/*winston.add(
  winston.transports.File,{
    filename: 'teacher.log',
    level: 'info',
    json: 'true',
    eol: 'rn',
    timestamp: true
  }
)
winston.log('info',"Info level")*/

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});


/* Get all teacher records*/
router.get('/getadminrecords', function(req, res, next) {
  winston.log('info',"Info: Get all records")
  console.log("info");
  Admin.find({},function(err,data){
      if(err)
      res.status(500).send(err);
      else {
        res.status(200).json(data);
      }
  })
});


/* Get teachers details of a particular teacher */
router.get('/admin/:_id',function(req,res,next){
  winston.log('info',"Info: Get admin details")
  Admin.find({_id:req.params._id},function(err,data){
    if(err)
    res.status(500).send(err);
    else {
      res.status(200).json(data);
    }
  })
})


/* Add teachers */
router.post('/newadmin',function(req,res,next){
  winston.log('info',"Info level")

  var t=new Admin({
    School_Id:req.body.School_Id,
    Employee_Id:1,
    First_Name: req.body.First_Name,
    Last_Name: req.body.Last_Name,
    Gender: req.body.gender,
    Date_of_birth:req.body.Date_of_birth,
    Age: req.body.Age,
    Qualification:  req.body.Qualification,
    Experience: req.body.Experience,
    Address:req.body.Address,
    City: req.body.City,
    Phone_Number:  req.body.Phone_Number,
    Pin_Code:req.body.Pin_Code,
    Email_id:req.body.Email_id
  })
  t.save(function(err,suc){
    if(err)
    res.send(err)
    else {

      Admin.count({}, function( err, count){

        var sc="E"+count++
        Admin.findOneAndUpdate({_id:suc.id}, {Employee_Id:sc}, {upsert:true}, function(err, doc){
    if (err) return res.status(500).send( { error: err });
    return res.status(201).send({"Message":"Created", type:"internal"});
})

})

//mailing
var mailOptions = {
          from: 'keerthi.regnis@gmail.com', // sender address
          to: req.body.Email_id, // list of receivers
          subject: 'link to change password', // Subject line
          text: 'http://13.232.4.80:4200/adminpassword/'+suc._id           +'     Click on the link' // html body
      };
      email_smtp.sendMail(mailOptions, (error, info) => {
          if (error) {
              res.send("dsfds "+error);
          }else {
            res.send(info);
          }
          });

            //  res.send(suc)
        }
    function getNextSequenceValue(sequenceName){

      var sequenceDocument = db.counters.findOneAndUpdate(
        { "_id" : sequenceName },
         { $inc : { sequence_value : 1 } },
         { new : true }
       );
   return sequenceDocument.sequence_value;
 }

})

})


/*save password*/
router.post('/adminpassword/:_id', function(req,res,next){

  var t= new Password(
    req.body
  )

    t.save(function(err,suc){
      if(err)
      res.send(err)
      else
      return res.status(201).send({"Message":"Created", type:"internal"});
  })


})


/* Get all user records who got registered *passwords* */
router.get('/getadmindata', function(req, res, next) {
  winston.log('info',"Info: Get all records")
  console.log("info");
  Password.find({},function(err,data){
      if(err)
      res.status(500).send(err);
      else {
        res.status(200).json(data);
      }
  });
})

module.exports = router;
