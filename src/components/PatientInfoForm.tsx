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
import { Input } from "@/components/ui/input";
import { useRef, useState } from "react";
import { Calendar } from "./ui/calendar";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { CalendarIcon } from "lucide-react";
import { Button } from "./ui/button";
import { cn } from "@/lib/utils";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { format, getMonth, getYear, setMonth, setYear } from "date-fns";
import Image from "next/image";

interface DatePickerProps {
  startYear?: number;
  endYear?: number;
}

const PatientFormSchema = z.object({
  fullname: z
    .string()
    .nonempty("Name is required")
    .min(3, "Name must be at least 3 characters long")
    .max(50, "Name must not exceed 50 characters"),
  dob: z.date().refine((date) => date < new Date(), {
    message: "Date must be in the past",
  }),
  gender: z
    .string()
    .refine(
      (value) => ["Male", "Female"].includes(value),
      "Please select a gender from the list."
    ),
  number: z
    .string()
    .min(11, "Number must be at least 11 characters long")
    .max(15, "Number must be at most 15 characters long")
    .regex(
      /^\+?[0-9]+$/,
      "Phone number must only contain numbers and may start with +"
    ),
  picture: z
    .instanceof(File, { message: "Please select a file" })
    .optional()
    .refine(
      (file) =>
        !file || 
        ["image/png", "image/jpeg", "image/jpg", "image/gif"].includes(
          file.type
        ),
      { message: "Only image files (PNG, JPEG, JPG, GIF) are allowed." }
    )
    .refine((file) => !file || file.size <= 3 * 1024 * 1024, {
      message: "File size should not exceed 3MB.",
    }),
});

const PatientInfoForm = ({
  startYear = getYear(new Date()) - 100,
  endYear = getYear(new Date()) + 100,
}: DatePickerProps) => {
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<z.infer<typeof PatientFormSchema>>({
    resolver: zodResolver(PatientFormSchema),
    defaultValues: {
      fullname: "",
      dob: new Date(),
      gender: "",
      number: "",
      picture: undefined,
    },
  });

  function onSubmit(values: z.infer<typeof PatientFormSchema>) {
    console.log(values);
  }

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

  return (
    <div className="bg-[#fffbfc] min-h-screen">
      <div className="container mx-auto py-7 ">
        <h1 className="h1 text-center text-light-100 mb-6">
          Patient Information
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
                          Select your profile picture (optional)
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
                          Date of Birth
                        </FormLabel>
                        <Popover>
                          <PopoverTrigger asChild>
                            <Button
                              variant={"ghost"}
                              className={cn(
                                "w-[250px] justify-start text-left font-normal px-0",
                                !field.value && "text-muted-foreground"
                              )}
                            >
                              <CalendarIcon className="mr-2 h-4 w-4" />
                              {field.value ? (
                                format(field.value, "PPP")
                              ) : (
                                <span>Pick a date</span>
                              )}
                            </Button>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0">
                            <div className="flex justify-between p-2">
                              <Select
                                onValueChange={(month) => {
                                  const newDate = setMonth(
                                    field.value || new Date(),
                                    months.indexOf(month)
                                  );
                                  field.onChange(newDate); // Update form value
                                }}
                                value={
                                  months[getMonth(field.value || new Date())]
                                }
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
                                onValueChange={(year) => {
                                  const newDate = setYear(
                                    field.value || new Date(),
                                    parseInt(year)
                                  );
                                  field.onChange(newDate); // Update form value
                                }}
                                value={getYear(
                                  field.value || new Date()
                                ).toString()}
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
                              onSelect={(selectedDate) => {
                                if (selectedDate) field.onChange(selectedDate); // Update form value
                              }}
                              initialFocus
                              month={field.value || new Date()}
                              onMonthChange={(newDate) =>
                                field.onChange(newDate)
                              }
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
                  name="number"
                  render={({ field }) => (
                    <FormItem>
                      <div className="shad-form-item">
                        <FormLabel className="shad-form-label ">
                          Contact Number
                        </FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Enter your contact number"
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

export default PatientInfoForm;
