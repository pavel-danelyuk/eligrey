import Link from "next/link";

export default function ProductCard({ id, title, price, image, status }) {
  return (
    <div className="overflow-hidden rounded-l border bg-white shadow-sm">
      <div className="aspect-square w-full overflow-hidden bg-gray-100">
        <img
          src={image}
          alt={title}
          className="h-full w-full object-cover"
        />
      </div>

      <div className="space-y-3 p-4">
        <div>
          <h3 className="text-lg font-semibold">{title}</h3>
          <p className="text-sm text-gray-600">${price}</p>
        </div>

        <p className="text-sm">
          {status === "sold" ? (
            <span className="font-medium text-red-600">Sold</span>
          ) : (
            <span className="font-medium text-green-700">Available</span>
          )}
        </p>

        <Link
          href="/product"
          className="inline-block rounded-md border px-4 py-2 text-sm font-medium transition hover:bg-gray-100"
        >
          View Details
        </Link>
      </div>
    </div>
  );
}