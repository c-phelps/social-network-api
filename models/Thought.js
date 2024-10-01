// Will require a virtual called reactionCount that retrieves the length of the thoughts reactons array
// thoughtText - String, Required, 280 chars max
// createdAt - Date, Default to current timestamp
// username - String, Required
// reactions
// note that reactions are subdocuments using the reactionSchema

const { Schema, model } = require("mongoose");
const Reaction = require("./Reaction");

const thoughtSchema = new Schema({});

thoughtSchema.virtual("reactionCount").get(function () {
  return this.reactions.length;
});

const Thought = model("thought", thoughtSchema);

module.exports = Thought;
