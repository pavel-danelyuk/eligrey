"use client";

import { useEffect, useState } from "react";
import Button from "@/components/ui/Button";

export default function ContactForm({
  artworkSlug = "",
  artworkTitle = "",
}) {
  const initialMessage = artworkTitle
    ? `Hello, I'm interested in "${artworkTitle}". I would like to know more about its availability and details.`
    : "";

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: initialMessage,
    company: "", // honeypot
  });

  const [submitted, setSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (artworkTitle) {
      setFormData((prev) => ({
        ...prev,
        message: `Hello, I'm interested in "${artworkTitle}". I would like to know more about its availability and details.`,
      }));
    }
  }, [artworkTitle]);

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

    if (!formData.message.trim()) {
      newErrors.message = "Message is required.";
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

      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          artworkSlug,
          artworkTitle,
        }),
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
        message: artworkTitle
          ? `Hello, I'm interested in "${artworkTitle}". I would like to know more about its availability and details.`
          : "",
        company: "",
      });
      setErrors({});
    } catch {
      setSubmitError("Unable to send the message. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <div className="rounded-2xl border border-green-200 bg-green-50 p-6">
        <h2 className="text-xl font-semibold text-green-900">
          Inquiry sent
        </h2>

        <p className="mt-2 text-sm leading-6 text-green-800">
          Thank you for your message. Your inquiry has been sent successfully.
        </p>

        {artworkTitle && (
          <p className="mt-2 text-sm leading-6 text-green-800">
            We’ve received your interest in{" "}
            <span className="font-medium">{artworkTitle}</span>.
          </p>
        )}

        <p className="mt-2 text-sm leading-6 text-green-800">
          You’ll receive a reply by email as soon as possible.
        </p>

        <Button
          type="button"
          variant="secondary"
          onClick={() => {
            setSubmitted(false);
            setSubmitError("");
          }}
          className="mt-5"
        >
          Send another message
        </Button>
      </div>
    );
  }

  return (
    <div>
      {artworkTitle && (
        <div className="mb-4 rounded-xl border border-black/10 bg-gray-50 p-4 text-sm text-gray-700">
          Inquiry about:{" "}
          <span className="font-medium text-black">{artworkTitle}</span>
        </div>
      )}

      {submitError && (
        <div className="mb-4 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">
          {submitError}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-5">
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
          <label className="mb-1 block text-sm font-medium">Message</label>
          <textarea
            rows="6"
            name="message"
            placeholder="Your message"
            value={formData.message}
            onChange={handleChange}
            className={`w-full rounded-md bg-white px-3 py-2 transition outline-none focus:ring-2 focus:ring-black/20 ${
              errors.message
                ? "border border-red-500"
                : "border border-gray-300"
            }`}
          />
          {errors.message && (
            <p className="mt-1 text-sm text-red-600">{errors.message}</p>
          )}
        </div>

        <div className="space-y-3 pt-2">
          <Button
            type="submit"
            variant="primary"
            disabled={isSubmitting}
            className={`w-full ${
              isSubmitting
                ? "cursor-not-allowed opacity-60 hover:translate-y-0 hover:shadow-none hover:bg-black hover:text-white"
                : ""
            }`}
          >
            {isSubmitting ? "Sending..." : "Send Inquiry"}
          </Button>

          <p className="text-xs leading-5 text-gray-500">
            You'll receive a reply by email as soon as possible.
          </p>
        </div>
      </form>
    </div>
  );
}