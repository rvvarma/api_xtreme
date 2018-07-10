
var Teacher= require('../../models/Keerthi_models/teacher');
var Password= require('../../models/Keerthi_models/password1');
var express = require('express');
var router = express.Router();
var winston = require('winston');


var http = require("http");
var nodemailer = require('nodemailer');
var bodyParser = require('body-parser');
var path = require('path');
var xoauth2 = require('xoauth2');


router.post('/login', function(req,res,next){

//colectin find
Password.findOne({Id:req.body.Id,Password:req.body.Password},function(err,data){
  if(err){
  send(err);
  //res.status(500).send(err);
}

  else {
    res.status(200).json(data);
  }
})



  })


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





/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

/* Get all teacher records*/
router.get('/fetch', function(req, res, next) {
  winston.log('info',"Info: Get all records")
  console.log("info");
  Teacher.find({},function(err,data){
      if(err)
      res.status(500).send(err);
      else {
        res.status(200).json(data);
      }
  })
});


/* Get teachers details of a particular teacher */
router.get('/teacher/:_id',function(req,res,next){
  winston.log('info',"Info: Get teacher details")
  Teacher.find({_id:req.params._id},function(err,data){
    if(err)
    res.status(500).send(err);
    else {
      res.status(200).json(data);
    }
  })
})


/* Get teachers details of a particular school */
router.get('/getteachers/:School_Id',function(req,res,next){
  winston.log('info',"Info: Get teachers from particular school")
  Teacher.find({School_Id: req.params.School_Id},function(err,data){
    if(err)
    res.status(500).send(err);
    else {
      res.status(200).json(data);
    }
  })
})

/*Fetch all matching id's using array*/
router.get('/getschools',function(req,res,next){
  winston.log('info',"Info: Get teachers from particular school")
  Teacher.find({School_Id:  { $in:["S345", "S346"] }},function(err,data){
   //db.things.find({ words: { $in: ["text", "here"] }});
    if(err)
    res.status(500).send(err);
    else {
      res.status(200).json(data);
    }
  })
})

/*Fetch all matching records of teachers using array*/
router.get('/getallteachers/:School_Id',function(req,res,next){
  winston.log('info',"Info: Get teachers from particular school")
  Teacher.find({School_Id:req.params.School_Id, Teacher_Id:{ $in:["T6", "T5"] }},function(err,data){
   //db.things.find({ words: { $in: ["text", "here"] }});
    if(err)
    res.status(500).send(err);
    else {
      res.status(200).json(data);
    }
  })
})


/*Get particular teacher details using school and teacher Id */
router.get('/getteacher/:School_Id/:Teacher_Id',function(req,res,next){
  winston.log('info',"Info: Get particular teacher details")
  Teacher.find({School_Id: req.params.School_Id,Teacher_Id:req.params.Teacher_Id},function(err,data){

    if(err)
    res.status(500).send(err);
    else {
      res.status(200).json(data);
    }
  })
})


/* Delete  a particular teacher details */
router.get('/delete/:School_Id/:Teacher_Id',function(req,res,next){
  winston.log('info',"Info: Delete particular teacher")
  Teacher.remove({School_Id: req.params.School_Id,Teacher_Id:req.params.Teacher_Id},function(err,data){
    console.log('deleted');
    if(err)
    res.status(404).send(err);
    else
    res.status(200).json(data);
  });
})


/* Add teachers */
router.post('/add',function(req,res,next){
  winston.log('info',"Info level")

  var t=new Teacher({
    School_Id:req.body.School_Id,
    Teacher_Id:1,
    First_Name: req.body.First_Name,
    Last_Name: req.body.Last_Name,
    Gender: req.body.gender,
    Date_of_birth:req.body.Date_of_birth,
    Age: req.body.Age,
    Qualification:  req.body.Qualification,
    Experience: req.body.Experience,
    Package: req.body.Package,
    Address:req.body.Address,
    Phone_Number:  req.body.Phone_Number,
    Previous_School:req.body.Previous_School,
    Email_id:req.body.Email_id
  })
  t.save(function(err,suc){
    if(err)
    res.send(err)
    else {

      Teacher.count({}, function( err, count){

        var sc="T"+count++
        Teacher.findOneAndUpdate({_id:suc.id}, {Teacher_Id:sc}, {upsert:true}, function(err, doc){
    if (err) return res.status(500).send( { error: err });
    return res.status(201).send({"Message":"Created", type:"internal"});
})

})

//mailing
var mailOptions = {
          from: 'keerthi.regnis@gmail.com', // sender address
          to: req.body.Email_id, // list of receivers
          subject: 'link to change password', // Subject line
          text: 'http://13.232.4.80:4200/teacherpassword/'+suc._id                       +'     Click on the link' // html body
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
router.post('/password/:_id', function(req,res,next){

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
router.get('/getuserdata', function(req, res, next) {
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


/* Get *passwords* recors of a user*/
router.get('/credentials/:Id/:Password', function(req, res, next) {
  winston.log('info',"Info: Get all records")
  console.log("info");
  Password.find({Id: req.params.Id,Password: req.params.Password},function(err,data){
      if(err)
      res.status(500).send(err);
      else {
        res.status(200).json(data);
      }
  });
})

/* Update particular teacher details */
router.put('/update/:School_Id/:Teacher_Id', function(req,res,next){
  winston.log('info',"Info level");
var query={School_Id: req.params.School_Id,
             Teacher_Id:req.params.Teacher_Id};
      Teacher.update(query, req.body, function(err,data){
                   if(err) res.status(404).json(err);
                   else {
                     res.status(202).json(data)
                   }

  })
})
router.put('/update2/:Teacher_Name', function(req,res,next){
  winston.log('info',"Info level")
var query={Teacher_Name: req.params.Teacher_Name};
      Teacher.update(query, req.body, function(err,data){
                   if(err) res.status(404).json(err);
                   else {
                     res.status(202).json(data)
                   }


  })
})


module.exports = router;
