const { connect, connection } = require("mongoose");

// connect to and create the social_network_api_db
connect("mongodb://127.0.0.1:27017/social_network_api_db");

// export the connection
module.exports = connection;
