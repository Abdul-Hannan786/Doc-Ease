import DoctorCardSection from "@/components/DoctorCardSection";


const AllDoctors = () => {
  return (
    <div className="page-container">
      <section className="w-full">
        <div className="total-size-section">
          <h1 className="h1 capitalize">All Doctors</h1>
          <div className="sort-container">
            <p className="body-1 hidden sm:block text-light-200 ">Sort by:</p>
          </div>
        </div>
      </section>
      <section>
        <DoctorCardSection isHome={false} />
      </section>
    </div>
  );
};

export default AllDoctors;
