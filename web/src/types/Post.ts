import { Image } from "./Image";
import { Tag } from "./Tag";
import { User } from "./User";

export type Post = {
  id: number;
  authorId: number;
  slug: string;
  published: boolean;
  title: string;
  headerImageId?: number | null;
  summary: string;
  content: string;
  createdAt: Date;
  updatedAt: Date;

  author: User;
  headerImage?: Image | null;
  tags: Tag[];
};