import Auth from "@/components/fragments/Auth";
import { getServerSession } from "next-auth";
import { authOption } from "../api/auth/[...nextauth]/route";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  let session = await getServerSession(authOption);

  return <Auth session={session}>{children}</Auth>;
}
