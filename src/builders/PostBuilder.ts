import { FeedComponent } from "../components/FeedComponent";
import { Post } from "../models/Post";

export class PostBuilder {
  public static createPostElement(
    post: Post,
    currentUser: string | null,
  ): HTMLDivElement {
    const postElement = document.createElement("div");
    postElement.classList.add("post");
    postElement.dataset.username = post.username;
    postElement.dataset.timestamp = String(post.timestamp);

    const postInfoElement = this.createPostInfoElement(post);
    postElement.appendChild(postInfoElement);

    if (post.image && post.image !== "") {
      const imageElement = document.createElement("img");
      imageElement.src = post.image;
      postElement.appendChild(imageElement);
    }

    const contentElement = document.createElement("p");
    contentElement.innerText = post.content;
    postElement.appendChild(contentElement);

    if (currentUser && currentUser === post.username) {
      const actionsElement = this.createActionsElement(post);
      postElement.appendChild(actionsElement);
    }

    return postElement;
  }

  private static createPostInfoElement(post: Post): HTMLDivElement {
    const postInfoElement = document.createElement("div");
    postInfoElement.classList.add("postInfo");

    const usernameElement = document.createElement("strong");
    usernameElement.innerText = post.username;
    postInfoElement.appendChild(usernameElement);

    const timestampElement = document.createElement("small");
    timestampElement.innerText = ` at ${new Date(
      post.timestamp,
    ).toLocaleString()}`;
    postInfoElement.appendChild(timestampElement);

    return postInfoElement;
  }

  private static createActionsElement(post: Post): HTMLDivElement {
    const actionsElement = document.createElement("div");
    actionsElement.classList.add("actions-div");

    const editButton = this.createButton("Edit", "edit-btn", () =>
      FeedComponent.editPost(post),
    );
    const deleteButton = this.createButton("Delete", "delete-btn", () =>
      FeedComponent.deletePost(post),
    );

    actionsElement.appendChild(editButton);
    actionsElement.appendChild(deleteButton);

    return actionsElement;
  }

  private static createButton(
    text: string,
    className: string,
    clickHandler: () => void,
  ): HTMLButtonElement {
    const button = document.createElement("button");
    button.innerText = text;
    button.classList.add(className);
    button.addEventListener("click", clickHandler);

    return button;
  }
}
