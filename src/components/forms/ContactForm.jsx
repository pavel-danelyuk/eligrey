export default function ContactForm() {
  return (
    <form className="space-y-4 rounded-xl border p-6">
      <div>
        <label className="mb-1 block text-sm font-medium">Name</label>
        <input
          type="text"
          placeholder="Your name"
          className="w-full rounded-md border px-3 py-2 outline-none"
        />
      </div>

      <div>
        <label className="mb-1 block text-sm font-medium">Email</label>
        <input
          type="email"
          placeholder="Your email"
          className="w-full rounded-md border px-3 py-2 outline-none"
        />
      </div>

      <div>
        <label className="mb-1 block text-sm font-medium">Message</label>
        <textarea
          rows="6"
          placeholder="Message"
          className="w-full rounded-md border px-3 py-2 outline-none"
        />
      </div>

      <button
        type="button"
        className="rounded-md bg-black px-5 py-3 text-sm font-medium text-white"
      >
        Send
      </button>
    </form>
  );
}