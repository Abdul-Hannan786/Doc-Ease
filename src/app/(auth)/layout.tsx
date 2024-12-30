import Image from "next/image";
import { ReactNode } from "react";

const AuthLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="flex min-h-screen p-3 bg-[#faf2f4]">
      <section className="w-[35%] h-auto rounded-xl relative hidden items-center justify-center lg:flex">
        <Image
          src="/images/bg-1.jpg"
          alt="Doctor Pic"
          fill
          className="rounded-xl"
        />
        <h1 className="absolute top-6 left-5 text-3xl font-bold text-[#ed0033]">
          Doc Ease
        </h1>
      </section>
      <section className="flex flex-1 flex-col items-center p-6 py-10 lg:justify-center lg:p-10 lg:py-0">
        <div className="mb:16 lg:hidden">
            <Image src="/images/logo.png" alt="logo" width={224} height={82} className="h-auto w-[120px] rounded-full lg:w-[250px]"/>
        </div>
      {children}
      </section>
    </div>
  );
};

export default AuthLayout;
