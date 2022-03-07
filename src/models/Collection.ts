import { Eventing } from "./Eventing";
import axios, { AxiosResponse, AxiosPromise } from "axios";

export class Collection<T, K> {
  models: T[] = [];
  events: Eventing = new Eventing();

  constructor(public rootUrl: string, public deserialize: (json: K) => T) {}

  get onEvent() {
    return this.events.onEvent;
  }

  get triggerEvent() {
    return this.events.triggerEvent;
  }

  fetch(): void {
    axios.get(this.rootUrl).then((respones: AxiosResponse) => {
      respones.data.forEach((value: K) => {
        this.models.push(this.deserialize(value));
      });
      this.triggerEvent("change");
    });
  }
}
