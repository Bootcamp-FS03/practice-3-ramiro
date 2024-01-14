import { Post } from "../models/Post";

export class FeedService {
  private static posts: Post[] = [
    {
      username: "ramiro",
      image: "http://placekitten.com/200/300",
      content: "hello world!",
      timestamp: Date.now(),
    },
  ];

  static getPosts(): Post[] {
    return this.posts;
  }

  static addPost(username: string, image: string, content: string): void {
    const newPost: Post = {
      username,
      content,
      image,
      timestamp: Date.now(),
    };
    this.posts.unshift(newPost);
  }

  static removePost(username: string, timestamp: number): void {
    this.posts = this.posts.filter(
      (post) => !(post.username === username && post.timestamp === timestamp),
    );
  }

  static editPost(post: Post): void {

  }
}
