/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable react/prop-types */
import React, { useState } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Link } from "react-router-dom";

export function SignupForm({ className, ...props }) {
  const [step, setStep] = useState(1); // 1: signup, 2: otp
  const [form, setForm] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    otp: "",
  });
  const [message, setMessage] = useState("");
  const [emailForOtp, setEmailForOtp] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Step 1: Register and send OTP
  const handleSignup = async (e) => {
    e.preventDefault();
    setMessage("");
    const res = await fetch("/api/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: form.email,
        password: form.password,
        confirmPassword: form.confirmPassword,
      }),
    });
    const data = await res.json();
    if (res.ok) {
      setStep(2);
      setEmailForOtp(form.email);
      setMessage("OTP sent to your email.");
    } else {
      setMessage(data.message || "Signup failed.");
    }
  };

  // Step 2: Verify OTP
  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    setMessage("");
    const res = await fetch("/api/auth/verify-otp", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: emailForOtp, otp: form.otp }),
    });
    const data = await res.json();
    if (res.ok) {
      setMessage("Account verified! You can now log in.");
      setStep(3);
    } else {
      setMessage(data.message || "OTP verification failed.");
    }
  };

  // UI
  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      {step === 1 && (
        <form onSubmit={handleSignup} className="flex flex-col gap-6">
          <div className="flex flex-col items-center gap-2 text-center">
            <h1 className="text-2xl font-bold">Sign up for an account</h1>
            <p className="text-muted-foreground text-sm text-balance">
              Enter your details below to create your account
            </p>
          </div>
          <div className="grid gap-3">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              name="email"
              type="email"
              placeholder="m@example.com"
              value={form.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="grid gap-3">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              name="password"
              type="password"
              value={form.password}
              onChange={handleChange}
              required
            />
          </div>
          <div className="grid gap-3">
            <Label htmlFor="confirmPassword">Confirm Password</Label>
            <Input
              id="confirmPassword"
              name="confirmPassword"
              type="password"
              value={form.confirmPassword}
              onChange={handleChange}
              required
            />
          </div>
          <Button type="submit" className="w-full">
            Sign up
          </Button>
          <div className="text-center text-sm">
            Already have an account?{" "}
            <Link to="/" className="underline underline-offset-4">
              Login
            </Link>
          </div>
          {message && <div className="text-red-500 text-center">{message}</div>}
        </form>
      )}

      {step === 2 && (
        <form onSubmit={handleVerifyOtp} className="flex flex-col gap-6">
          <div className="flex flex-col items-center gap-2 text-center">
            <h1 className="text-2xl font-bold">Verify OTP</h1>
            <p className="text-muted-foreground text-sm text-balance">
              Enter the OTP sent to your email
            </p>
          </div>
          <div className="grid gap-3">
            <Label htmlFor="otp">OTP</Label>
            <Input
              id="otp"
              name="otp"
              type="text"
              value={form.otp}
              onChange={handleChange}
              required
            />
          </div>
          <Button type="submit" className="w-full">
            Verify OTP
          </Button>
          {message && <div className="text-red-500 text-center">{message}</div>}
        </form>
      )}

      {step === 3 && (
        <div className="flex flex-col items-center gap-2 text-center">
          <h1 className="text-2xl font-bold text-green-700">
            Account Verified!
          </h1>
          <p>
            You can now{" "}
            <Link to="/" className="underline underline-offset-4">
              log in
            </Link>
            .
          </p>
        </div>
      )}
    </div>
  );
}
