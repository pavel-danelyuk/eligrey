import PageContainer from "@/components/layout/PageContainer";
import ContactForm from "@/components/forms/ContactForm";

export default function ContactPage() {
  return (
    <PageContainer>
      <div className="grid gap-10 md:grid-cols-2">
        <div className="space-y-4">
          <h1 className="text-4xl md:text-5xl font-normal leading-[1.05] tracking-tight">Contact</h1>
          <p className="text-gray-700">
            For questions about artwork, shipping, or availability, use the
            form or contact the gallery directly.
          </p>
          <p className="text-gray-700">
            Email: 
              <a
                href="mailto:eligreygallery@gmail.com"
                className="underline"
              >
                eligreygallery@gmail.com
              </a>{" "}
          </p>
        </div>

        <div className="rounded-2xl border border-black/5 bg-white p-6 shadow-sm">
          <ContactForm />
        </div>
      </div>
    </PageContainer>
  );
}