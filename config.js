const dotenv = require('dotenv');

dotenv.config();

const config = {
	port: process.env.PORT || 3000,
	secret: process.env.SECRET,
};

module.exports = config;
