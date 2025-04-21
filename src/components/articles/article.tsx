import Link from "next/link";
import React from "react";
// import { Article } from "@/utils/types";
import { Article } from "@prisma/client";

export default function ArticleItem({ article }: { article: Article }) {
  return (
    <>
      <div className="box-border p-4 rounded-lg border-2 border-neutral-300 hover:bg-slate-400 w-full md:w-2/5 lg:w-1/4">
        <div className="text-xl text-gray-600 font-bold line-clamp-1"> {article.title}</div>

        <div className="text-xl text-gray-950 font-bold text-left line-clamp-1">
          {" "}
          {article.description}
        </div>
        <div>
          <Link
            className="text-2 font-bold rounded-sm bg-gray-300 hover:bg-white text-center w-full block"
            href={`/articles/${article.id}`}
          >
            Read more
          </Link>
        </div>
      </div>
    </>
  );
}
