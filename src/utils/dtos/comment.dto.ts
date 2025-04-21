export interface CreateCommentDto {
    text: string;
    articleId: string;
}
export interface UpdateCommentDto {
    text?: string;
}