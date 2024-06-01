import { fetchAuth } from "@/services/auth";
import { UserType } from "@/types/user";
import WrapperFormProfile from "./WrapperFormProfile";

type Input = {
  name: string;
  email: string;
  image?: File;
};

type Validate = {
  name: string;
  email: string;
  image: string;
};

const ProfilePage = async () => {
  let user: UserType = {
    id: "",
    name: "Admin",
    email: "",
    image: "",
    role: "",
  };

  try {
    user = await fetchAuth().then((result) => result?.data);
  } catch (e) {
    console.error(e);
  }

  return (
    <>
      <section className="py-16">
        <div className="container max-w-full">
          <div className="p-4">
            <h1 className="text-3xl font-one tracking-wide mb-3 font-semibold">
              Profil
            </h1>
            <WrapperFormProfile user={user} />
          </div>
        </div>
      </section>
    </>
  );
};

export default ProfilePage;
