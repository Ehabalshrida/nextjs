"use client";
import axios from "axios";
import React, { useState } from "react";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
interface AddCommentFormProps {
  ArticleId: number;
}
const AddCommentForm = ({ ArticleId }: AddCommentFormProps) => {
  const router = useRouter();
  const [text, setText] = useState("");
  const [validationError, setValidationError] = useState<{
    [key: string]: string;
  }>({});
  const formSubmitHandler = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log(text);
    try {
      const comment: Comment = await axios.post("/api/comments", {
        text,
        articleId: ArticleId,
      });
      setValidationError({});
      console.log(comment);
      router.refresh();
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
      setText("");
    }
  };

  return (
    <form onSubmit={formSubmitHandler} className="mt-4">
      <input
        className="rounded-lg text-xl p-2 w-full bg-white border-2 border-green-500 focus:shadow-md"
        type="text"
        placeholder="Add a comment..."
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <div className="text-red-500 mt-1 text-sm font-light text-left">
        {validationError["text"]}
      </div>
      <button
        type="submit"
        className="bg-green-700 text-white mt-2 p-1 w-min text-xl rounded-lg hover:bg-green-900 transition"
      >
        Comment
      </button>
    </form>
  );
};

export default AddCommentForm;
