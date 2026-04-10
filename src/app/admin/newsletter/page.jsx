import PageContainer from "@/components/layout/PageContainer";
import { createSupabaseServerClient } from "@/lib/supabase/server";

export default async function AdminNewsletterPage() {
  const supabase = createSupabaseServerClient();

  const { data: subscribers, error } = await supabase
    .from("newsletter_subscribers")
    .select("*")
    .order("created_at", { ascending: false });

  return (
    <PageContainer>
      <div className="space-y-8">
        <div className="space-y-2">
          <h1 className="text-4xl md:text-5xl font-semibold leading-[1.05] tracking-tight">Newsletter Subscribers</h1>
          <p className="text-gray-600">
            View newsletter signups from the website.
          </p>
        </div>

        {error && (
          <div className="rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">
            Failed to load subscribers.
          </div>
        )}

        {!error && (!subscribers || subscribers.length === 0) && (
          <div className="rounded-xl border border-black/10 bg-white p-6 text-sm text-gray-600">
            No subscribers yet.
          </div>
        )}

        {!error && subscribers && subscribers.length > 0 && (
          <div className="overflow-hidden rounded-2xl border border-black/10 bg-white shadow-sm">
            <div className="overflow-x-auto">
              <table className="min-w-full text-left text-sm">
                <thead className="border-b border-black/10 bg-black/[0.03]">
                  <tr>
                    <th className="px-5 py-4 font-medium text-black">Email</th>
                    <th className="px-5 py-4 font-medium text-black">
                      Subscribed At
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {subscribers.map((subscriber) => (
                    <tr
                      key={subscriber.id}
                      className="border-b border-black/5 last:border-b-0"
                    >
                      <td className="px-5 py-4 text-gray-800">
                        {subscriber.email}
                      </td>
                      <td className="px-5 py-4 text-gray-600">
                        {new Date(subscriber.created_at).toLocaleString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </PageContainer>
  );
}