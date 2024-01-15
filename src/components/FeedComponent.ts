import { NotificationBuilder } from "../builders/NotificationBuilder";
import { PostBuilder } from "../builders/PostBuilder";
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
        const postElement = PostBuilder.createPostElement(post, currentUser);
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
          const editedPost = { ...post, content, image };
          FeedService.editPost(editedPost);
          this.showFeed();
        }
      },
      modalContent,
    );
  }
}
