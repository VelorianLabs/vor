import Link from "next/link";
import { Button } from "@/components/ui/Button";

export default function NotFound() {
  return (
    <div className="max-w-lg mx-auto px-4 py-24 text-center">
      <p className="text-vor-gold font-semibold text-sm uppercase tracking-wider">ERROR 404</p>
      <h1 className="mt-2 font-display text-3xl font-semibold text-vor-navy">Page not found</h1>
      <p className="mt-4 text-vor-slate">
        The page you are looking for does not exist or has been moved.
      </p>
      <Button href="/" variant="primary" className="mt-8">
        Return home
      </Button>
    </div>
  );
}
