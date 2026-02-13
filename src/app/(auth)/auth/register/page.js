"use client";

import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import Input from "../../../../components/ui/inputField";
import Button from "../../../../components/ui/button";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { MdCancel } from "react-icons/md";
import { useRegister } from "../../../../hooks/useRegister";
import useToast from "../../../../hooks/useToast";

export default function RegisterPage() {
  const { register, loading, error, success } = useRegister();
  const toast = useToast();

  const nameRef = useRef(null);
  const usernameRef = useRef(null);
  const emailRef = useRef(null);
  const phoneRef = useRef(null);
  const passwordRef = useRef(null);
  const confirmPasswordRef = useRef(null);

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    username: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });

  useEffect(() => {
    if (error) {
      toast.error(error);
    }
  }, [error]);

  useEffect(() => {
    if (success) {
      toast.success("Account created successfully");

      setFormData({
        name: "",
        username: "",
        email: "",
        phone: "",
        password: "",
        confirmPassword: "",
      });

      setShowPassword(false);
      setShowConfirmPassword(false);
    }
  }, [success]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name.trim()) {
      nameRef.current?.focus();
      toast.warning("Full name is required");
      return;
    }

    if (!formData.username.trim()) {
      usernameRef.current?.focus();
      toast.warning("Username is required");
      return;
    }

    if (!formData.email.trim()) {
      emailRef.current?.focus();
      toast.warning("Email is required");
      return;
    }

    if (!formData.phone.trim()) {
      phoneRef.current?.focus();
      toast.warning("Phone number is required");
      return;
    }

    if (!formData.password.trim()) {
      passwordRef.current?.focus();
      toast.warning("Password is required");
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      confirmPasswordRef.current?.focus();
      toast.warning("Passwords do not match");
      return;
    }

    await register({
      full_name: formData.name,
      email: formData.email,
      password: formData.password,
      username: formData.username,
      phone_number: formData.phone,
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
              Join Xenra
            </h1>
            <p className="text-silver-700 font-semibold w-4/5">
              Create an account to access powerful tools, insights, and seamless
              global transactions.
            </p>
          </div>

          <div className="mt-10 flex items-center justify-center bg-white rounded-2xl shadow-md p-6 gap-3 w-100">
            <MdCancel className="text-[60px] text-primary-950" />
            <div>
              <p className="font-semibold text-primary-950 text-sm flex items-center gap-2">
                Join Xenra Community <span>↗</span>
              </p>
              <p className="text-xs text-silver-900 mt-2">
                Access support, share insights, and stay connected effortlessly.
              </p>
            </div>
          </div>
        </div>

        {/* RIGHT */}
        <div className="bg-white rounded-md shadow-lg md:p-9 xs:p-7 w-full">
          <div className="text-center mb-10">
            <h2 className="text-2xl text-primary-950 font-semibold mb-2">
              Create Your Account
            </h2>
            <p className="text-silver-700">
              Please fill in the details below to register on Xenra.
            </p>
          </div>

          <form className="space-y-4" onSubmit={handleSubmit}>
            <Input
              ref={nameRef}
              name="name"
              type="text"
              placeholder="Full Name"
              value={formData.name}
              onChange={handleChange}
            />

            <Input
              ref={usernameRef}
              name="username"
              type="text"
              placeholder="Username"
              value={formData.username}
              onChange={handleChange}
            />

            <Input
              ref={emailRef}
              name="email"
              type="email"
              placeholder="Email Address"
              value={formData.email}
              onChange={handleChange}
            />

            <Input
              ref={phoneRef}
              name="phone"
              type="tel"
              placeholder="Phone Number"
              value={formData.phone}
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

            <Input
              ref={confirmPasswordRef}
              name="confirmPassword"
              type={showConfirmPassword ? "text" : "password"}
              placeholder="Confirm Password"
              value={formData.confirmPassword}
              onChange={handleChange}
              rightIcon={
                <button
                  type="button"
                  onClick={() =>
                    setShowConfirmPassword(!showConfirmPassword)
                  }
                >
                  {showConfirmPassword ? (
                    <FiEyeOff size={18} />
                  ) : (
                    <FiEye size={18} />
                  )}
                </button>
              }
            />

            <Button
              type="submit"
              disabled={loading}
              className={`bg-primary-950 hover:bg-primary-900 text-white flex items-center justify-center gap-2 ${
                loading ? "opacity-70 cursor-not-allowed" : ""
              }`}
            >
              {loading ? (
                <>
                  <span className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                  Creating account...
                </>
              ) : (
                "Create Account"
              )}
            </Button>
          </form>

          <div className="text-center mt-4">
            <p className="text-sm text-gray-500 mb-6">
              Already have an account?{" "}
              <Link
                href="/auth/login"
                className="text-[#0b0196] font-medium hover:underline"
              >
                Log In
              </Link>
            </p>
          </div>

        </div>
      </div>
    </main>
  );
}
