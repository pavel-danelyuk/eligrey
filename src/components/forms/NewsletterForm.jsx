"use client";

import { useState } from "react";

export default function NewsletterForm() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState({});

  const validate = () => {
    const newErrors = {};

    if (!email.trim()) {
      newErrors.email = "Email is required.";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = "Enter a valid email address.";
    }

    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const newErrors = validate();
    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) return;

    setIsSubmitting(true);

    setTimeout(() => {
      setSubmitted(true);
      setIsSubmitting(false);
      setEmail("");

      setTimeout(() => {
        setSubmitted(false);
      }, 2500);
    }, 800);
  };

  return (
    <div>
      <form
        onSubmit={handleSubmit}
        className="mx-auto mt-8 flex max-w-md flex-col gap-3 sm:flex-row"
      >
        <div className="flex-1">
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              setErrors((prev) => ({ ...prev, email: "" }));
            }}
            className={`w-full rounded-md border bg-white px-4 py-3 text-sm transition outline-none focus:ring-2 focus:ring-black/20 ${
              errors.email ? "border-red-500" : "border-gray-300"
            }`}
          />

          {errors.email && (
            <p className="mt-2 text-left text-sm text-red-600">
              {errors.email}
            </p>
          )}
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className={`rounded-md px-6 py-3 text-sm font-medium text-white transition ${
            isSubmitting
              ? "cursor-not-allowed bg-gray-400"
              : "cursor-pointer bg-black hover:opacity-90"
          }`}
        >
          {isSubmitting ? "Submitting..." : "Subscribe"}
        </button>
      </form>

      {submitted && (
        <p className="mt-4 text-sm text-green-700">
          Thanks for subscribing.
        </p>
      )}
    </div>
  );
}