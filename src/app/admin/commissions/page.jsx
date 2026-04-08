import PageContainer from "@/components/layout/PageContainer";
import { createSupabaseServerClient } from "@/lib/supabase/server";

export default async function AdminCommissionsPage() {
  const supabase = createSupabaseServerClient();

  const { data: submissions, error } = await supabase
    .from("commission_requests")
    .select("*")
    .order("created_at", { ascending: false });

  return (
    <PageContainer>
      <div className="space-y-8">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold">Commission Submissions</h1>
          <p className="text-gray-600">
            View incoming commission requests from the website.
          </p>
        </div>

        {error && (
          <div className="rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">
            Failed to load submissions.
          </div>
        )}

        {!error && (!submissions || submissions.length === 0) && (
          <div className="rounded-xl border border-black/10 bg-white p-6 text-sm text-gray-600">
            No commission requests yet.
          </div>
        )}

        {!error && submissions && submissions.length > 0 && (
          <div className="grid gap-4">
            {submissions.map((submission) => (
              <article
                key={submission.id}
                className="rounded-2xl border border-black/10 bg-white p-6 shadow-sm"
              >
                <div className="mb-4 flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
                  <div>
                    <h2 className="text-xl font-semibold text-black">
                      {submission.name}
                    </h2>
                    <p className="text-sm text-gray-600">{submission.email}</p>
                  </div>

                  <p className="text-sm text-gray-500">
                    {new Date(submission.created_at).toLocaleString()}
                  </p>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <p className="text-xs uppercase tracking-[0.16em] text-gray-500">
                      Preferred Size
                    </p>
                    <p className="mt-1 text-sm text-black">
                      {submission.preferred_size}
                    </p>
                  </div>

                  <div>
                    <p className="text-xs uppercase tracking-[0.16em] text-gray-500">
                      Budget
                    </p>
                    <p className="mt-1 text-sm text-black">
                      {submission.budget}
                    </p>
                  </div>
                </div>

                <div className="mt-5">
                  <p className="text-xs uppercase tracking-[0.16em] text-gray-500">
                    Project Idea
                  </p>
                  <p className="mt-2 whitespace-pre-line text-sm leading-7 text-gray-700">
                    {submission.project_idea}
                  </p>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </PageContainer>
  );
}