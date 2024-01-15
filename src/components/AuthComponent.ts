import { NotificationBuilder } from "../builders/NotificationBuilder";
import { User } from "../models/User";
import { AuthService } from "../services/AuthService";

export class AuthComponent {
  static login(): void {
    const usernameInput = document.getElementById(
      "username",
    ) as HTMLInputElement;
    const passwordInput = document.getElementById(
      "password",
    ) as HTMLInputElement;

    const username = usernameInput.value;
    const password = passwordInput.value;

    const isAuthenticated = AuthService.login(username, password);

    if (isAuthenticated) {
      localStorage.setItem("user", username);
      location.reload();
    } else {
      NotificationBuilder.showNotification("Invalid credentials.");
    }
  }

  static logout(): void {
    localStorage.removeItem("user");
    location.reload();
  }

  static register(): void {
    const usernameInput = document.getElementById(
      "reg-username",
    ) as HTMLInputElement;
    const emailInput = document.getElementById("reg-email") as HTMLInputElement;
    const passwordInput = document.getElementById(
      "reg-password",
    ) as HTMLInputElement;
    const confirmPasswordInput = document.getElementById(
      "confirmPassword",
    ) as HTMLInputElement;

    const email = emailInput.value;
    const password = passwordInput.value;
    const confirmPassword = confirmPasswordInput.value;
    const username = usernameInput.value;

    if (username && email && password && confirmPassword) {
      if (!AuthService.validatePassword(password, confirmPassword)) {
        NotificationBuilder.showNotification("Passwords don't match.");
        return;
      }

      if (!AuthService.isUsernameAvailable(username)) {
        NotificationBuilder.showNotification("Username already exists.");
        return;
      }

      if (!AuthService.isEmailAvailable(email)) {
        NotificationBuilder.showNotification("Email already registered.");
        return;
      }

      const newUser: User = {
        username,
        password,
        email,
      };

      const isRegistered = AuthService.register(newUser);

      if (isRegistered) {
        NotificationBuilder.showNotification("User registered successfully.");
        localStorage.setItem("user", username);
      }
    } else {
      NotificationBuilder.showNotification("Fill all inputs.");
    }
  }

  static changePassword(): void {
    const emailInput = document.getElementById("ps-email") as HTMLInputElement;
    const newPasswordInput = document.getElementById(
      "newPassword",
    ) as HTMLInputElement;
    const confirmNewPasswordInput = document.getElementById(
      "confirmNewPassword",
    ) as HTMLInputElement;

    const email = emailInput.value;
    const newPassword = newPasswordInput.value;
    const confirmNewPassword = confirmNewPasswordInput.value;

    if (!AuthService.validatePassword(newPassword, confirmNewPassword)) {
      NotificationBuilder.showNotification("Password don't match");
      return;
    }

    const changePasswords = AuthService.changePassword(email, newPassword);

    if (changePasswords) {
      NotificationBuilder.showNotification("Password updated successfully.");
    }
  }
}
