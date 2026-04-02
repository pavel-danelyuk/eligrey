import PageContainer from "@/components/layout/PageContainer";
import CommissionForm from "@/components/forms/CommissionForm";

export default function CommissionsPage() {
  return (
    <PageContainer>
      <div className="grid gap-10 md:grid-cols-2">
        <div className="space-y-5">
          <h1 className="text-3xl font-bold">Commissions</h1>
          <p className="text-gray-700">
            Request a custom painting inspired by a place, mood, or idea that
            matters to you.
          </p>
          <p className="text-gray-700">
            In this training version, the form is static, but the layout and
            structure match a real inquiry flow.
          </p>
          <div className="rounded-xl border p-4 text-sm text-gray-700">
            <p><span className="font-medium text-black">Typical process:</span></p>
            <p>1. Share your idea</p>
            <p>2. Discuss size and budget</p>
            <p>3. Confirm the final concept</p>
          </div>
        </div>

        <CommissionForm />
      </div>
    </PageContainer>
  );
}