export default function CartSummary() {
  return (
    <div className="space-y-4 rounded-xl border p-6">
      <h2 className="text-xl font-bold">Order Summary</h2>
      <div className="flex justify-between text-sm text-gray-700">
        <span>Subtotal</span>
        <span>$210</span>
      </div>
      <div className="flex justify-between text-sm text-gray-700">
        <span>Shipping</span>
        <span>Calculated at checkout</span>
      </div>
      <button
        type="button"
        className="w-full rounded-md bg-black px-5 py-3 text-sm font-medium text-white"
      >
        Proceed to Checkout
      </button>
    </div>
  );
}