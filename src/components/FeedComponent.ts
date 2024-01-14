import { Post } from "../models/Post";
import { AuthService } from "../services/AuthService";
import { FeedService } from "../services/FeedService";

export class FeedComponent {
  static showFeed(): void {
    const feedContainer = document.getElementById("feed-container")!;
    feedContainer.innerHTML = "";

    const currentUser = AuthService.getCurrentUser();
    const posts = FeedService.getPosts();

    if (posts.length === 0) {
      feedContainer.innerHTML = "<p>No posts available.</p>";
    } else {
      posts.forEach((post) => {
        const postElement = document.createElement("div");
        postElement.classList.add("post");
        postElement.dataset.username = post.username;
        postElement.dataset.timestamp = String(post.timestamp);

        const postInfoElement = document.createElement("div");
        postInfoElement.classList.add("postInfo");
        postElement.appendChild(postInfoElement);

        const usernameElement = document.createElement("strong");
        usernameElement.innerText = post.username;
        postInfoElement.appendChild(usernameElement);

        const timestampElement = document.createElement("small");
        timestampElement.innerText = ` at ${new Date(
          post.timestamp,
        ).toLocaleString()}`;
        postInfoElement.appendChild(timestampElement);

        if (post.image) {
          const imageElement = document.createElement("img");
          imageElement.src = post.image;
          postElement.appendChild(imageElement);
        }

        const contentElement = document.createElement("p");
        contentElement.innerText = post.content;
        postElement.appendChild(contentElement);

        if (currentUser && currentUser === post.username) {
          const actionsElement = document.createElement("div");
          actionsElement.classList.add("actions-div");
          postElement.appendChild(actionsElement);

          const editButton = document.createElement("button");
          editButton.innerText = "Edit";
          editButton.classList.add("edit-btn");
          editButton.addEventListener("click", () => this.editPost(post));
          actionsElement.appendChild(editButton);

          const deleteButton = document.createElement("button");
          deleteButton.innerText = "Delete";
          deleteButton.classList.add("delete-btn");
          deleteButton.addEventListener("click", () => this.deletePost(post));
          actionsElement.appendChild(deleteButton);
        }

        feedContainer.appendChild(postElement);
      });
    }
  }

  static addPost(): void {
    const postInput = document.getElementById("post-input") as HTMLInputElement;
    const content = postInput.value.trim();
    const imageInput = document.getElementById("image-src") as HTMLInputElement;
    const image = imageInput.value;

    if (content) {
      const currentUser = AuthService.getCurrentUser();
      if (currentUser) {
        FeedService.addPost(currentUser, image, content);
        postInput.value = "";
        this.showFeed();
      }
    }
  }

  static deletePost(post: Post): void {
    const confirmDelete = confirm("Are you sure you want to delete this post?");
    if (confirmDelete) {
      const currentUser = AuthService.getCurrentUser();
      if (currentUser && currentUser === post.username) {
        FeedService.removePost(post.username, post.timestamp);
        this.showFeed();
      } else {
        alert("You can't delete this post.");
      }
    }
  }

  static editPost(post: Post): void {}
}
