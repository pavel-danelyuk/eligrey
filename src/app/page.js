import FeaturedArtworks from "@/components/home/FeaturedArtworks";
import PageContainer from "@/components/layout/PageContainer";

export default function Home() {
  return (
    <div>
      <PageContainer>
        <section className="py-8">
          <h1 className="mb-4 text-4xl font-bold">Eligrey Gallery Clone</h1>
          <p className="text-lg text-gray-600">
            Original paintings and commissions
          </p>
        </section>
      </PageContainer>

      <FeaturedArtworks />
    </div>
  );
}