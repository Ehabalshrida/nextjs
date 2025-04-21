// import { getSingleArticle } from "@/callApi/article";
import AddCommentForm from "@/components/comments/addComment";
import CommentItem from "@/components/comments/commentItem";
// import { Article } from '@/utils/types'
import { SingleArticle } from "@/utils/types";
import React from "react";
import { cookies } from "next/headers";
import { verifyTokenForPage } from "@/utils/verifyToken";
import { prisma } from "@/utils/db";
import { redirect } from "next/navigation";
interface ArticlePageProps {
  params: { articleId: string };
}
export default async function ArticlePage({ params }: ArticlePageProps) {
  const token = (await cookies()).get("jwtToken")?.value || "";
  const userPayload = verifyTokenForPage(token);
  // const article: SingleArticle = await getSingleArticle(params.articleId);

  // use DB query to get article by id inside server side component
  const article = (await prisma.article.findUnique({
    where: {
      id: parseInt(params?.articleId),
    },
    include: {
      comments: {
        orderBy: { createdAt: "desc" },
        include: { user: { select: { username: true, email: true } } },
      },
    },
  })) as SingleArticle;
  if (!article) redirect("/not-found");
  return (
    <div className="container tetx-center mx-auto w-full md:w-3/4">
      <div className="flex flex-col items-start gap-4 rounded-lg border-1 p-4 bg-slate-100 hover:bg-slate-600">
        <h1 className="text-xl font-bold text-black ">Article Page</h1>
        <p className="text-xl font-light text-black ">
          Article ID: {article.id}
        </p>
        <h2 className="text-xl font-light text-black ">{article.title}</h2>
        <p className="text-xl font-bold text-blue-800 ">
          {article.description}
        </p>
      </div>
      {userPayload ? (
        <AddCommentForm ArticleId={article.id} />
      ) : (
        <p className="text-xl font-bold mt-3 text-red-800">
          Please login to comment
        </p>
      )}

      {article?.comments.length &&
        article?.comments.map((comment) => (
          <CommentItem
            comment={comment}
            key={comment.id}
            loginedUserId={userPayload?.id}
            isAdmin={userPayload?.isAdmin}
          />
        ))}
    </div>
  );
}
// to route to this page use this rute http://localhost:3000/articles/:articleId
