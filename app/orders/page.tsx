import { getOrders } from "@/lib/data";
import { Card } from "@/components/ui/card";

export const metadata = { title: "Admin Orders" };

export default async function AdminOrdersPage() {
  const orders = await getOrders();
  return (
    <div className="container-page py-10">
      <h1 className="font-display text-4xl font-semibold text-gradient">orders</h1>
      <div className="mt-8 space-y-3">
        {orders.length === 0 ? (
          <Card className="glass p-6 text-white/60">belum ada order yang tercatat.</Card>
        ) : (
          orders.map((o) => (
            <Card key={o.id} className="glass p-5">
              <div className="flex flex-col gap-1 md:flex-row md:items-center md:justify-between">
                <div>
                  <p className="font-medium">{o.product_name}</p>
                  <p className="text-sm text-white/55">{o.channel} · {o.created_at}</p>
                </div>
                <div className="text-sm text-white/60">{o.phone || o.telegram || "-"}</div>
              </div>
            </Card>
          ))
        )}
      </div>
    </div>
  );
}
