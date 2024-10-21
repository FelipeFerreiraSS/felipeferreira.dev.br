type HeaderImage = {
  id: number;
  imageUrl: string;
}

type MostRecentPost = {
  id: number;
  title: string;
  summary: string;
  createdAt: Date;
  headerImage: HeaderImage;
}

type TopAuthor = {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  postsPublished: number;
}

type PostsPerTag = {
  idTag: number;
  tagName: string;
  totalPosts: number;
}

type PostsByMonth = {
  id: number;
  title: string;
  createdAt: Date;
  published: boolean;
}

export type Analytics = {
  message: string;
  postsPublished: number;
  postsDraft: number;
  tags: number;
  topAuthor: TopAuthor;
  images: number;
  mostRecentPost: MostRecentPost;
  averageReadTime: string; // Ex: "6:30"
  postsPerTag: PostsPerTag[];
  postsByMonth: PostsByMonth[];
}