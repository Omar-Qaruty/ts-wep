import { Attrubutes } from "./Attributes";
import { Model } from "./Model";
import { AbiSync } from "./ApiSync";
import { Eventing } from "./Eventing";

export interface UserProps {
  //    the "?" means that the props are optional , you don't need to pass all the props in the new object.
  name?: string;
  age?: number;
  id?: number;
}
const rootUrl = "http://localhost:3000/users";

export class User extends Model<UserProps> {
  static buildUser(attrs: UserProps): User {
    return new User(
      new Attrubutes<UserProps>(attrs),
      new Eventing(),
      new AbiSync<UserProps>(rootUrl)
    );
  }
}
