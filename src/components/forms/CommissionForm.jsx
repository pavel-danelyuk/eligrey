export default function CommissionForm() {
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
        <label className="mb-1 block text-sm font-medium">Preferred Size</label>
        <input
          type="text"
          placeholder='Example: 16x20 inches'
          className="w-full rounded-md border px-3 py-2 outline-none"
        />
      </div>

      <div>
        <label className="mb-1 block text-sm font-medium">Budget</label>
        <input
          type="text"
          placeholder="Example: $150 - $300"
          className="w-full rounded-md border px-3 py-2 outline-none"
        />
      </div>

      <div>
        <label className="mb-1 block text-sm font-medium">Project Idea</label>
        <textarea
          rows="6"
          placeholder="Describe your idea"
          className="w-full rounded-md border px-3 py-2 outline-none"
        />
      </div>

      <button
        type="button"
        className="rounded-md bg-black px-5 py-3 text-sm font-medium text-white"
      >
        Submit Request
      </button>
    </form>
  );
}