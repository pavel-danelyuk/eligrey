"use client";

import { useState } from "react";

export default function CommissionForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    preferredSize: "",
    budget: "",
    projectIdea: "",
  });

  const [submitted, setSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState({});

  const validate = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "Name is required.";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required.";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Enter a valid email address.";
    }

    if (!formData.preferredSize.trim()) {
      newErrors.preferredSize = "Preferred size is required.";
    }

    if (!formData.budget.trim()) {
      newErrors.budget = "Budget is required.";
    }

    if (!formData.projectIdea.trim()) {
      newErrors.projectIdea = "Project idea is required.";
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

      const response = await fetch("/api/commissions", {
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
        name: "",
        email: "",
        preferredSize: "",
        budget: "",
        projectIdea: "",
      });

      setErrors({});
    } catch (error) {
      setSubmitError("Unable to submit the form. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <div className="rounded-2xl border border-green-200 bg-green-50 p-6">
        <h2 className="text-xl font-semibold text-green-900">
          Request received
        </h2>
        <p className="mt-2 text-sm leading-6 text-green-800">
          Thank you for your interest in a commissioned piece. Your request has
          been submitted successfully.
        </p>
        <p className="mt-2 text-sm leading-6 text-green-800">
          You’ll be contacted by email after your request is reviewed.
        </p>

        <button
          type="button"
          onClick={() => {
            setSubmitted(false);
            setSubmitError("");
          }}
          className="mt-5 rounded-md border border-green-900 px-4 py-2 text-sm font-medium text-green-900 transition hover:bg-green-100"
        >
          Submit another request
        </button>
      </div>
    );
  }

  return (
    <div>
      {submitError && (
        <div className="mb-4 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">
          {submitError}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label className="mb-1 block text-sm font-medium">Name</label>
          <input
            type="text"
            name="name"
            placeholder="Your name"
            value={formData.name}
            onChange={handleChange}
            className={`w-full rounded-md bg-white px-3 py-2 transition outline-none focus:ring-2 focus:ring-black/20 ${
              errors.name ? "border border-red-500" : "border border-gray-300"
            }`}
          />
          {errors.name && (
            <p className="mt-1 text-sm text-red-600">{errors.name}</p>
          )}
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium">Email</label>
          <input
            type="email"
            name="email"
            placeholder="Your email"
            value={formData.email}
            onChange={handleChange}
            className={`w-full rounded-md bg-white px-3 py-2 transition outline-none focus:ring-2 focus:ring-black/20 ${
              errors.email ? "border border-red-500" : "border border-gray-300"
            }`}
          />
          {errors.email && (
            <p className="mt-1 text-sm text-red-600">{errors.email}</p>
          )}
        </div>

        <div className="absolute left-[-9999px]">
          <label>Company</label>
          <input
            type="text"
            name="company"
            value={formData.company}
            onChange={handleChange}
            autoComplete="off"
          />
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium">Preferred Size</label>
          <input
            type="text"
            name="preferredSize"
            placeholder="Example: 30x30 inches"
            value={formData.preferredSize}
            onChange={handleChange}
            className={`w-full rounded-md bg-white px-3 py-2 transition outline-none focus:ring-2 focus:ring-black/20 ${
              errors.preferredSize
                ? "border border-red-500"
                : "border border-gray-300"
            }`}
          />
          {errors.preferredSize && (
            <p className="mt-1 text-sm text-red-600">
              {errors.preferredSize}
            </p>
          )}
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium">Budget</label>
          <input
            type="text"
            name="budget"
            placeholder="Example: $1500 - $3000"
            value={formData.budget}
            onChange={handleChange}
            className={`w-full rounded-md bg-white px-3 py-2 transition outline-none focus:ring-2 focus:ring-black/20 ${
              errors.budget
                ? "border border-red-500"
                : "border border-gray-300"
            }`}
          />
          {errors.budget && (
            <p className="mt-1 text-sm text-red-600">{errors.budget}</p>
          )}
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium">Project Idea</label>
          <textarea
            rows="6"
            name="projectIdea"
            placeholder="Describe your idea"
            value={formData.projectIdea}
            onChange={handleChange}
            className={`w-full rounded-md bg-white px-3 py-2 transition outline-none focus:ring-2 focus:ring-black/20 ${
              errors.projectIdea
                ? "border border-red-500"
                : "border border-gray-300"
            }`}
          />
          {errors.projectIdea && (
            <p className="mt-1 text-sm text-red-600">
              {errors.projectIdea}
            </p>
          )}
        </div>

        <div className="space-y-3 pt-2">
          <button
            type="submit"
            disabled={isSubmitting}
            className={`w-full rounded-md px-5 py-3 text-sm font-medium text-white transition ${
              isSubmitting
                ? "cursor-not-allowed bg-gray-400"
                : "cursor-pointer bg-black hover:opacity-90"
            }`}
          >
            {isSubmitting ? "Sending request..." : "Submit Request"}
          </button>

          <p className="text-xs leading-5 text-gray-500">
            You’ll be contacted by email after your request is reviewed.
          </p>
        </div>
      </form>
    </div>
  );
}