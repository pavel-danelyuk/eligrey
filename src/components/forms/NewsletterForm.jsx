"use client";

import { useState } from "react";

export default function NewsletterForm() {
  const [formData, setFormData] = useState({
    email: "",
    company: "", // honeypot
  });

  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [errors, setErrors] = useState({});

  const validate = () => {
    const newErrors = {};

    if (!formData.email.trim()) {
      newErrors.email = "Email is required.";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Enter a valid email address.";
    }

    return newErrors;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    setErrors((prev) => ({
      ...prev,
      [name]: "",
    }));

    setSubmitError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newErrors = validate();
    setErrors(newErrors);
    setSubmitError("");

    if (Object.keys(newErrors).length > 0) return;

    try {
      setIsSubmitting(true);

      const response = await fetch("/api/newsletter", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        setSubmitError(data.error || "Something went wrong.");
        return;
      }

      setSubmitted(true);
      setFormData({
        email: "",
        company: "",
      });
      setErrors({});
    } catch {
      setSubmitError("Unable to subscribe right now. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <div className="mx-auto mt-8 max-w-md rounded-2xl border border-green-200 bg-green-50 p-5 text-left">
        <h3 className="text-base font-semibold text-green-900">
          Subscription confirmed
        </h3>
        <p className="mt-2 text-sm leading-6 text-green-800">
          Thank you for subscribing to the newsletter.
        </p>

        <button
          type="button"
          onClick={() => {
            setSubmitted(false);
            setSubmitError("");
          }}
          className="mt-4 rounded-md border border-green-900 px-4 py-2 text-sm font-medium text-green-900 transition hover:bg-green-100"
        >
          Subscribe another email
        </button>
      </div>
    );
  }

  return (
    <div>
      {submitError && (
        <div className="mx-auto mt-6 max-w-md rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">
          {submitError}
        </div>
      )}

      <form
        onSubmit={handleSubmit}
        className="mx-auto mt-8 flex max-w-md flex-col gap-3 sm:flex-row sm:items-start"
      >
        <div className="absolute left-[-9999px] top-auto">
          <label htmlFor="company">Company</label>
          <input
            id="company"
            type="text"
            name="company"
            value={formData.company}
            onChange={handleChange}
            autoComplete="off"
            tabIndex={-1}
          />
        </div>

        <div className="flex-1">
          <input
            type="email"
            name="email"
            placeholder="Enter your email"
            value={formData.email}
            onChange={handleChange}
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
          {isSubmitting ? "Subscribing..." : "Subscribe"}
        </button>
      </form>
    </div>
  );
}