// data to go into the db
// create some junk data for testing
const userData = [
  { username: "user1", email: "user1@email.com", thoughts: [], friends: [] },
  { username: "user2", email: "user2@email.com", thoughts: [], friends: [] },
  { username: "user3", email: "user3@email.com", thoughts: [], friends: [] },
];
const thoughtData = [
  { thoughtText: "1st thought by user user1", username: "user1", reactions: [] },
  { thoughtText: "2nd thought by user user1", username: "user1", reactions: [] },
  { thoughtText: "1st thought by user user2", username: "user2", reactions: [] },
  { thoughtText: "2nd thought by user user2", username: "user2", reactions: [] },
  { thoughtText: "1st thought by user user3", username: "user3", reactions: [] },
];

module.exports = {
  userData,
  thoughtData,
};
