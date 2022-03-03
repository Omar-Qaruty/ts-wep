import axios, { AxiosResponse } from "axios";

interface UserProps {
  //    the "?" means that the props are optional , you don't need to pass all the props in the new object.
  name?: string;
  age?: number;
  id?: number;
}
// Type alias a function that has no arugs or return value.(empty function)
type Callback = () => void;

export class User {
  //  events are registerd after the User have been created.
  // the name of the event stored in object "key" that points to the functionaltiy is stored in the callback.
  events: { [key: string]: Callback[] } = {};

  constructor(private data: UserProps) {}

  get(propName: string): number | string {
    return this.data[propName];
  }
  set(update: UserProps): void {
    //   Object.assige() 2 objects the first object copies the secoend's props.
    Object.assign(this.data, update);
  }
  onEvent(eventName: string, callback: Callback): void {
    const handlers = this.events[eventName] || [];
    handlers.push(callback);
    this.events[eventName] = handlers;
  }

  triggerEvent(eventName: string): void {
    //   check if there is some registerd events in eventName.
    const handlers = this.events[eventName];
    if (!handlers || handlers.length === 0) {
      return;
    }
    handlers.forEach((callback) => {
      callback();
    });
  }

  fetch(): void {
    axios
      .get(`http://localhost:3000/users/${this.get("id")}`)
      .then((response: AxiosResponse): void => {
        //   inside the .then we have all the data
        this.set(response.data);
      });
  }

  save(): void {
    if (this.get("id")) {
      axios.put(`http://localhost:3000/users/${this.get("id")}`, this.data);
    } else {
      axios.post("http://localhost:3000/users/", this.data);
    }
  }
}
