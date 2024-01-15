import { AuthComponent } from "./components/AuthComponent";
import { FeedComponent } from "./components/FeedComponent";
import { AuthService } from "./services/AuthService";

// POPULATE LOCAL STORAGE SCRIPT
function populateLocalStorage(): void {
  const users = [
    { username: "ramiro", password: "password", email: "ramiro@example.com" },
    { username: "maria", password: "password", email: "maria@example.com" },
  ];

  const posts = [
    {
      username: "ramiro",
      content: "here is my cat!",
      image: "http://placekitten.com/200/300",
      timestamp: 1705335002353,
    },
    {
      username: "ramiro",
      content: "hello there!",
      image: "",
      timestamp: 1705335002352,
    },
    {
      username: "maria",
      content: "hello world",
      image: "",
      timestamp: 1705335002351,
    },
  ];

  localStorage.setItem("users", JSON.stringify(users));
  localStorage.setItem("posts", JSON.stringify(posts));
}

populateLocalStorage();

// EVENT LISTENERS
document
  .getElementById("show-login")!
  .addEventListener("click", () => AuthComponent.showLogin());
document
  .getElementById("show-register")!
  .addEventListener("click", () => AuthComponent.showRegistration());
document
  .getElementById("show-change-password")!
  .addEventListener("click", () => AuthComponent.showChangePassword());
document
  .getElementById("back-to-login")!
  .addEventListener("click", () => AuthComponent.showLogin());
document
  .getElementById("login-btn")!
  .addEventListener("click", () => AuthComponent.login());
document
  .getElementById("register-btn")!
  .addEventListener("click", () => AuthComponent.register());
document
  .getElementById("change-password-btn")!
  .addEventListener("click", () => AuthComponent.changePassword());
document
  .getElementById("logout-btn")!
  .addEventListener("click", () => AuthComponent.logout());
document
  .getElementById("add-post-btn")!
  .addEventListener("click", () => FeedComponent.addPost());

// Authentication
if (AuthService.getCurrentUser()) {
  document.getElementById("loginPage")!.style.display = "none";
  document.getElementById("registerPage")!.style.display = "none";
  document.getElementById("changePasswordPage")!.style.display = "none";
  document.getElementById("forgot-passord")!.style.display = "none";
  document.getElementById("navbar")!.style.display = "flex";
  document.getElementById(
    "welcome",
  )!.innerHTML = `Welcome ${AuthService.getCurrentUser()}!`;
  document.getElementById("feedPage")!.style.display = "flex";
  FeedComponent.showFeed();
}
