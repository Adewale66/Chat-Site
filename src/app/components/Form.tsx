"use client";

import { BsGithub } from "react-icons/bs";
import { FcGoogle } from "react-icons/fc";
import { useState, useCallback, useEffect } from "react";
import clsx from "clsx";
import { buttonType, inputs } from "@/types/type";
import { SubmitHandler, useForm } from "react-hook-form";
import axios from "axios";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import ProviderButton from "./ProviderButton";
import ProvidersSection from "./ProvidersSection";
import { useSession } from "next-auth/react";

const Form = () => {
  const [variant, setVariant] = useState<buttonType>("LOGIN");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<inputs>({
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });
  const { status } = useSession();

  useEffect(() => {
    if (status === "authenticated") router.push("/dashboard");
  }, [router, status]);

  const onSubmit: SubmitHandler<inputs> = (data) => {
    setIsLoading(true);
    if (variant === "LOGIN") {
      signIn("credentials", {
        email: data.email,
        password: data.password,
        redirect: false,
      })
        .then((res) => {
          if (res?.ok && !res.error) {
            toast.success("Welcome back");
            router.push("/dashboard");
          } else {
            toast.error("Invalid Credentials");
          }
        })
        .catch(() => {
          toast.error("Server Error");
        })
        .finally(() => setIsLoading(false));
    } else {
      axios.post("/api/register", data).then((res) => {
        signIn("credentials", {
          redirect: false,
          email: data.email,
          password: data.password,
        })
          .then(() => {
            toast.success("Welcome to the club");
            router.push("/dashboard");
          })
          .catch((e) => {
            toast.error(e.response.data.message);
          })
          .finally(() => {
            setIsLoading(false);
          });
      });
    }
  };

  const toggleVariant = useCallback(() => {
    if (variant === "LOGIN") setVariant("REGISTER");
    else setVariant("LOGIN");
  }, [variant]);

  const socialAction = (provider: string) => {
    setIsLoading(true);
    signIn(provider, {
      callbackUrl: "/dashboard",
    });
  };

  return (
    <div className="flex min-h-full flex-1 flex-col justify-center px-6  lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
          {variant === "LOGIN" ? "Sign in to your account" : "Sign up"}
        </h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
          {variant === "REGISTER" && (
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Name
              </label>
              <div className="mt-2">
                <input
                  {...register("name", { maxLength: 20, required: true })}
                  aria-invalid={errors.name ? "true" : "false"}
                  id="name"
                  name="name"
                  type="text"
                  autoComplete="off"
                  className={clsx(
                    "block w-full rounded-md border-0 px-4 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6",
                    errors.name &&
                      "bg-red-50 border border-red-500 text-red-900 placeholder-red-700 text-sm rounded-lg focus:ring-red-500 dark:bg-gray-700 focus:border-red-500 block w-full p-2.5 dark:text-red-500 dark:placeholder-red-500 dark:border-red-500"
                  )}
                />
                {errors.name && (
                  <p
                    className="mt-2 text-sm text-red-600 dark:text-red-500"
                    role="alert"
                  >
                    Name is required
                  </p>
                )}
              </div>
            </div>
          )}
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Email address
            </label>
            <div className="mt-2">
              <input
                {...register("email", {
                  pattern: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
                  required: true,
                })}
                aria-invalid={errors.email ? "true" : "false"}
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                className={clsx(
                  "block w-full rounded-md border-0 px-4 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6",
                  errors.email &&
                    "bg-red-50 border border-red-500 text-red-900 placeholder-red-700 text-sm rounded-lg focus:ring-red-500 dark:bg-gray-700 focus:border-red-500 block w-full p-2.5 dark:text-red-500 dark:placeholder-red-500 dark:border-red-500"
                )}
              />
              {errors.email && (
                <p
                  className="mt-2 text-sm text-red-600 dark:text-red-500"
                  role="alert"
                >
                  Please enter a valid email
                </p>
              )}
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between">
              <label
                htmlFor="password"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Password
              </label>
            </div>
            <div className="mt-2">
              <input
                {...register("password", {
                  minLength: 5,
                  maxLength: 20,
                  required: true,
                })}
                aria-invalid={errors.password ? "true" : "false"}
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                className={clsx(
                  "block w-full rounded-md border-0 px-4 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6",
                  errors.password &&
                    "bg-red-50 border border-red-500 text-red-900 placeholder-red-700 text-sm rounded-lg focus:ring-red-500 dark:bg-gray-700 focus:border-red-500 block w-full p-2.5 dark:text-red-500 dark:placeholder-red-500 dark:border-red-500"
                )}
              />
              {errors.password && (
                <p
                  className="mt-2 text-sm text-red-600 dark:text-red-500"
                  role="alert"
                >
                  Invalid password
                </p>
              )}
            </div>
          </div>

          <div>
            <button
              disabled={isLoading}
              type="submit"
              className={clsx(
                "flex w-full justify-center rounded-md  px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm  focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600",
                isLoading && "bg-blue-200",
                !isLoading && "hover:bg-indigo-500 bg-indigo-600"
              )}
            >
              {variant === "LOGIN" ? "Sign in" : "Sign Up"}
            </button>
          </div>
        </form>

        <ProvidersSection>
          <ProviderButton
            provider="Github"
            icon={BsGithub}
            onClick={() => socialAction("github")}
          />
          <ProviderButton
            provider="Google"
            icon={FcGoogle}
            onClick={() => socialAction("google")}
          />
        </ProvidersSection>

        <div className="mt-5 text-center text-sm text-gray-500">
          <span>
            {variant === "LOGIN"
              ? "Don't have an account?"
              : "Already have an account?"}
          </span>
          <span
            className="font-semibold cursor-pointer leading-6 text-indigo-600 hover:text-indigo-500"
            onClick={toggleVariant}
          >
            {" "}
            {variant === "LOGIN" ? "Register" : "Login"}
          </span>
        </div>
      </div>
    </div>
  );
};

export default Form;
