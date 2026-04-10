import PageContainer from "@/components/layout/PageContainer";

export default function AboutPage() {
  return (
    <PageContainer>
      <div className="grid gap-10 md:grid-cols-2 md:items-center">
        <div className="overflow-hidden rounded-xl border bg-gray-100">
          <div className="aspect-square w-full">
            <img
              src="/images/artist.avif"
              alt="Artist portrait"
              className="h-full w-full object-cover"
            />
          </div>
        </div>

        <div className="space-y-5">
          <h1 className="text-4xl md:text-5xl font-normal leading-[1.05] tracking-tight">About Eli Grey</h1>
          <p className="text-gray-700">
            Meet Eli Grey, Montreal based visionary abstract painter whose work captures the ephemeral beauty of nature through the changing seasons. Inspired by the gentle hues of a summer morning gaze, the ethereal mists of fall, the warm embrace of winter sunsets, and the delicate remnants of spring's fallen blooms, her paintings invite viewers to experience the world through a lens of emotion and memory. 
          </p>
          <p className="text-gray-700">
            Each brushstroke reflects her deep connection to the natural rhythms of the earth, transforming fleeting moments into vibrant, textured compositions. With a passion for exploring colour and form, Eli invites you to immerse yourself in her captivating landscapes of feeling and light.
          </p>
        </div>
      </div>
    </PageContainer>
  );
}