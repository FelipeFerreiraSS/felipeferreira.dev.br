import { Post } from "./Post";

export type Tag = {
  id: number;
  name: string;
  createdAt: Date;
  updatedAt: Date;

  posts: Post[];
};