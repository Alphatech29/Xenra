"use client";
import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";

import Input from "../../../../components/ui/inputField";
import Button from "../../../../components/ui/button";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { MdCancel } from "react-icons/md";

import { useLogin } from "../../../../hooks/useLogin";
import useToast from "../../../../hooks/useToast";

export default function LoginPage() {
  const toast = useToast();
  const router = useRouter();

  const { login, loading, error, success } = useLogin();

  const identifierRef = useRef(null);
  const passwordRef = useRef(null);

  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    identifier: "",
    password: "",
  });

  useEffect(() => {
    if (error) toast.error(error);
  }, [error]);

  useEffect(() => {
    if (success) {
      toast.success("Login successful");
      setFormData({ identifier: "", password: "" });
      setShowPassword(false);

      router.replace("/dashboard");
    }
  }, [success, router]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.identifier.trim()) {
      identifierRef.current?.focus();
      toast.warning("Email is required");
      return;
    }

    if (!formData.password.trim()) {
      passwordRef.current?.focus();
      toast.warning("Password is required");
      return;
    }

    await login({
      email: formData.identifier,
      password: formData.password,
    });
  };

  return (
    <main className="relative min-h-screen overflow-hidden flex items-center justify-center xs:px-3 md:px-6 bg-linear-to-tr from-primary-50 via-primary-300 to-primary-200">
      {/* BACKGROUND */}
      <div className="absolute inset-0 z-0">
        <span className="bubble bubble-1"></span>
        <span className="bubble bubble-2"></span>
        <span className="bubble bubble-3"></span>
        <span className="bubble bubble-4"></span>
      </div>

      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl w-full">
        {/* LEFT */}
        <div className="hidden lg:flex space-y-60 flex-col justify-center">
          <div>
            <h1 className="text-4xl font-bold text-primary-950 mb-4">
              Welcome to Xenra
            </h1>
            <p className="text-silver-700 font-semibold w-4/5">
              To keep connected with us please login with your personal info.
            </p>
          </div>

          <div className="mt-10 flex items-center bg-white rounded-2xl shadow-md p-6 gap-3 w-full">
            <MdCancel className="text-[60px] text-primary-950" />
            <div>
              <p className="font-semibold text-primary-950 text-sm flex items-center gap-2">
                Join Xenra Community <span>↗</span>
              </p>
              <p className="text-xs text-silver-900 mt-2">
                Access support, share insights and stay in the know
                effortlessly.
              </p>
            </div>
          </div>
        </div>

        {/* RIGHT */}
        <div className="bg-white rounded-md shadow-lg md:p-14 xs:p-8 w-full">
          <div className="text-center mb-10">
            <h2 className="text-2xl text-primary-950 font-semibold mb-2">
              Login to Your account
            </h2>
            <p className="text-silver-700">
              Please enter your email address and password to access your
              account.
            </p>
          </div>

          <form className="space-y-4" onSubmit={handleSubmit}>
            <Input
              ref={identifierRef}
              name="identifier"
              type="text"
              placeholder="Email "
              value={formData.identifier}
              onChange={handleChange}
            />

            <Input
              ref={passwordRef}
              name="password"
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              rightIcon={
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <FiEyeOff size={18} /> : <FiEye size={18} />}
                </button>
              }
            />

            <div className="text-right text-sm text-[#0b0196] cursor-pointer">
              Forgot Password?
            </div>

            <Button
              type="submit"
              disabled={loading}
              className={`bg-primary-950 hover:bg-primary-900 text-white flex w-full rounded-lg items-center justify-center gap-2 ${
                loading ? "opacity-70 cursor-not-allowed" : ""
              }`}
            >
              {loading ? (
                <>
                  <span className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                  Logging in...
                </>
              ) : (
                "Log In"
              )}
            </Button>
          </form>

          <div className="text-center mt-4">
            <p className="text-sm text-gray-500 mb-6">
              Don’t have an account?{" "}
              <Link
                href="/auth/register"
                className="text-[#0b0196] font-medium hover:underline"
              >
                Sign Up
              </Link>
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
