import React from "react";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { Comment } from "@prisma/client";
import { PAGE_SIZE } from "@/utils/constants";
import Pagination from "@/components/general/pagination";
import DeleteCommentButton from "./deleteCommentButton";
import { getAllComments, getCommentCount } from "@/callApi/comment";
interface SearchPageProps {
  searchParams: { pageNumber: string };
}
export default async function CommentTable({
  searchParams: { pageNumber },
}: SearchPageProps) {
  const token = (await cookies()).get("jwtToken")?.value || "";
  if (!token) {
    redirect("/login");
  }
  
  const comments: Comment[] = await getAllComments(pageNumber, token);
  console.log({ comments });
  const count: number = await getCommentCount();
  const pages = Math.ceil(count / PAGE_SIZE);
console.log({pages, count})
  return (
    <section className="p-5">
      <h1 className="mb-7 text-2xl font-semibold text-gray-700">Articles</h1>
      <table className="table w-full text-left">
        <thead className="border-t-2 border-b-2 border-gray-500 lg:text-xl">
          <tr>
            <th className="p-1 lg:p-2">Comment</th>
            <th className="hidden lg:inline-block lg:p-2">Created At</th>
            <th>Actions</th>
            <th className="hidden lg:inline-block"></th>
          </tr>
        </thead>
        <tbody>
          {comments.map((comment) => (
            <tr key={comment.id} className="border-b border-t border-gray-300">
              <td className="p-3 text-gray-700">{comment.text}</td>
              <td className="hidden lg:inline-block text-gray-700 font-normal p-3">
                {new Date(comment.createdAt).toDateString()}
              </td>
              <td className="p-3">
                <DeleteCommentButton commentId={comment.id} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <Pagination
        pageNumber={parseInt(pageNumber)}
        pages={pages}
        route="/admin/comments-table"
      />
    </section>
  );
}
