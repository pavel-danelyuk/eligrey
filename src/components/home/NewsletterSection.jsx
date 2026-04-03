import NewsletterForm from "@/components/forms/NewsletterForm";

export default function NewsletterSection() {
  return (
    <section className="border-t bg-gray-50">
      <div className="mx-auto max-w-4xl px-4 py-16 text-center">
        <div className="space-y-4">
          <p className="text-sm uppercase tracking-[0.2em] text-gray-500">
            Stay Updated
          </p>

          <h2 className="text-2xl font-bold md:text-3xl">
            Get notified about new paintings and collections
          </h2>

          <p className="mx-auto max-w-xl text-gray-600">
            Be the first to discover new artwork releases, special pieces, and
            commission availability.
          </p>
        </div>

        <NewsletterForm />

        <p className="mt-4 text-xs text-gray-500">
          No spam. Only updates about new artwork.
        </p>
      </div>
    </section>
  );
}