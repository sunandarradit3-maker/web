
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { createClient } from "@/lib/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";

export default function AdminLoginPage() {
  const router = useRouter();
  const supabase = createClient();
  const [loading, setLoading] = useState(false);

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);

    const formData = new FormData(event.currentTarget);
    const email = String(formData.get("email") || "");
    const password = String(formData.get("password") || "");
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    setLoading(false);

    if (error) {
      toast.error(error.message);
      return;
    }

    toast.success("login berhasil");
    router.push("/admin");
    router.refresh();
  }

  return (
    <div className="container-page flex min-h-[80vh] items-center justify-center py-12">
      <Card className="glass w-full max-w-md p-6">
        <h1 className="font-display text-3xl font-semibold text-gradient">admin login</h1>
        <form onSubmit={onSubmit} className="mt-6 space-y-4">
          <Input name="email" type="email" placeholder="admin email" required />
          <Input name="password" type="password" placeholder="password" required />
          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? "memproses..." : "masuk"}
          </Button>
        </form>
      </Card>
    </div>
  );
}
