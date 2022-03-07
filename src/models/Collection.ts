import { User, UserProps } from "./User";
import { Eventing } from "./Eventing";
import axios, { AxiosResponse, AxiosPromise } from "axios";

export class Collection {
  models: User[] = [];
  events: Eventing = new Eventing();

  constructor(public rootUrl: string) {}

  get onEvent() {
    return this.events.onEvent;
  }

  get triggerEvent() {
    return this.events.triggerEvent;
  }

  fetch(): void {
    axios.get(this.rootUrl).then((respones: AxiosResponse) => {
      respones.data.forEach((value: UserProps) => {
        const user = User.buildUser(value);
        this.models.push(user);
      });
      this.triggerEvent("change");
    });
  }
}
