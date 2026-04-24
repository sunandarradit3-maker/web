import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="container-page flex min-h-[70vh] flex-col items-center justify-center text-center">
      <h1 className="font-display text-5xl font-semibold text-gradient">404</h1>
      <p className="mt-3 text-white/60">halaman tidak ditemukan.</p>
      <Button asChild className="mt-6">
        <Link href="/">kembali ke home</Link>
      </Button>
    </div>
  );
}
