import PageContainer from "@/components/layout/PageContainer";
import ContactForm from "@/components/forms/ContactForm";

export default function ContactPage() {
  return (
    <PageContainer>
      <div className="grid gap-10 md:grid-cols-2">
        <div className="space-y-4">
          <h1 className="text-3xl font-bold">Contact</h1>
          <p className="text-gray-700">
            For questions about artwork, shipping, or availability, use the
            form or contact the gallery directly.
          </p>
          <p className="text-gray-700">
            Email: eligreygallery@gmail.com
          </p>
        </div>

        <ContactForm />
      </div>
    </PageContainer>
  );
}