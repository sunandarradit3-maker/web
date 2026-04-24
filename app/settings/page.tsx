import { getPromoSettings } from "@/lib/data";
import { PromoSettingsForm } from "@/components/promo-settings-form";

export const metadata = { title: "Admin Settings" };

export default async function AdminSettingsPage() {
  const settings = await getPromoSettings();
  return (
    <div className="container-page py-10">
      <h1 className="font-display text-4xl font-semibold text-gradient">settings</h1>
      <div className="mt-8">
        <PromoSettingsForm settings={settings} />
      </div>
    </div>
  );
}
