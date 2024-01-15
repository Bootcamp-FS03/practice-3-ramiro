import { NotificationBuilder } from "../builders/NotificationBuilder";
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

        if (post.image && post.image !== "") {
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
    NotificationBuilder.showNotification(
      "Are you sure you want to delete this post?",
      () => {
        const currentUser = AuthService.getCurrentUser();
        if (currentUser && currentUser === post.username) {
          FeedService.removePost(post.username, post.timestamp);
          this.showFeed();
        } else {
          NotificationBuilder.showNotification("You can't delete this post.");
        }
      },
    );
  }

  static editPost(post: Post): void {
    const modalContent = document.createElement("div");
    modalContent.classList.add("edit-form");

    // Create content input
    const contentInput = document.createElement("input");
    contentInput.type = "text";
    contentInput.value = post.content;
    contentInput.placeholder = "Enter your new content";
    modalContent.appendChild(contentInput);

    // Create image input
    const imageInput = document.createElement("input");
    imageInput.type = "text";

    if (post.image) imageInput.value = post.image;

    imageInput.placeholder = "Enter your new image URL";
    modalContent.appendChild(imageInput);

    NotificationBuilder.showNotification(
      "Edit Post",
      () => {
        const content = contentInput.value.trim();
        const image = imageInput.value.trim();

        if (content || image) {
          // User confirmed the edit
          const editedPost = { ...post, content, image };
          FeedService.editPost(editedPost);
          this.showFeed();
        } else {
          // User canceled the edit
        }
      },
      modalContent,
    );
  }
}

// const modal = document.getElementById("edit-post-dialog")!;
// NotificationBuilder.showNotification(
//   "Edit post",
//   () => {
//     FeedService.editPost(post);
//   },
//   post,
// );

// const confirmButton = document.createElement("button");
// confirmButton.innerText = "Confirm";

// let content = prompt("Please, enter your new content:", `${post.content}`);
// let image = prompt("Please, enter your new image:", `${post.image}`);

// if (content && image) {
//   post = { ...post, content, image };
// } else if (!content && image) {
//   post = { ...post, image, content: "" };
// } else if (content && !image) {
//   post = { ...post, content, image: "" };
// }

// FeedService.editPost(post);
// this.showFeed();
