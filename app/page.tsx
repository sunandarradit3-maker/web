import { Suspense } from "react";
import { Hero } from "@/components/hero";
import { ProductSection } from "@/components/product-section";
import { Features } from "@/components/features";
import { Testimonials } from "@/components/testimonials";
import { FaqSection } from "@/components/faq-section";
import { getHomeData } from "@/lib/data";

export const metadata = {
  title: "DiTz Store",
  description: "Premium ecommerce modern dengan katalog produk, wishlist, dan admin panel."
};

export default async function HomePage() {
  const data = await getHomeData();

  return (
    <div className="pb-20">
      <Hero promo={data.promo} />
      <Features />
      <Suspense fallback={<div className="container-page py-12 text-sm text-white/60">Memuat katalog...</div>}>
        <ProductSection products={data.products} />
      </Suspense>
      <Testimonials />
      <FaqSection />
    </div>
  );
}
