"use client";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { Input } from "@/components/ui/input";
import { useState } from "react";
import { Textarea } from "./ui/textarea";

import { Button } from "./ui/button";
import Image from "next/image";
import { experience, specialization } from "../constant";
import { useRef } from "react";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { CalendarIcon } from "lucide-react";
import { Calendar } from "./ui/calendar";
import { cn } from "@/lib/utils";
import { format, getMonth, getYear, setMonth, setYear } from "date-fns";

const authFormSchema = () => {
  return z.object({
    fullname: z
      .string()
      .min(3, "Name must be at least 3 characters long")
      .max(50, "Name must not exceed 50 characters"),
    picture: z
      .instanceof(File, { message: "Please select a file" })
      .refine(
        (file) =>
          ["image/png", "image/jpeg", "image/jpg", "image/gif"].includes(
            file.type
          ),
        { message: "Only image files (PNG, JPEG, JPG, GIF) are allowed." }
      )
      .refine((file) => file.size <= 5 * 1024 * 1024, {
        message: "File size should not exceed 5MB.",
      }),
    specialization: z
      .string()
      .refine((value) => specialization.includes(value), {
        message: "Please select a specialization from the list.",
      }),
    experience: z.string().refine((value) => experience.includes(value), {
      message: "Please select experience from the list.",
    }),
    gender: z
      .string()
      .refine(
        (value) => ["Male", "Female"].includes(value),
        "Please select a gender from the list."
      ),
    hospital: z
      .string()
      .min(3, "Hospital name must be at least 3 characters long"),
    address: z.string().min(3, "Address must be at least 3 characters long"),
    number: z
      .string()
      .min(11, "Number must be at least 11 characters long")
      .max(15, "Number must be at most 15 characters long")
      .regex(
        /^\+?[0-9]+$/,
        "Phone number must contain only numbers and may start with +"
      ),
    fees: z.preprocess((value) => {
      if (value === "" || value === undefined || value === null) {
        return 0;
      }
      return parseFloat(value as string);
    }, z.number().min(1, { message: "Fees must be at least 1 PKR." }).max(100000, { message: "Fees cannot exceed 100,000 PKR." })),
    bio: z
      .string()
      .min(10, "Bio must be at least 10 characters long")
      .max(1000, "Bio must not exceed 100 characters"),
    dob: z.date().refine((date) => date < new Date(), {
      message: "Date must be in the past",
    }),
  });
};

interface DatePickerProps {
  startYear?: number;
  endYear?: number;
}

const DoctorInfoForm = ({
  startYear = getYear(new Date()) - 100,
  endYear = getYear(new Date()) + 100,
}: DatePickerProps) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [isLoading, setIsLoading] = useState(false);
  const [date, setDate] = useState<Date>(new Date());
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const formSchema = authFormSchema();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullname: "",
      picture: undefined,
      dob: new Date(),
      specialization: "",
      experience: "",
      gender: "",
      hospital: "",
      address: "",
      number: "",
      fees: 0,
      bio: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    console.log(values);
    form.reset({
      fullname: "",
      picture: undefined,
      dob: new Date(),
      specialization: "",
      experience: "",
      gender: "",
      hospital: "",
      address: "",
      number: "",
      fees: 0,
      bio: "",
    });
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const years = Array.from(
    { length: endYear - startYear + 1 },
    (_, i) => startYear + i
  );

  const handleMonthChange = (month: string) => {
    const newDate = setMonth(date, months.indexOf(month));
    setDate(newDate);
  };

  const handleYearChange = (year: string) => {
    const newDate = setYear(date, parseInt(year));
    setDate(newDate);
  };

  const handleSelect = (selectedData: Date | undefined) => {
    if (selectedData) {
      setDate(selectedData)
    }
  }

  return (
    <div className="bg-[#fffbfc] min-h-screen">
      <div className="container mx-auto py-7 ">
        <h1 className="h1 text-center text-light-100 mb-6">
          Doctor Information
        </h1>
        <div className="shadow-lg bg-white p-5 md:p-6 lg:p-8 rounded-xl">
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="max-h-[1200px] w-full flex-col justify-center space-y-5 transition-all lg:h-full "
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <FormField
                  control={form.control}
                  name="fullname"
                  render={({ field }) => (
                    <FormItem>
                      <div className="shad-form-item">
                        <FormLabel className="shad-form-label">
                          Full Name
                        </FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Enter your full name"
                            className="shad-input"
                            {...field}
                          />
                        </FormControl>
                      </div>
                      <FormMessage className="shad-form-message" />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="picture"
                  render={({ field }) => (
                    <FormItem>
                      <div className="shad-form-item">
                        <FormLabel className="shad-form-label">
                          Select your profile picture
                        </FormLabel>
                        <FormControl>
                          <Input
                            ref={(e) => {
                              fileInputRef.current = e;
                              field.ref(e);
                            }}
                            id="picture"
                            type="file"
                            placeholder="Choose a file"
                            className="shad-input mt-1"
                            accept="image/png, image/jpeg, image/jpg, image/gif"
                            onChange={(e) =>
                              field.onChange(e.target.files?.[0])
                            }
                            onBlur={field.onBlur}
                          />
                        </FormControl>
                      </div>
                      <FormMessage className="shad-form-message" />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="dob"
                  render={({ field }) => (
                    <FormItem className="flex flex-col items-start">
                      <div className="shad-form-item w-full">
                        <FormLabel className="shad-form-label">
                          DateTime
                        </FormLabel>
                        <Popover>
                          <PopoverTrigger asChild>
                            <Button
                              variant={"ghost"}
                              className={cn(
                                "w-[250px] justify-start text-left font-normal px-0",
                                !date && "text-muted-foreground"
                              )}
                            >
                              <CalendarIcon className="mr-2 h-4 w-4" />
                              {date ? (
                                format(date, "PPP")
                              ) : (
                                <span>Pick a date</span>
                              )}
                            </Button>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0">
                            <div className="flex justify-between p-2">
                              <Select
                                onValueChange={handleMonthChange}
                                value={months[getMonth(date)]}
                              >
                                <SelectTrigger className="w-[110px]">
                                  <SelectValue placeholder="Month" />
                                </SelectTrigger>
                                <SelectContent>
                                  {months.map((month) => (
                                    <SelectItem key={month} value={month}>
                                      {month}
                                    </SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                              <Select
                                onValueChange={handleYearChange}
                                value={getYear(date).toString()}
                              >
                                <SelectTrigger className="w-[110px]">
                                  <SelectValue placeholder="Year" />
                                </SelectTrigger>
                                <SelectContent>
                                  {years.map((year) => (
                                    <SelectItem
                                      key={year}
                                      value={year.toString()}
                                    >
                                      {year}
                                    </SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                            </div>

                            <Calendar
                              mode="single"
                              selected={field.value}
                              onSelect={handleSelect}
                              initialFocus
                              month={date}
                              onMonthChange={setDate}
                              disabled={(date) =>
                                date > new Date() ||
                                date < new Date("1900-01-01")
                              }
                            />
                          </PopoverContent>
                        </Popover>
                        <FormMessage className="shad-form-message" />
                      </div>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="specialization"
                  render={({ field }) => (
                    <FormItem>
                      <div className="shad-form-item">
                        <FormControl>
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                          >
                            <SelectTrigger className="border-none shadow-none p-0 h-auto focus:ring-0 focus:outline-none focus-visible:ring-0">
                              <SelectValue
                                placeholder="Specialization"
                                className="text-light-200 body-2 placeholder:text-light-200"
                              />
                            </SelectTrigger>
                            <SelectContent className="border-none">
                              {specialization.map((spec) => (
                                <SelectItem
                                  key={spec}
                                  value={spec}
                                  className="border-none"
                                >
                                  {spec}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </FormControl>
                      </div>
                      <FormMessage className="shad-form-message" />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="experience"
                  render={({ field }) => (
                    <FormItem>
                      <div className="shad-form-item">
                        <FormControl>
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                          >
                            <SelectTrigger className="border-none shadow-none p-0 h-auto focus:ring-0 focus:outline-none focus-visible:ring-0">
                              <SelectValue
                                placeholder="Experience"
                                className="text-light-200 body-2 placeholder:text-light-200"
                              />
                            </SelectTrigger>
                            <SelectContent className="border-none">
                              {experience.map((value) => (
                                <SelectItem
                                  key={value}
                                  value={value}
                                  className="border-none"
                                >
                                  {value}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </FormControl>
                      </div>
                      <FormMessage className="shad-form-message" />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="gender"
                  render={({ field }) => (
                    <FormItem>
                      <div className="shad-form-item">
                        <FormControl>
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                          >
                            <SelectTrigger className="border-none shadow-none p-0 h-auto focus:ring-0 focus:outline-none focus-visible:ring-0">
                              <SelectValue
                                placeholder="Gender"
                                className="text-light-200 body-2 placeholder:text-light-200"
                              />
                            </SelectTrigger>
                            <SelectContent className="border-none">
                              <SelectItem value="Male" className="border-none">
                                Male
                              </SelectItem>
                              <SelectItem
                                value="Female"
                                className="border-none"
                              >
                                Female
                              </SelectItem>
                            </SelectContent>
                          </Select>
                        </FormControl>
                      </div>
                      <FormMessage className="shad-form-message" />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="hospital"
                  render={({ field }) => (
                    <FormItem>
                      <div className="shad-form-item">
                        <FormLabel className="shad-form-label ">
                          Hospital Name
                        </FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Enter your hospital name"
                            className="shad-input"
                            {...field}
                          />
                        </FormControl>
                      </div>
                      <FormMessage className="shad-form-message" />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="address"
                  render={({ field }) => (
                    <FormItem>
                      <div className="shad-form-item">
                        <FormLabel className="shad-form-label ">
                          Address
                        </FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Enter your hospital address"
                            className="shad-input"
                            {...field}
                          />
                        </FormControl>
                      </div>
                      <FormMessage className="shad-form-message" />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="number"
                  render={({ field }) => (
                    <FormItem>
                      <div className="shad-form-item">
                        <FormLabel className="shad-form-label ">
                          Contact Number
                        </FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Enter your hospital address"
                            className="shad-input"
                            {...field}
                          />
                        </FormControl>
                      </div>
                      <FormMessage className="shad-form-message" />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="fees"
                  render={({ field }) => (
                    <FormItem>
                      <div className="shad-form-item">
                        <FormLabel className="shad-form-label">
                          Appointment fees
                        </FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            placeholder="Enter your appointment fees in PKR"
                            className="shad-input"
                            {...field}
                          />
                        </FormControl>
                      </div>
                      <FormMessage className="shad-form-message" />
                    </FormItem>
                  )}
                />
              </div>
              <FormField
                control={form.control}
                name="bio"
                render={({ field }) => (
                  <FormItem>
                    <div className="flex h-auto min-h-[78px] flex-col justify-center rounded-xl border border-light-300 px-4 shadow-drop-1">
                      <FormLabel className="shad-form-label">Bio</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Enter your bio"
                          className="border-none shadow-none p-0 pt-2 min-h-[120px] shad-no-focus placeholder:text-light-200 body-2"
                          {...field}
                        />
                      </FormControl>
                    </div>
                    <FormMessage className="shad-form-message" />
                  </FormItem>
                )}
              />
              <Button
                type="submit"
                className="modal-submit-button mb-10"
                disabled={isLoading}
              >
                Save and Continue
                {isLoading && (
                  <Image
                    src="/images/loader.svg"
                    alt="loader"
                    width={24}
                    height={24}
                    className="ml-2 animate-spin"
                  />
                )}
              </Button>
            </form>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default DoctorInfoForm;
