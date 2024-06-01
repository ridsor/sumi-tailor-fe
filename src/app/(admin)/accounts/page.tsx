import { UserType } from "@/types/user";
import AccountList from "./AccountList";
import AccountSearch from "./AccountSearch";
import { fetchAuth } from "@/services/auth";
import { getUsers } from "@/services/user";

export default async function AccountPage() {
  let auth: UserType = {
    id: "",
    name: "",
    email: "",
    image: "",
    role: "",
  };

  let users: UserType[] = [];

  try {
    auth = await fetchAuth().then((result) => result?.data);
    users = await getUsers();
  } catch (e) {
    console.error(e);
  }

  return (
    <section className="py-16">
      <div className="container max-w-full">
        <div className="p-4">
          <h1 className="text-3xl font-one mb-3 tracking-wide font-semibold">
            Admin
          </h1>

          <AccountSearch />
          <AccountList users={users} auth={auth} />
        </div>
      </div>
    </section>
  );
}
