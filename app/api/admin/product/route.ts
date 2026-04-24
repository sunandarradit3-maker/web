import { NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase/admin";
import { requireAdmin } from "@/lib/auth";

export async function POST(request: Request) {
  await requireAdmin();
  const formData = await request.formData();
  const supabase = createAdminClient();

  const title = String(formData.get("title") || "");
  const slug = String(formData.get("slug") || "");
  const category = String(formData.get("category") || "");
  const price = Number(formData.get("price") || 0);
  const stock = Number(formData.get("stock") || 0);
  const status = String(formData.get("status") || "ready");
  const description = String(formData.get("description") || "");
  const file = formData.get("image") as File | null;

  if (!title || !slug || !category || !price || !description) {
    return NextResponse.json({ error: "field wajib belum lengkap" }, { status: 400 });
  }

  let image_url = "https://images.unsplash.com/photo-1491553895911-0055eca6402d?w=1200&q=80";
  if (file && file.size > 0) {
    const ext = file.name.split(".").pop() || "jpg";
    const path = `${Date.now()}-${slug}.${ext}`;
    const { error: uploadError } = await supabase.storage.from("product-images").upload(path, file, {
      upsert: true,
      contentType: file.type || "image/jpeg"
    });
    if (uploadError) return NextResponse.json({ error: uploadError.message }, { status: 500 });

    const { data } = supabase.storage.from("product-images").getPublicUrl(path);
    image_url = data.publicUrl;
  }

  const { error } = await supabase.from("products").insert({
    title,
    slug,
    category,
    price,
    stock,
    status,
    description,
    image_url
  });

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ ok: true });
}
