import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import Image from "next/image";
import { Button } from "./ui/button";
import Link from "next/link";

const DoctorCardSection = ({ isHome }: { isHome: boolean }) => {
  const dummyData = [
    {
      fullname: "Abdul Hannan",
      picture: "/images/user.png",
      age: 18,
      specialization: "Urologist",
      experience: "3 years",
      gender: "Male",
      hospital: "Agha Khan Hospital",
      address: "Karachi, Pakistan",
      number: "03002640700",
      fees: 2000,
    },
    {
      fullname: "Abdul Hannan",
      picture: "/images/user.png",
      age: 18,
      specialization: "Urologist",
      experience: "3 years",
      gender: "Male",
      hospital: "Agha Khan Hospital",
      address: "Karachi, Pakistan",
      number: "03002640700",
      fees: 2000,
    },
    {
      fullname: "Abdul Hannan",
      picture: "/images/user.png",
      age: 18,
      specialization: "Urologist",
      experience: "3 years",
      gender: "Male",
      hospital: "Agha Khan Hospital",
      address: "Karachi, Pakistan",
      number: "03002640700",
      fees: 2000,
    },
    {
      fullname: "Abdul Hannan",
      picture: "/images/user.png",
      age: 18,
      specialization: "Urologist",
      experience: "3 years",
      gender: "Male",
      hospital: "Agha Khan Hospital",
      address: "Karachi, Pakistan",
      number: "03002640700",
      fees: 2000,
    },
    {
      fullname: "Abdul Hannan",
      picture: "/images/user.png",
      age: 18,
      specialization: "Urologist",
      experience: "3 years",
      gender: "Male",
      hospital: "Agha Khan Hospital",
      address: "Karachi, Pakistan",
      number: "03002640700",
      fees: 2000,
    },
    {
      fullname: "Abdul Hannan",
      picture: "/images/user.png",
      age: 18,
      specialization: "Urologist",
      experience: "3 years",
      gender: "Male",
      hospital: "Agha Khan Hospital",
      address: "Karachi, Pakistan",
      number: "03002640700",
      fees: 2000,
    },
    {
      fullname: "Abdul Hannan",
      picture: "/images/user.png",
      age: 18,
      specialization: "Urologist",
      experience: "3 years",
      gender: "Male",
      hospital: "Agha Khan Hospital",
      address: "Karachi, Pakistan",
      number: "03002640700",
      fees: 2000,
    },
  ];

  const filteredArr = isHome ? dummyData.slice(0, 6) : dummyData;
  return (
    <div>
      {filteredArr.length > 0 ? (
        <section className="file-list">
          {filteredArr.map(
            ({ fullname, specialization, hospital, fees, gender }) => (
              <Card key={fullname} className="max-w-[500px] mx-auto w-full">
                <CardHeader>
                  <div className="flex gap-3">
                    <div className="w-[55px] h-[55px] rounded-xl overflow-hidden">
                      <Image
                        src={"/images/temp.avif"}
                        alt="avatar"
                        width={55}
                        height={55}
                        quality={100}
                        className="object-cover w-full h-full"
                      />
                    </div>
                    <div>
                      <p className="text-[16px] leading-[24px] font-semibold capitalize line-clamp-1">
                        Dr. {fullname}
                      </p>
                      <p className="body-2 text-light-200">{specialization}</p>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-col gap-2">
                    <div className="flex gap-2 items-center">
                      <Image
                        src={"/images/hospital.svg"}
                        alt="Hospital"
                        width={19}
                        height={19}
                      />
                      <p className="text-[15px] leading-[20px] font-medium">
                        {hospital}
                      </p>
                    </div>
                    <div className="flex gap-2 items-center">
                      <Image
                        src={"/images/gender.svg"}
                        alt="Gender"
                        width={19}
                        height={19}
                      />
                      <p className="text-[15px] leading-[20px] font-medium">
                        {gender}
                      </p>
                    </div>
                    <div className="flex gap-2 items-center">
                      <Image
                        src={"/images/dollar.svg"}
                        alt="Fees"
                        width={19}
                        height={19}
                      />
                      <p className="text-[15px] leading-[20px] font-medium">
                        {fees} PKR
                      </p>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Link href={""} className="w-full">
                    <Button className="modal-submit-button">See Details</Button>
                  </Link>
                </CardFooter>
              </Card>
            )
          )}
        </section>
      ) : (
        <p className="empty-list">No doctors found</p>
      )}
    </div>
  );
};

export default DoctorCardSection;
