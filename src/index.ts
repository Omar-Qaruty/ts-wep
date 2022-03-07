import { Collection } from "./models/Collection";
import { User, UserProps } from "./models/User";

const collection = User.buildUserCollection();

collection.onEvent("change", () => {
  console.log(collection);
});

collection.fetch();
