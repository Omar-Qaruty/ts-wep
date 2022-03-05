// Type alias a function that has no arugs or return value.(empty function)
type Callback = () => void;
//  events are registerd after the User have been created.
// the name of the event stored in object "key" that points to the functionaltiy is stored in the callback.
export class Eventing {
  events: { [key: string]: Callback[] } = {};

  onEvent = (eventName: string, callback: Callback): void => {
    const handlers = this.events[eventName] || [];
    handlers.push(callback);
    this.events[eventName] = handlers;
  };

  triggerEvent = (eventName: string): void => {
    //   check if there is some registerd events in eventName.
    const handlers = this.events[eventName];
    if (!handlers || handlers.length === 0) {
      return;
    }
    handlers.forEach((callback) => {
      callback();
    });
  };
}
