import { Model } from "../models/Model";
import { UserProps } from "../models/User";

// T is gonna have all the same propreties as a Model with type K loaded into it.
// the definition of K coming from the secoend Geniric type passed in.
// whenever View is refrenced type of Model will be passed in (T).
//  the second will be passed in is going to be the set of attributes that exists in that Model
// the second type K is being copied to the first type K.
// it would look like View<T extends Model<UserProps>,UserProps >.
// check UserFrom class.

export abstract class View<T extends Model<K>, K> {
  constructor(public parent: Element, public model: T) {
    this.bindModel();
  }

  bindModel(): void {
    this.model.onEvent("change", () => {
      this.render();
    });
  }

  abstract eventsMap(): { [key: string]: () => void };
  abstract template(): string;

  bindEvents(fragment: DocumentFragment): void {
    const eventsMap = this.eventsMap();

    for (let eventKey in eventsMap) {
      const [eventName, selector] = eventKey.split(":");

      fragment.querySelectorAll(selector).forEach((element) => {
        element.addEventListener(eventName, eventsMap[eventKey]);
      });
    }
  }

  render(): void {
    //   clearing the parent element so it replaces the old element with a new one.
    this.parent.innerHTML = "";
    const templateElement = document.createElement("template");
    templateElement.innerHTML = this.template();

    this.bindEvents(templateElement.content);

    this.parent.append(templateElement.content);
  }
}
