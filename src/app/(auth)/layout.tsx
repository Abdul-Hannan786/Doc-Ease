import Image from "next/image";
import { ReactNode } from "react";

const AuthLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="flex min-h-screen p-3 bg-[#fdf5f8]">
      <section className="w-[35%] max-h-screen rounded-xl relative hidden items-center justify-center lg:flex">
        <Image
          src="/images/bg-1.jpg"
          alt="Doctor Pic"
          fill
          className="rounded-xl"
        />
      </section>
      <section className="flex flex-1 flex-col items-center p-6 py-10 lg:justify-center lg:p-10 lg:py-0">
        <div className="mb-8 lg:hidden">
          <Image
            src="/images/logo-full-brand.png"
            alt="logo"
            width={224}
            height={82}
            className="h-auto w-[220px] rounded-full lg:w-[350px]"
          />
        </div>
        <div className="hidden lg:flex">
          <Image
            src="/images/logo-full-brand.png"
            alt="logo"
            width={224}
            height={82}
            className="h-auto w-[230px]"
          />
        </div>
        {children}
      </section>
    </div>
  );
};

export default AuthLayout;
