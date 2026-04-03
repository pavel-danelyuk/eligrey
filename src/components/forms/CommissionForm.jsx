"use client";

import { useState } from "react";

export default function CommissionForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    preferredSize: "",
    budget: "",
    projectIdea: "",
  });

  const [submitted, setSubmitted] = useState(false);
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

      setFormData({
        name: "",
        email: "",
        preferredSize: "",
        budget: "",
        projectIdea: "",
      });

      setTimeout(() => {
        setSubmitted(false);
      }, 2500);
    }, 800);
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className="space-y-4 rounded-xl border p-6">
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

        <div>
          <label className="mb-1 block text-sm font-medium">Preferred Size</label>
          <input
            type="text"
            name="preferredSize"
            placeholder="Example: 16x20 inches"
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
            placeholder="Example: $150 - $300"
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

        <button
          type="submit"
          disabled={isSubmitting}
          className={`rounded-md px-5 py-3 text-sm font-medium text-white transition ${
            isSubmitting
              ? "cursor-not-allowed bg-gray-400"
              : "cursor-pointer bg-black hover:opacity-90"
          }`}
        >
          {isSubmitting ? "Submitting..." : "Submit Request"}
        </button>
      </form>

      {submitted && (
        <p className="mt-4 text-sm text-green-700">
          Your commission request has been submitted.
        </p>
      )}
    </div>
  );
}