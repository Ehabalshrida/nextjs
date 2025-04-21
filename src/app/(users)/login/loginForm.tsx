"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import axios from "axios";
import ButtonSpinner from "@/components/general/buttonSpinner";
export default function LoginForm() {
  const [loginInfo, setLoginInfo] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  console.log({ loginInfo });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!loginInfo.email) {
      console.log("Email is required");
       toast.error("Email is required");
    }
    if (!loginInfo.password) {
      console.log("Password is required");
      return toast.error("Password is required");
    }
    try {
      console.log({ loginInfo });
      setLoading(true);
      const res = await axios.post("/api/users/login", loginInfo);
      console.log(res);
      router.replace("./");
      router.refresh();
      console.log("afterreplace");
    } catch (error: unknown) {
      if (axios.isAxiosError(error) && error.response) {
        console.log({ error: error });
        return toast.error(error.response.data.message);
      }
    } finally {
      setLoading(false);
    }
  };
  return (
    <form className="flex flex-col p-5 rounded justify-center items-center bg-slate-400 w-full md:w-1/3 gap-7">
      <input
        type="email"
        onChange={(e) =>
          setLoginInfo((prev) => ({ ...prev, email: e.target.value }))
        }
        className="text-2xl border rounded text-black p-2 w-2/3"
        placeholder="Enter your email"
      />
      <input
        type="password"
        onChange={(e) =>
          setLoginInfo((prev) => ({ ...prev, password: e.target.value }))
        }
        className="text-2xl border rounded text-black p-2 w-2/3"
        placeholder="Enter your password"
      />
      <button
        type="submit"
        onClick={handleSubmit}
        className="text-2xl bg-blue-700 rounded-full w-2/3 py-2 px-1 cursor-pointer"
      >
        {loading ? <ButtonSpinner /> : "Login"}
      </button>
    </form>
  );
}
