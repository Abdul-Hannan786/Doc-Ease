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
import { specialization } from "./constant";

const authFormSchema = () => {
  return z.object({
    fullname: z
      .string()
      .min(3, "Name must be at least 3 characters long")
      .max(50, "Name must not exceed 50 characters"),
    picture: z.custom<File>((file) => {
      if (!file) return false;
      const allowedTypes = ["image/jpeg", "image/png", "image/gif"];
      return allowedTypes.includes(file.type);
    }, "Invalid file type. Only JPEG, PNG, and GIF are allowed."),
    specialization: z
      .string()
      .refine((value) => specialization.includes(value), {
        message: "Please select a specialization from the list.",
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
  });
};

const DoctorInfoForm = () => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [isLoading, setIsLoading] = useState(false);

  const formSchema = authFormSchema();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullname: "",
      picture: undefined,
      specialization: "",
      gender: "",
      hospital: "",
      address: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    console.log(values);
    form.reset();
  };

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
                            id="picture"
                            type="file"
                            placeholder="Choose a file"
                            className="shad-input mt-1"
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
                        <FormLabel className="shad-form-label">
                          Conatact Number
                        </FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            placeholder="Enter your contact number"
                            className="shad-input"
                            {...field}
                            onChange={(e) => {
                              const value = e.target.value;
                              if (/^\d*\.?\d*$/.test(value)) {
                                field.onChange(value);
                              }
                            }}
                            min={0}
                            step={1}
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
                            onChange={(e) => {
                              const value = e.target.value;
                              if (/^\d*\.?\d*$/.test(value)) {
                                field.onChange(value);
                              }
                            }}
                            min={0}
                            step={1}
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
