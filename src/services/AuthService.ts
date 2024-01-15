import { User } from "../models/User";

export class AuthService {
  public static users: User[] = JSON.parse(localStorage.getItem("users")!);

  static getCurrentUser(): string | null {
    return localStorage.getItem("user");
  }

  static login(username: string, password: string): boolean {
    const user = this.users.find(
      (u) => u.username === username && u.password === password,
    );
    return !!user;
  }

  static register(user: User): boolean {
    const existingUsername = this.users.find(
      (u) => u.username === user.username,
    );
    const existingEmail = this.users.find((u) => u.email === user.email);

    if (existingUsername || existingEmail) {
      return false;
    }

    this.users.push(user);
    localStorage.setItem("users", JSON.stringify(this.users));
    return true;
  }

  static validatePassword(password: string, confirmPassword: string): boolean {
    return password === confirmPassword;
  }

  static isUsernameAvailable(username: string): boolean {
    return !this.users.some((user) => user.username === username);
  }

  static isEmailAvailable(email: string): boolean {
    return !this.users.some((user) => user.email === email);
  }

  static changePassword(email: string, password: string): boolean {
    const existingUser = this.users.find((u) => u.email === email);

    if (existingUser) {
      const userIndex = this.users.indexOf(existingUser);
      this.users[userIndex].password = password;
      return true;
    }

    localStorage.setItem("users", JSON.stringify(this.users));
    return false;
  }
}
