var express = require('express');
var router = express.Router();

var passport = require('passport');
var FacebookStrategy = require('passport-facebook').Strategy;
var mysql = require('mysql');
var connect = mysql.createConnection({
  host:'localhost',
  user:'root',
  password:'',
  database: 'mcctest'
})



router.use(passport.initialize());

passport.use(new FacebookStrategy({
  clientID : '297783757509176',
  clientSecret : 'c0bfc95253095719bdf05ef8c747377c',
  callbackURL: 'https://mccdiajarinaw.herokuapp.com/authFacebook/done',
  enableProof: true,
  profileFields: ['id', 'name', 'email', 'photos']
}, function(accessToken, refreshToken, profile, done){
  return done(null, profile);
}))

passport.serializeUser(function(profile,done){
  return done(null, profile);
})

passport.deserializeUser(function(profile,done){
  return done(null, profile);
})

router.get('/authFacebook', passport.authenticate('facebook', {scope:['email']}));
router.get('/authFacebook/done', passport.authenticate('facebook', {
  failureRedirect: '/'
}),function(req,res){
  return res.json(req.user);

  // var fbid = req.user.id;

  // var query = "SELECT * FROM users where facebook_id=?";
  // connect.query(query, [fbid], function (err, result) {
  //   console.log(result)


  //   if(err){
  //     res.redirect('/');
  //   }

  //   if(result.length === 0){
  //     res.redirect('/register?fbID=' + fbid);
  //   }
  //   else{
  //     res.redirect('/home?id='+result[0].id);
  //   }

  // })






});

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/register', function(req, res, next) {
  res.render('register');
});

router.post('/register', function (req, res) {
  var username = req.body.username;
  var password = req.body.password;
  var fbid = req.body.fbid;

  var query = 'INSERT INTO users(name, password, facebook_id) VALUES(?,?,?)'

  connect.query(query,[username, password, fbid], function (err, result) {
    if(err){
      return res.json({
        msg:'error nich'
      })
    }
    else{
      return res.json({
        msg:'success'
      })
    }
  })
})

router.get('/home', function(req, res, next) {
  res.render('home', { title: 'Express' });
});
module.exports = router;
