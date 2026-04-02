export default function ProductDetails({
  title,
  price,
  image,
  status,
  description,
  size,
  medium,
}) {
  return (
    <div className="grid gap-10 md:grid-cols-2">
      <div className="overflow-hidden rounded-xl border bg-gray-100">
        <div className="aspect-square w-full">
          <img
            src={image}
            alt={title}
            className="h-full w-full object-cover"
          />
        </div>
      </div>

      <div className="flex flex-col justify-center space-y-5">
        <div>
          <h1 className="text-3xl font-bold">{title}</h1>
          <p className="mt-2 text-xl text-gray-700">${price}</p>
        </div>

        <p className="text-sm">
          {status === "sold" ? (
            <span className="font-medium text-red-600">Sold</span>
          ) : (
            <span className="font-medium text-green-700">Available</span>
          )}
        </p>

        <p className="text-gray-700">{description}</p>

        <div className="space-y-2 text-sm text-gray-600">
          <p><span className="font-medium text-black">Size:</span> {size}</p>
          <p><span className="font-medium text-black">Medium:</span> {medium}</p>
        </div>

        <div className="flex gap-3">
          <button className="rounded-md bg-black px-5 py-3 text-sm font-medium text-white">
            Add to Cart
          </button>
          <button className="rounded-md border px-5 py-3 text-sm font-medium">
            Buy Now
          </button>
        </div>
      </div>
    </div>
  );
}