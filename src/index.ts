import { User } from "./models/User";

const user = new User({ id: 1, name: "New Ward", age: 0 });

user.onEvent("save", () => {
  console.log(user);
});
user.save();
