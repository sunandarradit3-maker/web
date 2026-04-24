import Link from "next/link";
import { requireAdmin } from "@/lib/auth";
import { Button } from "@/components/ui/button";

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  await requireAdmin();
  return (
    <div className="min-h-screen">
      <div className="border-b border-white/10 bg-black/20 backdrop-blur">
        <div className="container-page flex items-center justify-between py-4">
          <Link href="/admin" className="font-semibold tracking-wide">DiTz Admin</Link>
          <div className="flex items-center gap-2">
            <Button asChild variant="ghost" className="border border-white/10 bg-white/5">
              <Link href="/admin/products">products</Link>
            </Button>
            <Button asChild variant="ghost" className="border border-white/10 bg-white/5">
              <Link href="/admin/orders">orders</Link>
            </Button>
            <Button asChild variant="ghost" className="border border-white/10 bg-white/5">
              <Link href="/admin/settings">settings</Link>
            </Button>
          </div>
        </div>
      </div>
      <div>{children}</div>
    </div>
  );
}
