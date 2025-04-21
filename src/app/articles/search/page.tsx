import { getArticlesBySearch } from "@/callApi/article";
import ArticleItem from "@/components/articles/article";
import { Article } from "@prisma/client";
import React from "react";
interface SearchPageProps {
  searchParams: { searchData: string };
}
export default async function SearchPage({
  searchParams: { searchData },
}: SearchPageProps) {
  console.log({ searchData });
  const articles: Article[] = await getArticlesBySearch(searchData);
  console.log(articles);
  return (
    <div className="flex flex-col items-center justify-center gap-2">
      <div>Search Page</div>
      <div>  Articles based on: <span className="text-xl font-bold text-green-400">  {searchData}</span></div>
      <div className="flex items-start justify-center gap-2 flex-wrap w-full">
        {articles.length ?
          articles?.map((article: Article) => (
            <ArticleItem key={article.id} article={article} />
          ))
        :<div> no articles</div>}
      </div>
    </div>
  );
}
