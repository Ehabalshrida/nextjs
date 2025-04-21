"use client";
import { DOMAIN } from "@/utils/constants";
import axios from "axios";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

interface DeleteCommentButtonProps {
    commentId: number;
}

const DeleteCommentButton = ({ commentId }: DeleteCommentButtonProps) => {
    const router = useRouter();

    const deleteArticleHandler = async () => {
        try {
            if (confirm("you want to delete this article, Are you sure?")) {
                await axios.delete(`${DOMAIN}/api/comments/${commentId}`);
                router.refresh();
                toast.success("Comments deleted Successfully");
            }
        } catch (error: unknown) {
            if (axios.isAxiosError(error) && error.response) {
              console.log({ error: error });
              return toast.error(error.response.data.message);
            }
          }
    }

    return (
        <div onClick={deleteArticleHandler} className="bg-red-600 text-white rounded-lg cursor-pointer inline-block text-center py-1 px-2 hover:bg-red-800 transition">
            Delete
        </div>
    )
}

export default DeleteCommentButton