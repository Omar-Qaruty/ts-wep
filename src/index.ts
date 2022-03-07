import { Collection } from "./models/Collection";

const collection = new Collection("http://localhost:3000/users");

collection.onEvent("change", () => {
  console.log(collection);
});

collection.fetch();
