import Auth from "@/components/fragments/Auth";
import { fetchAuth } from "@/services/auth";
import { UserType } from "@/types/user";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  let auth: UserType | undefined;

  try {
    auth = await fetchAuth().then((result) => result?.data);
  } catch (e) {
    console.error(e);
  }

  return <Auth auth={auth}>{children}</Auth>;
}
