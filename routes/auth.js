const express = require('express');
const router = express.Router();
const {register} = require("../controllers/user")
const passport = require("passport");
const { isLoggedIn } = require('../middleware');


router.post('/register', register);


// router.post('/login', passport.authenticate('local'), (req, res) => {
//     return res.status(200).send();
//   });


router.post('/login', (req, res, next) => {
  // console.log(req.user); // lấy dữ liệu từ session (deserializeUser)
  passport.authenticate('user', (err, user, info) => {
    if (err) {
      return res.status(500).json({ message: 'Internal Server Error' });
    }
    if (!user) {
      return res.status(401).json({ message: 'Invalid username or password' });
    }
    // gọi serializeUser // lưu user vào session sau khi thanh công
    req.logIn(user, (err) => {
      if (err) {
        return res.status(500).json({ message: 'Login failed'});
      }
      return res.status(200).json({  message: 'Login successful' });
    });
  })(req, res, next);
});

router.post('/admin', (req, res, next) => {
  // console.log(req.user); // lấy dữ liệu từ session (deserializeUser)
  passport.authenticate('admin', (err, admin, info) => {
    if (err) {
      return res.status(500).json({ message: 'Internal Server Error' });
    }
    if (!admin) {
      return res.status(401).json({ message: 'Invalid username or password' });
    }
    // gọi serializeUser // lưu user vào session sau khi thanh công
    req.logIn(admin, (err) => {
      if (err) {
        return res.status(500).json({ message: 'Login failed' });
      }
      return res.status(200).json({  message: 'Login successful' });
    });
  })(req, res, next);
});


router.delete('/logout', (req, res, next) => {
  try {
    req.logOut((err) => {
      if (err) return next(err);

      const islogged = req.isAuthenticated();
      if (islogged) {
        return res.status(400).json({
          message: "Logout failed. User is still authenticated."
        });
      } else {
        return res.status(200).json({
          message: "Logout successful."
        });
      }
    });
  } catch (e) {
    return next(e);
  }
});


// check if user is Authenticated and send user data
router.get('/session', (req, res, next) => {
    if(req.isAuthenticated()){
        const user = req.session.passport.user;
        console.log(user);
        return res.status(200).send({ user });
    } 
    console.log("404");
    return res.status(404).send();
    
})



// router.get('/home', isLoggedIn, (req, res) => {
//     return res.status(200).send({
//       message: 'You are logged in. Here is your home data.',
//     });
    
// });





module.exports = router;