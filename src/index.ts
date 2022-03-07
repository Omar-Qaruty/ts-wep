import { User } from "./models/User";
import { UserForm } from "./views/UserForm";

const user = User.buildUser({ name: "ward new name", age: 25 });
const userForm = new UserForm(document.getElementById("root"), user);

userForm.render();
