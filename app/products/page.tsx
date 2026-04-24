import Link from "next/link";
import { getAdminProducts } from "@/lib/data";
import { AdminProductForm } from "@/components/admin-product-form";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

export const metadata = { title: "Admin Products" };

export default async function AdminProductsPage({
  searchParams
}: {
  searchParams: Promise<{ edit?: string }>;
}) {
  const { edit } = await searchParams;
  const { products, selected } = await getAdminProducts(edit);

  return (
    <div className="container-page py-10">
      <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
        <div>
          <h1 className="font-display text-4xl font-semibold text-gradient">products</h1>
          <p className="mt-2 text-white/60">Tambah, edit, hapus, upload gambar, dan ubah stok produk.</p>
        </div>
        <Button asChild variant="secondary"><Link href="/admin/products">reset form</Link></Button>
      </div>

      <div className="mt-8 grid gap-8 lg:grid-cols-[1.05fr_0.95fr]">
        <AdminProductForm product={selected || undefined} />
        <div className="space-y-4">
          {products.map((p) => (
            <Card key={p.id} className="glass p-4">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="font-medium">{p.title}</p>
                  <p className="text-sm text-white/55">{p.category} · {p.status} · stok {p.stock}</p>
                </div>
                <Button asChild size="sm" variant="ghost" className="border border-white/10 bg-white/5">
                  <Link href={`/admin/products?edit=${p.id}`}>edit</Link>
                </Button>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
