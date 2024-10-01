// schema for reaction's subdocument in Thought model
// reactionId - ObjectId, default to new ObjectId
// reactionBody - String, Required, 280 characters max
// username - String, Required
// createdAt - Date, Default to current timestamp

const { Schema, Types } = require("mongoose");

const reactionSchema = new Schema({});

module.exports = reactionSchema;
