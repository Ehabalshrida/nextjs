"use client";
import { CommentsWithUser } from "@/utils/types";
import { useState } from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
import UpdateCommentModal from "./updateCommentModal";
import axios from "axios";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

interface Props {
  comment: CommentsWithUser;
  loginedUserId: number | undefined;
  isAdmin: boolean | undefined;
}
const CommentItem = ({ comment, loginedUserId, isAdmin  }: Props) => {
  const router = useRouter();
  const [open, setOpen] = useState(false);
const handleDelete = async (id: number) => {
    try {
      if(!confirm("Are you sure you want to delete this comment?")) return;
      const res = await axios.delete(`/api/comments/${id}`);
      console.log(res);
      toast.success("Comment deleted successfully");
      router.refresh();
    } catch (error: unknown) {
      if (axios.isAxiosError(error) && error.response) {
        return toast.error(error.response.data.message);
      }
    }}
  return (
    <div className="my-5 rounded-lg p-3 bg-gray-200 border-2 border-gray-300">
      <div className="flex items-center justify-between mb-2">
        <strong className="text-gray-800 uppercase">
          {comment.user.username}
        </strong>
        <span className="bg-yellow-700 px-1 rounded-lg text-white">
          {new Date(comment.createdAt).toDateString()}
        </span>
      </div>
      <div>
        <div className="flex items-center justify-between">
          <p className="text-gray-800 mb-2">{comment.text}</p>
          <div className="flex items-center justify-between">
            {loginedUserId && loginedUserId === comment.userId && (
              <FaEdit
                onClick={() => setOpen(true)}
                className="text-green-600 text-xl cursor-pointer me-3"
              />
            )}
            {loginedUserId && ((loginedUserId === comment.userId) || isAdmin) && (
              <FaTrash  onClick={() => handleDelete(comment.id)} className="text-red-600 text-xl cursor-pointer" />
            )}
          </div>
        </div>
      </div>
      {open && <UpdateCommentModal setOpen={setOpen} comment={comment} />}
    </div>
  );
};

export default CommentItem;
