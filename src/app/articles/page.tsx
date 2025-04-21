import React from "react";
import ArticleItem from "@/components/articles/article";
// import { Article } from "@/utils/types";
import SearchField from "./searchField";
import Pagination from "@/components/general/pagination";
import { getArticleCount, getArticles } from "../../callApi/article";
import { Article } from "@prisma/client";
import {PAGE_SIZE} from "@/utils/constants";
interface SearchPageProps {
  searchParams: {pageNumber: string}
}
export default async function Articles({searchParams:{pageNumber}}:SearchPageProps) {
  // await new Promise((resolve) => {
  //   setTimeout(resolve, 5000);
  // });
  
  const articles: Article[] = await getArticles(pageNumber);
  console.log({articles});
  const count = await getArticleCount();

  console.log(count);
const pages = Math.ceil(count/PAGE_SIZE);
  return (
    <div className="container px-4 mx-auto">
      <SearchField />
      <div className="flex items-center justify-center gap-2 flex-wrap">
        {articles.length && articles?.map((article: Article) => (
          <ArticleItem key={article.id} article={article} />
        ))}
      </div>
      <Pagination pages={pages} pageNumber={Number(pageNumber)} route="/articles" />
    </div>
  );
}
// to route to this page use this rute http://localhost:3000/articles
