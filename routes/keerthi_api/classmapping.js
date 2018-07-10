

var express = require('express');
var router = express.Router();
var winston = require('winston');
var Class= require('../../models/Keerthi_models/class');
var cors=require('cors');
/*
winston.add(
  winston.transports.File,{
    filename: 'teacher.log',
    level: 'info',
    json: 'true',
    eol: 'rn',
    timestamp: true
  }
)*/



/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});



/*Get all classes details*/
router.get('/fetch',cors(), function(req, res, next) {
 // winston.log('info',"Info: Get all class records")
  console.log("info");
  Class.find({},function(err,data){
      if(err)
      res.status(500).send(err);
      else {
        res.status(200).json(data);
      }
  })
});

/*get */
router.get('/class/:Teacher_Id',cors(),function(req,res,next){
 // winston.log('info',"Info: Get teachers from particular school")
  Class.find({Teacher_Id: req.params.Teacher_Id},function(err,data){
    if(err)
    res.status(500).send(err);
    else {
      res.status(200).json(data);
    }
  })
})


/*Get particular class details*/
router.get('/getclass/:Class',cors(),function(req,res,next){
  //winston.log('info',"Info: Get class details")
  Class.find({Class: req.params.Class},function(err,data){
    if(err)
    res.status(500).send(err);
    else {
      res.status(200).json(data);
    }
  })
})

router.get('/classes/:Teacher_Id',cors(),function(req,res,next){
 // winston.log('info',"Info: Get teachers from particular school")
  Class.find({_id: req.params.Teacher_Id},function(err,data){
    if(err)
    res.status(500).send(err);
    else {
      res.status(200).json(data);
    }
  })
})


/*Create class*/
router.post('/add',cors(),function(req,res,next){
 // winston.log('info',"Info level")
  var t=new Class({
    School_Id:req.body.School_Id,
    Teacher_Id:req.body.Teacher_Id,
    Teacher_Name:req.body.Teacher_Name,
    Class: req.body.Class,
    Section:req.body.Section,
    Subject: req.body.Subject,
    Teacher_Type: req.body.Teacher_Type
  })
  t.save(function(err,suc){
    if(err)
    res.status(500).json(err)
    else {

    res.status(201).json({"Message":"Created", type:"internal"})
}

})
    //  res.send(suc)
})


/*Update class*/
router.put('/update/:Teacher_Id',cors(), function(req,res,next){
 // winston.log('info',"Info level")
var query={Teacher_Id: req.params.Teacher_Id};
      Class.update(query, req.body, function(err,data){
                   if(err) res.status(404).json(err);
                   else {
                     res.status(202).json(data)
                   }
  })
})

/*UPdate class using teacher name*/
router.put('/update2/:Teacher_Name', cors(), function(req,res,next){
  //winston.log('info',"Info level")
var query={Teacher_Name: req.params.Teacher_Name};
      Class.update(query, req.body, function(err,data){
                   if(err) res.status(404).json(err);
                   else {
                     res.status(202).json(data)
                   }
  })
})



/*Delete class*/
router.get('/delete/:_id', cors(),function(req,res){
 // winston.log('info',"Info: Delete particular class")
  Class.remove({_id: req.params._id},function(err,data){
    console.log('deleted');
    if(err)
    res.status(404).send(err);
    else
    res.status(201).json({"Message":"deleted successfully"});
  })
})



module.exports = router;
