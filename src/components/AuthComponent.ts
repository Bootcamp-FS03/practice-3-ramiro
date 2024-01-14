import { User } from "../models/User";
import { AuthService } from "../services/AuthService";

export class AuthComponent {
  static showLogin(): void {
    document.getElementById("loginPage")!.style.display = "block";
    document.getElementById("registerPage")!.style.display = "none";
    document.getElementById("changePasswordPage")!.style.display = "none";
    document.getElementById("forgot-passord")!.style.display = "block";
    document.getElementById("back-to-login")!.style.display = "none";
  }

  static showRegistration(): void {
    document.getElementById("loginPage")!.style.display = "none";
    document.getElementById("registerPage")!.style.display = "block";
    document.getElementById("changePasswordPage")!.style.display = "none";
    document.getElementById("forgot-passord")!.style.display = "block";
    document.getElementById("back-to-login")!.style.display = "none";
  }

  static showChangePassword(): void {
    document.getElementById("loginPage")!.style.display = "none";
    document.getElementById("registerPage")!.style.display = "none";
    document.getElementById("changePasswordPage")!.style.display = "block";
    document.getElementById("forgot-passord")!.style.display = "none";
    document.getElementById("back-to-login")!.style.display = "block";
  }

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
      alert("Invalid credentials.");
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
        alert("Passwords don't match.");
        return;
      }

      if (!AuthService.isUsernameAvailable(username)) {
        alert("Username already exists.");
        return;
      }

      if (!AuthService.isEmailAvailable(email)) {
        alert("Email already registered.");
        return;
      }

      const newUser: User = {
        username,
        password,
        email,
      };

      const isRegistered = AuthService.register(newUser);

      if (isRegistered) {
        alert("User registered successfully.");
        localStorage.setItem("user", username);
        location.reload();
      } else {
        alert("Username already exists.");
      }
    } else {
      alert("Fill all inputs.");
    }
  }

  static changePassword(): void {
    const emailInput = document.getElementById(
      "ps-email",
    ) as HTMLInputElement;
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
      alert("Passwords don't match.");
      return;
    }

    const changePasswords = AuthService.changePassword(email, newPassword);

    if (changePasswords) alert("Password changed successfully.");
  }
}
