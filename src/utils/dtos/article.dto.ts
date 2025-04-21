export interface CreateArticleDto {
  description: string;
  title: string;
}
export interface UpdateArticleDto {
  description?: string;
  title?: string;
}