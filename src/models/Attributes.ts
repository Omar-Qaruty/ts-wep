import { UserProps } from "./User";

export class Attrubutes<T> {
  constructor(private data: T) {}

  //   K reprsents the key of object.
  //   <K extends keyof T>
  //   setting restrains the type of K (K can only be on of the keys of T).
  //   (key: K)
  // you can only call get with (name,age,id) as strings.
  //   T[K] is normal object lookup(look up the interface of T(userprops) and return the value at key of K).

  get = <K extends keyof T>(key: K): T[K] => {
    return this.data[key];
  };
  set(update: T): void {
    //   Object.assige() 2 objects the first object copies the secoend's props.
    Object.assign(this.data, update);
  }
  getAll(): T {
    return this.data;
  }
}

// const attrs = new Attrubutes<UserProps>({
//   id: 5,
//   age: 20,
//   name: "GayStrightMan",
// });

// const name = attrs.get("name");
// const age = attrs.get("age");
// const id = attrs.get("id");
