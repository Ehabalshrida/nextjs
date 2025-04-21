import { Comment } from "@prisma/client";
import { PAGE_SIZE } from "@/utils/constants";
import { DOMAIN } from "@/utils/constants";
export async function getAllComments(
  pageNumber: string | undefined,
  token: string
): Promise<Comment[]> {
  const response = await fetch(
    `${DOMAIN}/api/comments?pageNumber=${pageNumber}&pageSize=${PAGE_SIZE}`,
    // { cache: "force-cache" } // Forces the browser to use cached data if available, even if stale. Fetches from the server only if no cached data exists.
    { cache: "no-store",  headers: {
      Cookie: `jwtToken=${token}`
  } } // Prevents caching; always fetches fresh data from the server.
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
export async function getCommentCount() {
  const response = await fetch(
    `${DOMAIN}/api/comments/count`
  );

  if (!response.ok) {
    throw new Error("Something went wrong");
  }
  const count =await response.json();

  return count;
}