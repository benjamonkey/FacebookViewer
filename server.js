var express = require('express');
var passport = require('passport');
var FacebookStrategy = require('passport-facebook').Strategy;
var session = require('express-session');



var app = express();
app.use(session({secret: 'youre cool'}));
app.use(passport.initialize());
app.use(passport.session());


passport.use(new FacebookStrategy({
  clientID: '1321704841190301',
  clientSecret: '5b227f38cc0e991128976695c1ad5170',
  callbackURL: 'http://localhost:3000/auth/facebook/callback'
}, function(token, refreshToken, profile, done) {
  return done(null, profile);
}))


app.get('/auth/facebook', passport.authenticate('facebook'));
app.get('/auth/facebook/callback', passport.authenticate('facebook', {
  successRedirect: '/me',
  failureRedirect: '/auth/facebook'
}));

passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(obj, done) {
  done(null, obj);
});

app.get('/me', function(req, res){
  res.send(req.user);
})




app.listen(3000, function(){
  console.log('suhhh dude we got you on port ', 3000);
})
