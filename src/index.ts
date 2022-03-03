import { User } from "./models/User";

const user = new User({ name: "Knight", age: 26 });

user.save();
