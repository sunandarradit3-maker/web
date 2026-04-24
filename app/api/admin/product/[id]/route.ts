import { NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase/admin";
import { requireAdmin } from "@/lib/auth";

export async function PUT(request: Request, { params }: { params: Promise<{ id: string }> }) {
  await requireAdmin();
  const { id } = await params;
  const formData = await request.formData();
  const supabase = createAdminClient();

  const payload = {
    title: String(formData.get("title") || ""),
    slug: String(formData.get("slug") || ""),
    category: String(formData.get("category") || ""),
    price: Number(formData.get("price") || 0),
    stock: Number(formData.get("stock") || 0),
    status: String(formData.get("status") || "ready"),
    description: String(formData.get("description") || "")
  };

  const file = formData.get("image") as File | null;
  if (file && file.size > 0) {
    const ext = file.name.split(".").pop() || "jpg";
    const path = `${Date.now()}-${payload.slug}.${ext}`;
    const { error: uploadError } = await supabase.storage.from("product-images").upload(path, file, { upsert: true, contentType: file.type || "image/jpeg" });
    if (uploadError) return NextResponse.json({ error: uploadError.message }, { status: 500 });
    const { data } = supabase.storage.from("product-images").getPublicUrl(path);
    (payload as any).image_url = data.publicUrl;
  }

  const { error } = await supabase.from("products").update(payload).eq("id", id);
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ ok: true });
}

export async function DELETE(_request: Request, { params }: { params: Promise<{ id: string }> }) {
  await requireAdmin();
  const { id } = await params;
  const supabase = createAdminClient();
  const { error } = await supabase.from("products").delete().eq("id", id);
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ ok: true });
}
