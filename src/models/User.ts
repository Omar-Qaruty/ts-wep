import { Attrubutes } from "./Attributes";
import { Eventing } from "./Eventing";
import { Sync } from "./Sync";
import axios, { AxiosResponse, AxiosPromise } from "axios";

export interface UserProps {
  //    the "?" means that the props are optional , you don't need to pass all the props in the new object.
  name?: string;
  age?: number;
  id?: number;
}
const rootUrl = "http://localhost:3000/users";

export class User {
  public events: Eventing = new Eventing();
  public sync: Sync<UserProps> = new Sync<UserProps>(rootUrl);
  public attributes: Attrubutes<UserProps>;

  constructor(attrs: UserProps) {
    this.attributes = new Attrubutes<UserProps>(attrs);
  }

  get onEvent() {
    //   Not calling a function , just returning a refrence to events.onEvent method
    return this.events.onEvent;
  }
  get triggerEvent() {
    return this.events.triggerEvent;
  }
  get get() {
    return this.attributes.get;
  }
  set(update: UserProps): void {
    this.attributes.set(update);
    this.events.triggerEvent("change");
  }
  fetch(): void {
    const id = this.attributes.get("id");
    if (typeof id !== "number") {
      throw new Error("Cannot fetch without ID");
    }
    this.sync.fetch(id).then((response: AxiosResponse): void => {
      this.set(response.data);
    });
  }

  save(): void {
    this.sync
      .save(this.attributes.getAll())
      .then((response: AxiosResponse): void => {
        this.triggerEvent("save");
      })
      .catch(() => {
        this.triggerEvent("Error");
      });
  }
}
