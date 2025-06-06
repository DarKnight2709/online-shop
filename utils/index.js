
const bcrypt = require('bcryptjs');

exports.hashPassword = async (password) => await bcrypt.hash(password, 8);


exports.comparePassword = async (password, hashedPassword) => await bcrypt.compare(password, hashedPassword);