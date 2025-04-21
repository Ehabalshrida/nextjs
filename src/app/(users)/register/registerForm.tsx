"use client";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import ButtonSpinner from "@/components/general/buttonSpinner";
export default function RegisterForm() {
  const [registerInfo, setRegisterInfo] = useState({
    email: "",
    password: "",
    username: "",
  });
  const [validationError, setValidationError] = useState<{
    [key: string]: string;
  }>({});
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!registerInfo.username) {
      console.log("username is required");
      toast.error("username is required");
    }
    if (!registerInfo.email) {
      console.log("Email is required");
      toast.error("Email is required");

    }
    if (!registerInfo.password) {
      console.log("Password is required");
      toast.error("Password is required");
      return;
    }
    try {
      console.log({ registerInfo });
      setLoading(true);
      const res = await axios.post("/api/users/register", registerInfo);
      console.log(res);
      router.replace("./");
      router.refresh();
      console.log("afterreplace");
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
    <form className="flex flex-col p-5 rounded justify-center items-center bg-slate-400 w-full md:w-1/3 gap-7">
      <div>
        <input
          type="text"
          onChange={(e) =>
            setRegisterInfo((prev) => ({ ...prev, username: e.target.value }))
          }
          className="text-2xl border rounded text-black p-2 w-full"
          placeholder="Enter your username"
        />
        <div className="text-red-500 mt-1 text-sm font-light text-left">
          {validationError["username"]}
        </div>
      </div>
      <div>
        <input
          type="email"
          onChange={(e) =>
            setRegisterInfo((prev) => ({ ...prev, email: e.target.value }))
          }
          className="text-2xl border rounded text-black p-2 w-full"
          placeholder="Enter your email"
        />
        <div className="text-red-500 mt-1 text-sm font-light text-left">
          {validationError["email"]}
        </div>
      </div>
      <div>
        <input
          type="password"
          onChange={(e) =>
            setRegisterInfo((prev) => ({ ...prev, password: e.target.value }))
          }
          className="text-2xl border rounded text-black p-2 w-full"
          placeholder="Enter your password"
        />
        <div className="text-red-500 text-sm mt-1 font-light text-left">
          {validationError["password"]}
        </div>
      </div>
      <button
        type="submit"
        onClick={handleSubmit}
        className="text-2xl bg-blue-700 rounded-full w-2/3 py-2 px-1 cursor-pointer"
      >
        {loading ? <ButtonSpinner /> : "Register"}
      </button>
    </form>
  );
}
