import { CommentsWithUser } from "@/utils/types";
import React, { Dispatch, SetStateAction } from "react";
import { IoMdCloseCircleOutline } from "react-icons/io";
import ButtonSpinner from "../general/buttonSpinner";
import axios from "axios";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
interface Props {
  comment: CommentsWithUser;
  setOpen: Dispatch<SetStateAction<boolean>>;
}
export default function UpdateCommentModal({ comment, setOpen }: Props) {
  const [updatedText, setUpdatedText] = React.useState(comment.text);
  const [loading, setLoading] = React.useState(false);
  const router = useRouter();
  const formSubmitHandler = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!updatedText) {
      toast.info("Please add a comment");
      return;
    }
    try {
      const updatedComment = axios.put(`/api/comments/${comment.id}`, {
        text: updatedText,
      });
      console.log({ updatedComment });
      toast.success("Comment updated successfully");
      setOpen(false);
      router.refresh();
    } catch (error: unknown) {
      if (axios.isAxiosError(error) && error.response) {
        return toast.error(error.response.data.message);
      }
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="fixed top-0 left-0 bottom-0 right-0 z-10 bg-black bg-opacity-40 flex items-center justify-center">
      <div className="w-11/12 lg:w-1/3 bg-white rounded-lg p-3">
        <div className="flex justify-end items-start mb-5">
          <IoMdCloseCircleOutline
            onClick={() => setOpen(false)}
            className="text-red-500 cursor-pointer text-3xl"
          />
        </div>
        <form onSubmit={formSubmitHandler}>
          <input
            type="text"
            placeholder="Edit Comment..."
            className="text-xl rounded-lg p-2 w-full bg-white mb-2"
            value={updatedText}
            onChange={(e) => setUpdatedText(e.target.value)}
          />
          <button
            type="submit"
            className="bg-green-700 w-full text-white mt-2 p-1 text-xl rounded-lg hover:bg-green-900 transition"
          >
            {loading ? <ButtonSpinner /> : "Edit"}
          </button>
        </form>
      </div>
    </div>
  );
}
