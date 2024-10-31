import { Post } from "./Post";

export type Image = {
  id: number;
  imageUrl: string;
  createdAt: Date;
  updatedAt: Date;
  postCount: number
};