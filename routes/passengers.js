var express = require('express');
var router = express.Router();
var mongoose = require('mongoose'); //mongo connection
var bodyParser = require('body-parser'); //parses information from POST
var methodOverride = require('method-override'); //used to manipulate POST

// NOTE: when using req.body, you must fully parse the request body
//       before you call methodOverride() in your middleware stack,
//       otherwise req.body will not be populated.
router.use(bodyParser.urlencoded({ extended: true }))
router.use(methodOverride(function(req, res){
      if (req.body && typeof req.body === 'object' && '_method' in req.body) {
        // look in urlencoded POST bodies and delete it
        var method = req.body._method
        delete req.body._method
        return method
      }
}));


//build the REST operations at the base for passengers
//this will be accessible from http://127.0.0.1:3000/passengers if the default route for / is left unchanged
router.route('/')
    //GET all passengers
    .get(function(req, res, next) {
        //retrieve all passengers from Monogo
        mongoose.model('Passenger').find({}, function (err, passengers) {
              if (err) {
                  return console.error(err);
              } else {
                  //respond to both HTML and JSON. JSON responses require 'Accept: application/json;' in the Request Header
                  res.format({
                      //HTML response will render the index.jade file in the views/passengers folder. We are also setting "passengers" to be an accessible variable in our jade view
                    html: function(){
                        res.render('passengers/index', {
                              title: 'All passengers',
                              "passengers" : passengers
                          });
                    },
                    //JSON response will show all passengers in JSON format
                    json: function(){
                        res.json(infophotos);
                    }
                });
              }     
        });
    })
    //POST a new passenger
    .post(function(req, res) {
        // Get values from POST request. These can be done through forms or REST calls. These rely on the "name" attributes for forms
        var name = req.body.name;
        var ticket_id = req.body.badge;
        //call the create function for our database
        mongoose.model('Passenger').create({
            name : name,
            ticket_id : ticket_id
        }, function (err, passenger) {
              if (err) {
                  res.send("There was a problem adding the information to the database.");
              } else {
                  //User has been created
                  console.log('POST creating new passenger: ' + passenger);
                  res.format({
                      //HTML response will set the location and redirect back to the home page. You could also create a 'success' page if that's your thing
                    html: function(){
                        // If it worked, set the header so the address bar doesn't still say /adduser
                        res.location("passengers");
                        // And forward to success page
                        res.redirect("/passengers");
                    },
                    //JSON response will show the newly created passenger
                    json: function(){
                        res.json(passenger);
                    }
                });
              }
        })
    });

/* GET New Passenger page. */
router.get('/new', function(req, res) {
    res.render('passenger/new', { title: 'Add New Passenger' });
});

module.exports = router;
