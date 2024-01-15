import { AuthComponent } from "./components/AuthComponent";
import { FeedComponent } from "./components/FeedComponent";
import { AuthService } from "./services/AuthService";

// Init Event Listener
document.getElementById("app")!.addEventListener("click", (e) => {
  if (!(e.target instanceof HTMLButtonElement)) {
    return;
  }

  if (e.target.dataset.toggleId) {
    let elem = document.getElementById(e.target.dataset.toggleId);

    if (elem && elem.id === "changePasswordPage") {
      document.getElementById("back-to-login")!.style.display = "block";
      document.getElementById("forgot-password")!.style.display = "none";
    } else {
      document.getElementById("back-to-login")!.style.display = "none";
      document.getElementById("forgot-password")!.style.display = "block";
    }

    document.getElementById("loginPage")!.style.display = "none";
    document.getElementById("registerPage")!.style.display = "none";
    document.getElementById("changePasswordPage")!.style.display = "none";

    elem!.style.display = "block";
  } else if (e.target.dataset.action) {
    switch (e.target.dataset.action) {
      case "login":
        AuthComponent.login();
        break;
      case "register":
        AuthComponent.register();
        break;
      case "changePassword":
        AuthComponent.changePassword();
        break;
      case "logout":
        AuthComponent.logout();
        break;
      case "addPost":
        FeedComponent.addPost();
        break;
      default:
        return;
    }
  }
});

// Authentication
if (AuthService.getCurrentUser()) {
  document.getElementById("loginPage")!.style.display = "none";
  document.getElementById("registerPage")!.style.display = "none";
  document.getElementById("changePasswordPage")!.style.display = "none";
  document.getElementById("forgot-password")!.style.display = "none";
  document.getElementById("back-to-login")!.style.display = "none";

  document.getElementById("navbar")!.style.display = "flex";
  document.getElementById(
    "welcome",
  )!.innerHTML = `Welcome ${AuthService.getCurrentUser()}!`;
  document.getElementById("feedPage")!.style.display = "flex";

  FeedComponent.showFeed();
}
