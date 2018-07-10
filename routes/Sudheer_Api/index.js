//import the express module
var express = require('express');
var multer = require('multer');
//var winston=require('winston')
var upload = multer({ dest: 'uploads/' })
var router = express.Router();
//import the cookie-parser module to our application
var express = require('cookie-parser');
var path= require('path')
//var cors = require('cors')
var attendance=require('../../models/Sudheer_ models/attendance')
var express = require('express');
var  request = require('request');
var clgid;
var upload=require('../../models/Sudheer_ models/upload')

var mongo = require('mongoose');
var AutoIncrement = require('mongoose-sequence')(mongo);
//import schema file to our application .this employee.js file
var Student = require('../../models/Sudheer_ models/employee');
var adddetail=require('../../models/Sudheer_ models/adddetails')
var config=require('../../models/Sudheer_ models/config')
var students=require('../../models/Keerthi_models/data');

var studenttoclass=require('../../models/Sudheer_ models/studenttoclass')

/*winston.add(
  winston.transports.File, {
    filename: 'studentinformation.log',
    level: 'info',
    json: true,
    eol: 'rn',
    timestamp: true
  }
)*/
//winston.log('info',"check your data..")

//==============================================studentdetails===================================================
//this router used for get all studentdetails

router.get('/studentdetails',function (req,res,next) {
  //winston.log('info',"this is starting page");

  students.find({}, function (err, data) {
    if (err) throw err;
console.log(data)
    res.status(200).send(data)

  });
})
//this router used for post all studentdetails

router.post('/post' ,function(req,res,next)
{ // winston.log('info',"this is admission details page");

  var student= new Student({
    photo:req.body.photo,
    admissionnumber: req.body.admissionnumber,
    stid:"1oo",
    name: req.body.name,
    lastname: req.body.lastname,
    mothername: req.body.mothername,
    fathername: req.body.fathername,
    guardian: req.body.guardianname,
    phonenumber: req.body.phonenumber,
    mailid: req.body.mailid,
    class: req.body.class,
    bloogroup: req.body.bloogroup,
    address: req.body.address,
    School_Id:req.body.School


  })
    student.save({},function (err,success) {
    if (err)

      res.status(404).send({error:err.message})

    else{
      //res.send("saved")
    Student.count({}, function( err, count){

      var sc="EX"+count++
      console.log("dfd "+success.id)
      Student.findOneAndUpdate({_id:success.id}, {stid:sc}, {upsert:true}, function(err, doc){
       // console.log(success)
        if (err) return res.send({status:500, message: 'internal error', type:'internal'});

        return res.status(201).send({message: 'create student record', type:'internal'});
      })

    })
    //  res.send(suc)
  }
  function getNextSequenceValue(){

    var sequenceDocument = db.counters.findOneAndUpdate(
      { "_id" : sequenceName },
      { $inc : { sequence_value : 1 } },
      { new : true }
    );
    return sequenceDocument.sequence_value;
  }


})

})

//res.send("saved")



 // res.send(student)



//this router used for delete student information by id

router.delete('/delete/:stid',function (req,res) {
 // winston.log('info',"this is admission details page");

  Student.findOneAndRemove({stid:req.params.stid},function (err,data) {
    if(!err) {
      console.log("Deleted");
      res.status(204).send("deleted")
    }
})

})
//this router used for update student information by id

router.put('/update/:admissionnumber',function (err,req,res,next) {
  //winston.log('info',"updating student info through addmissionnumber");


  var conditions={admissionnumber:req.params.admissionnumber};

Student.update(conditions,req.body)
  .then(doc=>{
    if(!doc) { res.status(404).end();}
    return res.status(202).json(doc)
  })

})
//this router used for get student information by id

router.get('/findbyid/:stid',function (req,res) {
 // winston.log('info',"find documnet by id");

  Student.find({stid:req.params.stid}, (err,data) => {
    if (err) return res.status(500).send(err)
    return res.status(200).send(data)
  });

})
//========================================================attendance==================================================

//here post the attendance details to attendence collection in mongoose
router.post('/attendancepost' ,function(req,res,next)
{ // winston.log('info',"this is attendance details page");
//this  is schema representation of attendance collection
  var atten= new attendance(
    req.body


  )
  //here save() method save all req.body into mongoose collection
  atten.save({},function (err,success) {
    // if error will occured its showing error
    if (err)

      res.status(404).send({error:err.message})
// if does'nt contain errors then else message will be display in json format
    else {
      res.status(201).send({"message":"successfully saved"})
    }
  })

})
// here this router is using for get all attendance information in json format
router.get('/attendanceget',function (req,res,next) {
 // winston.log('info',"this is starting page");
//find() method is using for find all documents from collection

  attendance.find({}, function (err, data) {
    if (err) throw err;
    console.log(data)
    res.status(200).send(data)

  });
})
router.get('/filter/:class/:section/:fromdate/:todate',function (req,res) {
  var fromdate=req.params.fromdate;
  var todate=req.params.todate;
console.log(fromdate)
  var d=new Date(fromdate)
  console.log(d)
console.log(d)
console.log(todate)
var dd=new Date(todate)
console.log(dd)

console.log(dd)
  console.log("sdfdsf"+d+dd)
var s={class:req.params.class,section:req.params.section,"date.created":{"$gte":d,"$lte":dd}}
var ss=JSON.stringify(s)
console.log(ss)
  attendance.find(s, function (err, data) {
    if (err) throw err;
    console.log(data)

    res.status(200).send(data)

  });

})
router.get('/filterby/:fromdate/:todate',function (req,res) {
  var fromdate=req.params.fromdate;
  var todate=req.params.todate;
console.log("sdfdsf"+fromdate+todate)
var s={"date.created":{"$gte":new Date(fromdate),"$lt":new Date(todate)}}
console.log("csdcs "+JSON.stringify(s))
  attendance.find(s,function (err, docs) {
    if (err)
    res.send(err)
else
    res.send(docs)
})
})
//here delete the specified teacherid document in this router
router.delete('/attendancedelete/:teacherid',function (req,res) {
 // winston.log('info',"this is admission details page");
//findOneAndRemove() will using for delete the document.
  attendance.findOneAndRemove({teacherid:req.params.teacherid},function (err,data) {
    if(err) {
      console.log("error");
    }
    else {
      res.status(201).send({"message":"deleted successfully..."})
    }
  })

})
//this router is using for update the attendance collection
router.put('/attendanceupdate/:teacherid',function (req,res) {
  console.log("update")
//  winston.log('info',"updating student info through attendance");


  var conditions={teacherid:req.params.teacherid};
//update method() using for updaet the specific recoed in attendance collection
  attendance.update(conditions,req.body)
    .then(doc=>{
      if(!doc) { res.status(404).end();}
      return res.status(202).json(doc)
    })

})
//=====================================================adddetails==================================================

/*router.post('/addmoredetails' ,function(req,res)
{ // winston.log('info',"this is attendance details page");
//this  is schema representation of attendance collection
  var add= new adddetail({
    noofclass: {
      classid:req.body.classid,
      classname: req.body.classname,
      section:req.body.section ,
      terms: req.body.terms,
      fee: req.body.fee
  }
  })
  //here save() method save all req.body into mongoose collection
  add.save({},function (err,success) {
    // if error will occured its showing error
    if (err)

      res.status(404).send({error:err.message})
// if does'nt contain errors then else message will be display in json format
    else {
      res.status(201).send({"message":"successfully saved"})
    }
  })

})

//this router is using for update the attendance collection
router.get('/addde',function (req,res,body) {
  console.log("update")
  winston.log('info',"updating student info through attendance");

var url='http://10.10.5.59:3000/'


request(url,function(err,res,body) {
  var clgdetails = JSON.parse(body)
  console.log(clgdetails)
  for(var i in clgdetails){
    var clid = clgdetails[i].clgcode
console.log(clid)}
clgid=clid;

})



})


router.put('/adddetails/:id',function (req,res) {

  var conditions={_id:req.params._id};
//update method() using for updaet the specific recoed in attendance collection
  console.log(conditions)
  adddetail.update(conditions,req.body)
    .then(doc=>{
      if(!doc) { res.status(404).end();}
      return res.status(202).json(doc)
    })
})

router.put('/rangaid/:clgcode',function (req,res) {
  var url='http://10.10.5.59:3000/'


  request(url,function(err,res,body) {
    var clgdetails = JSON.parse(body)
    console.log(clgdetails)
    for(var i in clgdetails) {
      var clid = clgdetails[i].clgcode
      console.log(clid)}
      clgid = clid
      var conditions = {classid: req.params.clgid};
//update method() using for updaet the specific recoed in attendance collection
      console.log(conditions)
      adddetail.update(conditions, req.body)
        .then(doc => {
          if (!doc) {
            res.status(404).end();
          }else{
         // return res.status(202).json(doc)
            console.log("saved")
            }
        })
    })

})*/
//===========================================confid=====================================
router.post('/classesconfig' ,function(req,res)
{ // winston.log('info',"this is attendance details page");
//this  is schema representation of attendance collection

//this  is schema representation of attendance collection
/* var config = new Schema({
      classes: {
        classid: req.body.classid,
        classname: req.body.classname,
        sections: [
           req.body.section1,
          req.body.section2,
          req.body.section3
        ],
        subjects: [
           req.body.subject1,
           req.body.subject2,
           req.body.subject3,
           req.body.subject4,
           req.body.subject5,
           req.body.subject6

        ],
        terms: [
         req.body.term1,
          req.body.term2,
           req.body.term3
        ],

        fee: req.body.fee

      }

  });*/
  var configs = new config(req.body);

  //here save() method save all req.body into mongoose collection
    configs.save({},function (err,success) {
      // if error will occured its showing error
      if (err)

        res.status(404).send({error:err.message})
// if does'nt contain errors then else message will be display in json format
      else {
        res.status(201).send({"message":"successfully saved"})
      }
    })

  })

router.get('/getclass',function (req,res) {
  config.find({}, function (err, data) {
    if (err) throw err;
    console.log(data)
    res.status(200).send(data)

  });

})
router.delete('/classesdelete/:classname',function (req,res) {
//  winston.log('info',"this is admission details page");
//findOneAndRemove() will using for delete the document.
  config.remove({"classes.classname":req.params.classname},function (err,data) {
    if(err) {
      console.log("error");
    }
    else {
      res.status(202).send({"message":"deleted successfully..."})
    }
  })

})
router.get('/getclassdetails/:classname',function (req,res) {
 // winston.log('info',"this is admission details page");
//findOneAndRemove() will using for delete the document.
  config.findOne({"classes.classname":req.params.classname},function (err,data) {
    if(err) {
      console.log("error");
    }
    else {
      res.status(200).send(data)
    }
  })

})
router.put('/updateclassdetails/:classname',function (req,res) {
 // winston.log('info',"this is admission details page");
//findOneAndRemove() will using for delete the document.
  var conditions={"classes.classname":req.params.classname};

  config.update(conditions,req.body)

    .then(doc=>{
      if(!doc) { res.status(404).end();}
      return res.status(202).json(doc)
    })

})
//=======================================================================studenttoclass==========================================================
router.post('/studenttoclasspost' ,function(req,res)
{ // winston.log('info',"this is attendance details page");
//this  is schema representation of attendance collection

//this  is schema representation of attendance collection

  var studenttoclasses= new studenttoclass(req.body);

  //here save() method save all req.body into mongoose collection
    studenttoclasses.save({},function (err,success) {
      // if error will occured its showing error
      if (err)

        res.status(404).send({error:err.message})
// if does'nt contain errors then else message will be display in json format
      else {
        res.status(201).send({"message":"successfully saved"})
      }
    })

  })
  router.get('/getstudenttoclass',function (req,res) {
    studenttoclass.find({}, function (err, data) {
      if (err) throw err;
      console.log(data)
      res.status(200).send(data)

    });

  })


  router.get('/filter/:class/:section',function (req,res) {
    studenttoclass.find({class:req.params.class,section:req.params.section}, function (err, data) {
      if (err) throw err;
      console.log(data)
      res.status(200).send(data)

    });

  })
  router.put('/updatestudenttoclass/:studentid',function (req,res) {
   // winston.log('info',"this is admission details page");
  //findOneAndRemove() will using for delete the document.
    var conditions={studentid:req.params.studentid};

    studenttoclass.update(conditions,req.body)

      .then(doc=>{
        if(!doc) { res.status(404).end();}
        return res.status(202).json(doc)
      })

  })
  router.delete('/deletestudenttoclass/:studentid',function (req,res) {
    //winston.log('info',"this is admission details page");
  //findOneAndRemove() will using for delete the document.
    studenttoclass.remove({studentid:req.params.studentid},function (err,data) {
      if(err) {
        console.log("error");
      }
      else {
        res.status(202).send({"message":"deleted successfully..."})
      }
    })

  })
  //==========================================================================file uploading==============================================
  router.post('/upload' ,function(req,res)
  {  //winston.log('info',"this is attendance details page");
  //this  is schema representation of attendance collection

  //this  is schema representation of attendance collection

    var studenttoclasses= new upload(req.body);

    //here save() method save all req.body into mongoose collection
      studenttoclasses.save({},function (err,success) {
        // if error will occured its showing error
        if (err)

          res.status(404).send({error:err.message})
  // if does'nt contain errors then else message will be display in json format
        else {
          res.status(201).send({"message":"successfully saved"})
        }
      })

    })










module.exports = router;
