// Strategy
const LocalStrategy = require('passport-local').Strategy;

const bcrypt = require('bcryptjs');
const pool = require('./models/database');


function initialize(passport) {
  // khai báo chiến lược đăng nhập (passport-local)
  passport.use(new LocalStrategy(
    async function (username, password, done) {
      pool.query('SELECT * FROM users WHERE username=$1', [username], (err, user) => {
        if(err) {return done(err);}
        if(user.rows.length === 0) {
          return done(null, false);
        }
        // console.log('initialize');
        bcrypt.compare(password, user.rows[0].passwordhash, (err, verified) => {
          if(err) {return done(err);}
          if(verified) {
            return done(null, user.rows[0]);
          }
          return done(null, false);
        }); 
      });
    }
    
  ));

  // serialize user
  // định nghĩa cách lưu user vào session
  passport.serializeUser((user, done) => {
    // console.log('serializeUser', user);
    return done(null, user.userid);
  });


  // deserialize user
  // định nghĩa cách lấy user từ session
  passport.deserializeUser((id, done) => {
    // console.log('deserializeUser');
    pool.query('SELECT userid, username FROM users WHERE userid=$1', [id], (err, results) => {
      if(err) return done(err);
      return done(null, results.rows[0]);
    });
  });
}



module.exports = initialize;