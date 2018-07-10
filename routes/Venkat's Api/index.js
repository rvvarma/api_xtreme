var express = require('express');
var router = express.Router();
var winston = require('winston');
var Cal= require('../models/cal');

/* GET home page. */
router.get('/', function(req, res, next) {
 
        const dateObj = new Date();
          const yearMonth = dateObj.getUTCFullYear() + '-' + (dateObj.getUTCMonth() + 1);
          var ry= [{
              title: 'every day event',
              start: yearMonth + '-01'
          },
          {
              title: 'Longss Event',
              start: yearMonth + '-07',
              end: yearMonth + '-10'
          },
          {
              id: 999,
              title: 'Repeating Event',
              start: yearMonth + '-09T16:00:00'
          },
          {
              id: 999,
              title: 'Repeating Event',
              start: yearMonth + '-16T16:00:00'
          },
          {
              title: 'Conference',
              start: yearMonth + '-11',
              end: yearMonth + '-13'
          },
          {
              title: 'Meeting',
              start: yearMonth + '-12T10:30:00',
              end: yearMonth + '-12T11:23:00'
          },
          {
               title: 'Get together',
               start: yearMonth + '-12T10:35:00',
               end: yearMonth + '-12T11:23:00'
          },
          {
              title: 'Lunch',
              start: yearMonth + '-12T12:00:00'
          },
          {
              title: 'Meeting',
              start: yearMonth + '-12T14:30:00'
          },
          {
              title: 'Happy Hours',
              start: yearMonth + '-12T17:30:00'
          },
          {
              title: 'Dinner',
              start: yearMonth + '-12T20:00:00'
          },

          {
              title: 'Birthday Party',
              start: yearMonth + '-13T07:00:00'
          },

           {
   title: 'BCA',
   start: '2018-06-06',
   end: '2018-06-20'
        },

          {
              title: 'Click for Google',
              url: 'http://google.com/',
              start: yearMonth + '-28'
          }];
		  
		  
		  res.json(ry)
});


/*router.get('/cal', function(req, res, next) {
  winston.log('info',"Info: Get all class records")
  console.log("info");

      if(err)
      res.status(500).send(err);
      else {
        res.status(200).json(data);
      }
  });*/

  
  
  
  
  
  router.get('/getall', function(req, res, next) {
  winston.log('info',"Info: Get all class records")
  console.log("info");
  Cal.find({},function(err,data){
      if(err)
      res.status(500).send(err);
      else {
        res.status(200).json(data);
      }
  })
});

  
  
  
  router.get('/findbystudentid/:Student_Id', function(req, res, next) {
  winston.log('info',"Info: Get all class records")
  console.log("info");
  Fee.find({Student_Id: req.params.Student_Id},function(err,data){
      if(err)
      res.status(500).send(err);
      else {
        res.status(200).json(data);
      }
  })
});
  
  

/*Calander*/
router.post('/calender', function(req,res,next){
  var t= new Cal({
    title:req.body.title,
    start:req.body.start,
    end:req.body.end
	
	

	

  })


    t.save(function(err,suc){
      if(err)
      res.send(err)
      else
      return res.status(201).send({"Message":"Created", type:"internal"});
  })

})




module.exports = router;
