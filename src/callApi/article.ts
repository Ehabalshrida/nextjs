import { Article } from "@prisma/client";
import {PAGE_SIZE} from "@/utils/constants";
import { SingleArticle } from "@/utils/types";

export async function getArticles(pageNumber: string | undefined): Promise<Article[]> {
 
  const response = await fetch(
    `http://localhost:3000/api/articles?pageNumber=${pageNumber}&pageSize=${PAGE_SIZE}`,
    // { cache: "force-cache" } // Forces the browser to use cached data if available, even if stale. Fetches from the server only if no cached data exists.
    { cache: "no-store" } // Prevents caching; always fetches fresh data from the server.
    // { cache: "no-cache" } // Forces a request to the server to validate the cached response and fetch new data if necessary.
    // { next: { revalidate: 50 } } // Ensures data is refetched from the server at most once every 50 seconds.
  );
  // const data: Article[] = await response.json();

// console.log(data);
  if (!response.ok) {
    throw new Error("Something went wrong");
  }

  return response.json();
}
export async function getArticleCount() {
  const response = await fetch(
    `http://localhost:3000/api/articles/count`
  );

  if (!response.ok) {
    throw new Error("Something went wrong");
  }
  const count =await response.json();

  return count;
}
export async function getArticlesBySearch(searchText: string): Promise<Article[]> {
 
  const response = await fetch(
    `http://localhost:3000/api/articles/search?searchText=${searchText}`,
    // { cache: "force-cache" } // Forces the browser to use cached data if available, even if stale. Fetches from the server only if no cached data exists.
    { cache: "no-store" } // Prevents caching; always fetches fresh data from the server.
    // { cache: "no-cache" } // Forces a request to the server to validate the cached response and fetch new data if necessary.
    // { next: { revalidate: 50 } } // Ensures data is refetched from the server at most once every 50 seconds.
  );
  // const data: Article[] = await response.json();

// console.log(data);
  if (!response.ok) {
    throw new Error("Something went wrong");
  }

  return response.json();
}
export async function getSingleArticle(ArticleId: string): Promise<SingleArticle> {
 
  const response = await fetch(
    `http://localhost:3000/api/articles/${Number(ArticleId)}`,
    // { cache: "force-cache" } // Forces the browser to use cached data if available, even if stale. Fetches from the server only if no cached data exists.
    { cache: "no-store" } // Prevents caching; always fetches fresh data from the server.
    // { cache: "no-cache" } // Forces a request to the server to validate the cached response and fetch new data if necessary.
    // { next: { revalidate: 50 } } // Ensures data is refetched from the server at most once every 50 seconds.
  );
  // const data: Article[] = await response.json();

// console.log(data);
  if (!response.ok) {
    throw new Error("Something went wrong");
  }

  return response.json();
}