const express = require('express');
const router = express.Router();
const User = require('../routes/users'); // Ensure this points to your User model
const passport = require('passport');
const localStrategy = require('passport-local');

passport.use(new localStrategy(User.authenticate()));

// Home Route
router.get('/', (req, res) => {
  res.render('index', { title: 'Home' });
});

// Sign Up Page
router.get('/signup', (req, res) => {
  res.render('signup', { title: 'Signup' });
});

// Sign In Page
router.get('/signin', (req, res) => {
  res.render('signin', { title: 'Signin' });
});

// Sign Up Route
router.post('/signup', (req, res) => {
  const { username, email, address, contact, password } = req.body;
  const newUser = new User({ username, email, address, contact });

  // Register the user
  User.register(newUser, password, (err) => {
    if (err) {
      console.error(err);
      // Handle error by redirecting to signup or showing an error message
      return res.redirect('/signup'); // Optionally, pass an error message to the signup page
    }
    passport.authenticate('local')(req, res, () => {
      res.redirect('/profile');
    });
  });
});

// Sign In Route
router.post('/signin', passport.authenticate('local', {
  successRedirect: '/profile',
  failureRedirect: '/signin',
}));

// Profile Route
router.get('/profile', isLoggedIn, (req, res) => {
  res.render('profile', { user: req.user });
});

router.get('/updateprofile', isLoggedIn, (req, res) => {
  res.render('updateprofile', { user: req.user });
});

// Update Profile Route
router.post('/updateprofile', async function(req, res){
  const user = await User.findOneAndUpdate({username: req.session.passport.user},     
     { username: req.body.username, email:req.body.email, contact:req.body.contact, address: req.body.address},         
      {new:true});                                                                         

      await user.save()                                                    

      res.redirect('/profile');
})

// Logout Route
router.get('/logout', (req, res) => {
  req.logout((err) => {
    if (err) {
      console.error(err);
    }
    res.redirect('/signin');
  });
});

// Authentication Middleware
function isLoggedIn(req, res, next){
  if(req.isAuthenticated()) return next();
  res.redirect('/');
}

module.exports = router;
