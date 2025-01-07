import Header from "@/components/Header";
import MobileNavigation from "@/components/MobileNavigation";
import Sidebar from "@/components/Sidebar";
import { ReactNode } from "react";
import { doctorNav } from "@/constant/index";

const DoctorLayout = ({ children }: { children: ReactNode }) => {
  return (
    <main className="flex h-screen">
      <Sidebar navData={doctorNav} />
      <section className="flex h-full flex-1 flex-col">
        <MobileNavigation navData={doctorNav}/>
        <Header />
        <div className="main-content">{children}</div>
      </section>
    </main>
  );
};

export default DoctorLayout;
