var http = require('http');
var apiOptions = {
  host: 'localhost',
  port: 3000
};
if (process.env.NODE_ENV === 'production') {
  apiOptions.host = 'getting-mean-loc8r.herokuapp.com';
  apiOptions.port = 80;
}

var formatDistance = function (distance) {
  var numDistance, unit;
  if (distance > 1) {
    numDistance = distance.toFixed(1);
    unit = 'km';
  } else {
    numDistance = parseInt(distance * 1000,10);
    unit = 'm';
  }
  return numDistance + unit;
};

var renderHomepage = function (req, res, locations, err) {
  var message, locationData, locationCount, i;
  if (err) {
    locationData = [];
    message = "API error: " + err;
  } else {
    locationData = locations;
    locationCount = locationData.length;
    if (locationCount > 0) {
      for (i=0; i<locationCount; i++) {
        locationData[i].distance = formatDistance(locationData[i].distance);
      }
    } else {
      message = "No places found nearby";
    }
  }
  res.render('locations-list', {
    title: 'Loc8r - find a place to work with wifi',
    pageHeader: {
      title: 'Loc8r',
      strapline: 'Find places to work with wifi near you!'
    },
    sidebar: "Looking for wifi and a seat? Loc8r helps you find places to work when out and about. Perhaps with coffee, cake or a pint? Let Loc8r help you find the place you're looking for.",
    locations: locationData,
    message: message
  });

};

/* GET 'home' page */
module.exports.homelist = function(req, res){
  var apiReq;
  apiOptions.path = '/api/locations?lng=-0.7992599&lat=51.378091&maxDistance=20';
  apiOptions.method = 'GET';
  apiReq = http.request(apiOptions, function(apiRes) {
    console.log('STATUS: ' + apiRes.statusCode);
    console.log('HEADERS: ' + JSON.stringify(apiRes.headers));
    apiRes.setEncoding('utf8');
    apiRes.on('data', function (chunk) {
      var err;
      var responseData = JSON.parse(chunk);
      if (apiReq.statusCode !== 200) {
        err = responseData.message;
      }
      console.log(responseData);
      renderHomepage(req, res, responseData, err);
    });
  });

  apiReq.on('error', function(e) {
    console.log('problem with request: ' + e.message);
  });
  apiReq.end();

};

/* GET 'Location info' page */
module.exports.locationInfo = function(req, res){
  res.render('location-info', {
    title: 'Starcups',
    pageHeader: {title: 'Starcups'},
    sidebar: {
      context: 'is on Loc8r because it has accessible wifi and space to sit down with your laptop and get some work done.',
      callToAction: 'If you\'ve been and you like it - or if you don\'t - please leave a review to help other people just like you.'
    },
    location: {
      name: 'Starcups',
      address: '125 High Street, Reading, RG6 1PS',
      rating: 3,
      facilities: ['Hot drinks', 'Food', 'Premium wifi'],
      coords: {lat: 51.455041, lng: -0.9690884},
      openingTimes: [{
        days: 'Monday - Friday',
        opening: '7:00am',
        closing: '7:00pm',
        closed: false
      },{
        days: 'Saturday',
        opening: '8:00am',
        closing: '5:00pm',
        closed: false
      },{
        days: 'Sunday',
        closed: true
      }],
      reviews: [{
        author: 'Simon Holmes',
        rating: 5,
        timestamp: '16 July 2013',
        reviewText: 'What a great place. I can\'t say enough good things about it.'
      },{
        author: 'Charlie Chaplin',
        rating: 3,
        timestamp: '16 June 2013',
        reviewText: 'It was okay. Coffee wasn\'t great, but the wifi was fast.'
      }]
    }
  });
};

/* GET 'Add review' page */
module.exports.addReview = function(req, res){
  res.render('location-review-form', {
    title: 'Review Starcups on Loc8r',
    pageHeader: { title: 'Review Starcups' },
    user: {
      displayName: "Simon Holmes"
    }
  });
};
