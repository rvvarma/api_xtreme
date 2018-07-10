var express = require('express');
var router = express.Router();

var mongoose = require('mongoose');
var winston = require('winston');
var encode = require('nodejs-base64-encode');

console.log(encode.encode('npm world', 'base64'));
//var database = require('../../raconfig/database');
var College = require('../../models/rangamodels/schooldetails');
var multer  = require('multer');
var upload = multer({ dest: 'uploads/' });
var util = require('util')
var q=require('cors');
var fs      = require('fs');
console.log(encode.decode('npm world', 'base64'));

//connecting database

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, '/uploads')
  },
  filename: function (req, file, cb) {
    cb(null, file.file + '-' + Date.now())
  }
})

var upload = multer({ storage: storage });


/* GET home page. */
router.get('/', function(req, res, next) {


  College.find({},function (err, item) {
          if (err){
        //   res.send('err');
           res.status(500);
         }

  else{
   res.status(200).send(item);
  //console.log(item);
}

}).catch(next);
});

router.get('/fetch/:class/:section/:date', function(req, res, next) {
var d=req.params.date;
var s={class:req.params.class,section:req.params.section,"date":{"$gte":d}}
var ss=JSON.stringify(s)
console.log(ss)
  College.find(s,function (err, item) {
          if (err){
        //   res.send('err');
           res.status(500);
         }

  else{
   res.status(200).send(item);
 // console.log(item.assignment[0].file);
}

  }).catch(next);


});



router.get('/download/:id', function(req, res, next) {


  College.findOne({_id:req.params.id},function (err, item) {
          if (err){
        //   res.send('err');
           res.status(500);
         }

  else{
   res.status(200).send(item);
  console.log(item.assignment[0].file);
}

}).catch(next);


});



router.post('/post', function(req, res) {




// alternative shortcut

//console.log(req.body)
//console.log(req.body)
var ft="";
var f=req.body.assignment[0].filetype;
if(f=="image/jpeg")
	ft=".jpg"
if(f=="application/pdf")
	ft=".pdf"




	var x=Date.now()+""+ft;
	console.log(x)
	fs.writeFile("./public/uploads/"+x, req.body.assignment[0].file, {encoding: 'base64'}, function (err) {
if(err){
    console.log(err); // writes out file without error, but it's not a valid image
}
else
	console.log("sucess");
});
var m=util.inspect(req.body.assignment, false, null)
var school=new College(
		{
	teacherid: req.body.teacherid,
    schoolid: req.body.schoolid,
    class: req.body.class,
	section:req.body.section,
	assignment:[{
	subject:req.body.assignment[0].subject,
    description:req.body.assignment[0].description,
	title:req.body.assignment[0].title,
    file:x,
	filetype:req.body.assignment[0].filetype
   }]
		}



     )
//console.log(school)

        school.save(function (err, item) {
                if (err){
                 res.status(500).json(err);
               }else {
                 //console.log(item);
				// console.log(req.body.assignment[0].file)





res.json("saved succesfully");
 //res.send(item);

}
})
})
             /*College.count({}, function( err, count){

               var sc="B"+count++;
               College.findOneAndUpdate({clgcode:sc.clgcode}, {clgcode:sc}, {upsert:true}, function(err, doc){
           if (err) return res.send(500, { error: err });
           return res.send("succesfully saved");
        });
      });*/










router.put('/api/student/:assignment_id', function(req, res) {
  var m=util.inspect(req.body.assignment, false, null);



 var id = req.params.assignment_id;
 var data = {
   teacherid:req.body.teacherid,
   schoolid:req.body.schoolid,
   class:req.body.class,
   section:req.body.section,
    assignment:m


 }
 College.findByIdAndUpdate(id, data, function(err, teacherdetails) {
 if (err)
 {
 res.status(500).json();
 }
else
    {
       res.status(202).json("Successfully! student updated - ");
    }
 });
});




router.delete('/api/student/:_id', function(req, res) {

 console.log(req.params._id);
 var id = req.params._id;
 College.remove({_id : id}, function(err) {
 if (err)
 res.status(500);
 else
  res.status(202).json("Successfully! student deleted - ");
})
});


module.exports = router;