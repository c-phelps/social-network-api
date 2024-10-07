// file for seeding db
const connection = require("../config/connection");
const Thought = require("../models/Thought");
const User = require("../models/User");
const { userData, thoughtData } = require("./data");

connection.on("error", (err) => err);

connection.once("open", async () => {
  console.log("connected");
  seedData();
});

async function seedData() {
  try {
    // clear out data
    await User.deleteMany({});
    await Thought.deleteMany({});

    const user = await User.insertMany(userData);
    const thought = await Thought.insertMany(thoughtData);

    // add the testing thoughts to the users thoughts array
    await User.findOneAndUpdate(
      { username: "1testUser1" },
      { $addToSet: { thoughts: { $each: [thought[0]._id, thought[1]._id] } } }
    );
    await User.findOneAndUpdate(
      { username: "2testUser2" },
      { $addToSet: { thoughts: { $each: [thought[2]._id, thought[3]._id] } } }
    );
    await User.findOneAndUpdate({ username: "3testUser3" }, { $addToSet: { thoughts: thought[4]._id } });

    // print out data
    console.table(user);
    console.table(thought);
    console.log("Database seeding successful.");
    process.exit(0);
  } catch (err) {
    console.error(err);
  }
}
