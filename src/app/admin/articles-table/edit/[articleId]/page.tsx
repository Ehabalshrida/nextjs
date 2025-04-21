import EditArticle from "@/app/admin/editArticle";
import { getSingleArticle } from "@/callApi/article";
import { Article } from "@prisma/client";
import React from "react";
interface EditArticlePageProps {
  params: { articleId: string };
}
export default async function EditArticlePage({
  params: { articleId },
}: EditArticlePageProps) {
  const article: Article = await getSingleArticle(articleId);
  console.log({ article });
  return <div>{article && <EditArticle article={article} />}</div>;
}
