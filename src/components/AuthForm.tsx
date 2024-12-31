"use client";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
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
import Image from "next/image";
import Link from "next/link";
import { PasswordInput } from "./PasswordInput";

type AuthFromType = "sign-in" | "sign-up";

const authFormSchema = (formType: AuthFromType) => {
  return z.object({
    email: z.string().email(),
    password: z
      .string()
      .min(8, "Password must be at least 8 characters long")
      .max(32, "Password must not exceed 32 characters"),
    userType:
      formType === "sign-up"
        ? z
            .string()
            .refine(
              (value) => ["patient", "doctor"].includes(value),
              "User type must be either 'Patient' or 'Doctor'"
            )
        : z.string().optional(),
  });
};

const AuthForm = ({ type }: { type: AuthFromType }) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [isLoading, setIsLoading] = useState(false);

  const formSchema = authFormSchema(type);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
      userType: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    console.log(values);
  };
  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="auth-form ">
          <h1 className="form-title">
            {type === "sign-in" ? "Sign In" : "Sign Up"}
          </h1>
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <div className="shad-form-item">
                  <FormLabel className="shad-form-label ">Email</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter your email"
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
            name="password"
            render={({ field }) => (
              <FormItem>
                <div className="shad-form-item">
                  <FormLabel className="shad-form-label">Password</FormLabel>
                  <FormControl>
                    <PasswordInput
                      placeholder="Enter your password"
                      className="shad-input"
                      {...field}
                    />
                  </FormControl>
                </div>
                <FormMessage className="shad-form-message" />
              </FormItem>
            )}
          />
          {type === "sign-up" && (
            <FormField
              control={form.control}
              name="userType"
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
                            placeholder="Signup as"
                            className="text-light-200 body-2 placeholder:text-light-200"
                          />
                        </SelectTrigger>
                        <SelectContent className="border-none">
                          <SelectItem value="patient" className="border-none">
                            Patient
                          </SelectItem>
                          <SelectItem value="doctor" className="border-none">
                            Doctor
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </FormControl>
                  </div>
                  <FormMessage className="shad-form-message" />
                </FormItem>
              )}
            />
          )}
          <Button
            type="submit"
            className="form-submit-button mb-10"
            disabled={isLoading}
          >
            {type === "sign-in" ? "Sign In" : "Sign Up"}
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
          <div className="body-2 pb-2 flex justify-center">
            <p className="text-light-100">
              {type === "sign-in"
                ? "Don't have an account?"
                : "Already have an account?"}
              <Link
                className="ml-1 font-medium text-brand"
                href={type === "sign-in" ? "/signup" : "signin"}
              >
                {type === "sign-in" ? "Sign Up" : "Sign in"}
              </Link>
            </p>
          </div>
        </form>
      </Form>
    </>
  );
};

export default AuthForm;
