import PageContainer from "@/components/layout/PageContainer";
import CartItem from "@/components/cart/CartItem";
import CartSummary from "@/components/cart/CartSummary";
import { artworks } from "@/data/artworks";

export default function CartPage() {
  return (
    <PageContainer>
      <h1 className="mb-8 text-3xl font-bold">Cart</h1>

      <div className="grid gap-8 lg:grid-cols-[2fr_1fr]">
        <div className="space-y-4">
          <CartItem
            title={artworks[0].title}
            price={artworks[0].price}
            image={artworks[0].image}
            quantity={1}
          />
          <CartItem
            title={artworks[1].title}
            price={artworks[1].price}
            image={artworks[1].image}
            quantity={1}
          />
        </div>

        <CartSummary />
      </div>
    </PageContainer>
  );
}