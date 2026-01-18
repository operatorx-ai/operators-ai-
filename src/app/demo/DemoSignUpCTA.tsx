import Link from "next/link";
import { Button } from "@/components/ui/button";

export function DemoSignUpCTA() {
  return (
    <div className="mt-6 text-center">
      <p className="mb-2 text-sm text-muted-foreground">Like what you see?</p>
      <Link href="/sign-up">
        <Button size="lg" className="w-full md:w-auto">Sign up to get started</Button>
      </Link>
    </div>
  );
}
