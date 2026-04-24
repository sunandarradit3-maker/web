import { getAdminStats } from "@/lib/data";
import { Card } from "@/components/ui/card";

export const metadata = { title: "Admin Dashboard" };

export default async function AdminDashboardPage() {
  const stats = await getAdminStats();
  return (
    <div className="container-page py-10">
      <h1 className="font-display text-4xl font-semibold text-gradient">dashboard</h1>
      <div className="mt-8 grid gap-4 md:grid-cols-4">
        {stats.map((item) => (
          <Card key={item.label} className="glass p-5">
            <p className="text-sm text-white/55">{item.label}</p>
            <p className="mt-2 text-3xl font-semibold">{item.value}</p>
          </Card>
        ))}
      </div>
    </div>
  );
}
