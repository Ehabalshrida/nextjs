import { Article, Comment } from "@prisma/client";
// export type Article = {
//   id: number;
//   userId: number;
//   body: string;
//   title: string;
// };
export interface ArticleProps {
  params: {articleId: string}
}

export type JWTPayload = {
  id: number;
  isAdmin: boolean;
  username: string;
};

export interface CommentProps {
  params: {id: string}
}
type UserComment = {
  username: string,
  email: string
}
export type CommentsWithUser = Comment & {user:UserComment }
export type SingleArticle = Article & {comments:CommentsWithUser []}