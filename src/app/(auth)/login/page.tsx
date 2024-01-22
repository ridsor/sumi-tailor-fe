import login1 from "@/assets/img/login1.png";
import Image from "next/image";
import FormLogin from "./FormLogin";

const LoginPage = () => {
  return (
    <>
      <section className="pt-24 md:pb-4 bg-three">
        <div className="container max-w-full">
          <div className="min-h-[500px] flex flex-wrap justify-center">
            <article className="w-full lg:w-[calc(100%-500px)] ">
              <div className="flex items-center w-full h-full">
                <div className="bg-[#E4EEDD] md:h-full w-full md:rounded-tr-xl md:rounded-br-xl md:shadow-sm flex justify-center items-center">
                  <div className="p-4">
                    <div className="w-[300px] hidden lg:block">
                      <Image src={login1} alt="" className="w-full" priority />
                    </div>
                    <h1 className="text-3xl text-center md:text-4xl mb-3 font-bold tracking-wide">
                      Selamat Datang Kembali
                    </h1>
                  </div>
                </div>
              </div>
            </article>
            <article className="w-full md:w-[500px]">
              <div className="flex justify-center items-center p-8 h-full">
                <div className="w-full">
                  <h2 className="font-one font-bold text-3xl mb-1">Sign In</h2>
                  <p className="mb-6">
                    Silakan masuk ke akun Anda menggunakan informasi yang sudah
                    terdaftar.
                  </p>
                  <FormLogin />
                </div>
              </div>
            </article>
          </div>
        </div>
      </section>
    </>
  );
};

export default LoginPage;
