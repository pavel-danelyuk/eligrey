import PageContainer from "@/components/layout/PageContainer";
import CommissionForm from "@/components/forms/CommissionForm";

export default function CommissionsPage() {
  return (
    <PageContainer>
      <div className="grid gap-10 md:grid-cols-2">
        {/* LEFT COLUMN */}
        <div className="space-y-6">
          <div className="aspect-[4/5] overflow-hidden rounded-2xl bg-gray-100">
            <img
              src="/images/commissions.avif"
              alt="Commission example artwork"
              className="h-full w-full object-cover"
            />
          </div>

          <h1 className="text-3xl font-bold">Commissions</h1>

          <p className="text-gray-700">
            I am currently accepting a limited number of commissions for unique
            abstract paintings. Each piece is created to resonate with your
            personal vision and environment.
          </p>

          <div className="space-y-3 text-gray-700">
            <p className="font-medium text-black">How to Commission:</p>

            <p>
              <span className="font-medium">Reach Out:</span> Contact me at{" "}
              <a
                href="mailto:eligreygallery@gmail.com"
                className="underline"
              >
                eligreygallery@gmail.com
              </a>{" "}
              to discuss your ideas and preferences.
            </p>

            <p>
              <span className="font-medium">Personal Consultation:</span>{" "}
              One-on-one discussion to explore your vision.
            </p>

            <p>
              <span className="font-medium">Creation Process:</span> Your custom
              piece comes to life, inspired by your ideas and environment.
            </p>

            <p>
              Commissions can be any size starting at 30” x 30”. Projects are
              priced by size and cost 20% more than available works.
            </p>

            <p>
              A non-refundable 50% deposit is required, with the balance plus
              shipping due upon completion.
            </p>
          </div>
        </div>

        {/* RIGHT COLUMN */}
        <div className="space-y-6">
          {/* Form Card */}
          <div className="rounded-2xl bg-white p-6 shadow-sm border border-black/5">
            <CommissionForm />
          </div>

          {/* Typical process moved here */}
          <div className="space-y-2 rounded-xl border p-4 text-sm text-gray-700 bg-white/60">
            <p>
              <span className="font-medium text-black">Typical process:</span>
            </p>
            <p>1. Share your idea</p>
            <p>2. Discuss size and budget</p>
            <p>3. Confirm the final concept</p>
          </div>
        </div>
      </div>
    </PageContainer>
  );
}