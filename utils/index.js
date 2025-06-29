
const bcrypt = require('bcryptjs');

exports.hashPassword = async (password) => await bcrypt.hash(password, 8);


exports.comparePassword = async (password, hashedPassword) => await bcrypt.compare(password, hashedPassword);


exports.throwError = (message, status) => {
    const err = new Error(message);
    err.status = status;
    throw err;
}

// exports.sanitizeAdd = (addressObj) => {
//     for(const item in addressObj){            
//             addressObj[item] = escape(trim(addressObj[item]));        
//     }
//     return addressObj;
// }

