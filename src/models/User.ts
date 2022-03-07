import { Model } from "./Model";

export interface UserProps {
  //    the "?" means that the props are optional , you don't need to pass all the props in the new object.
  name?: string;
  age?: number;
  id?: number;
}
const rootUrl = "http://localhost:3000/users";

export class User extends Model<UserProps> {}
