import { UserButton } from "@clerk/nextjs";
import { syncUserAndOrg } from "@/lib/user-sync";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export default async function AppPage() {
  const user = await currentUser();
  if (!user) redirect("/sign-in");
  await syncUserAndOrg();
  return (
    <div className="p-6 flex justify-between items-center">
      <div>Dashboard</div>
      <UserButton afterSignOutUrl="/sign-in" />
    </div>
  );
}
