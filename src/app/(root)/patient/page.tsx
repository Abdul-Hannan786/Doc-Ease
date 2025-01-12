import DoctorCardSection from "@/components/DoctorCardSection";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const PatientDashboard = () => {

  return (
    <div className="page-container">
      <section className="w-full">
        <div className="total-size-section">
          <h1 className="h1 capitalize">Dashboard</h1>
          <div className="sort-container">
            <Link href="/patient/all-doctors">
              <Button className="bg-brand hover:bg-brand-100 transition-all rounded-3xl button">See All Doctors</Button>
            </Link>
          </div>
        </div>
      </section>
      <div>
        <h3 className="text-2xl font-semibold text-start capitalize">
          Find the doctors you need
        </h3>
      </div>
      <DoctorCardSection isHome={true}/>
    </div>
  );
};

export default PatientDashboard;
