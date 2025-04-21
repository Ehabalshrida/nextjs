"use client";
import ButtonSpinner from "@/components/general/buttonSpinner";
import axios from "axios";
import React, { useState } from "react";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { Article } from "@prisma/client";
interface EditArticleProps {
  article: Article;
}
export default function EditArticle({article}: EditArticleProps) {
  const [title, setTitle] = useState(article.title);
  const [description, setDescription] = useState(article.description);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const [validationError, setValidationError] = useState<{
    [key: string]: string;
  }>({});
  const formSubmitHandler = async (e: React.FormEvent) => {
    e.preventDefault();
    if (title === "") return toast.error("Title is required");
    if (description === "") return toast.error("Description is required");
    try {
      setLoading(true);
      const returnArticle = await axios.put(`/api/articles/${article.id}`, {
        title,
        description,
      });
      console.log({ returnArticle });
      setTitle("");
      setDescription("");
      toast.success("Article updated successfully");
      setValidationError({});
      router.refresh();
      router.push("/articles/?pageNumber=1");
    } catch (error: unknown) {
      if (axios.isAxiosError(error) && error.response) {
        console.log({ error: error });
        if (error.response.data.message) {
          return toast.error(error.response.data.message);
        } else if (error.response.data.errors) {
          setValidationError(error.response.data.errors);
        }
      }
    } finally {
      setLoading(false);
    }
  };
  return (
    <div>
      <form
        onSubmit={formSubmitHandler}
        className="flex flex-col border-black border rounded p-5 w-full md:w-96 lg:w-96"
      >
        <input
          className="mb-4 border border-black rounded p-2 text-xl"
          type="text"
          placeholder="Enter Article Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <div className="text-red-500 text-sm font-light text-left">
          {validationError["title"]}
        </div>
        <textarea
          className="mb-4 p-2 lg:text-xl border border-black rounded resize-none"
          rows={5}
          placeholder="Enter Artilce Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        ></textarea>
        <div className="text-red-500 mt-1 text-sm font-light text-left">
          {validationError["description"]}
        </div>
        <button
          type="submit"
          className="text-2xl text-white bg-blue-700 hover:bg-blue-900 p-2 rounded-lg font-bold"
        >
          {loading ? <ButtonSpinner /> : "Edit"}
        </button>
      </form>
    </div>
  );
}
