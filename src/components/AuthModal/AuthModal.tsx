import { useEffect, useState } from "react";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { FirebaseError } from "firebase/app";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { auth } from "../../services/firebase";

import css from "./AuthModal.module.css";

import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";
import type { LoginValues, Props, RegisterValues } from "../../types/user";

const loginSchema = yup.object({
  email: yup.string().email("Wrong email format").required("Email is required"),
  password: yup.string().min(6, "Too short").required("Password is required"),
});

const registerSchema = yup.object({
  name: yup.string().min(2, "Too short name").required("Name is required"),
  email: yup.string().email("Wrong email format").required("Email is required"),
  password: yup.string().min(6, "Too short").required("Password is required"),
});

export default function AuthModal({ mode, onClose }: Props) {
  const schema = mode === "login" ? loginSchema : registerSchema;
  const [showPassword, setShowPassword] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<LoginValues | RegisterValues>({
    resolver: yupResolver(schema),
    defaultValues:
      mode === "login"
        ? { email: "", password: "" }
        : { name: "", email: "", password: "" },
  });

  useEffect(() => {
    reset(
      mode === "login"
        ? { email: "", password: "" }
        : { name: "", email: "", password: "" },
    );
  }, [mode, reset]);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [onClose]);

  const showFirebaseError = (error: unknown) => {
    if (error instanceof FirebaseError) {
      switch (error.code) {
        case "auth/user-not-found":
          iziToast.error({
            title: "Error",
            message: "The user with such mail is not registered",
            position: "topRight",
          });
          return;
        case "auth/wrong-password":
          iziToast.error({
            title: "Error",
            message: "Wrong password",
            position: "topRight",
          });
          return;
        case "auth/email-already-in-use":
          iziToast.error({
            title: "Error",
            message: "This mail is already in use",
            position: "topRight",
          });
          return;
        case "auth/invalid-credential":
        case "auth/invalid-email":
          iziToast.error({
            title: "Error",
            message: "Invalid mail or password",
            position: "topRight",
          });
          return;
        default:
          iziToast.error({
            title: "Error",
            message: error.message,
            position: "topRight",
          });
          return;
      }
    }

    iziToast.error({
      title: "Error",
      message: "Error occurred",
      position: "topRight",
    });
  };

  const onSubmit = async (data: LoginValues | RegisterValues) => {
    try {
      if (mode === "login") {
        const v = data as LoginValues;
        await signInWithEmailAndPassword(auth, v.email, v.password);
        iziToast.success({
          title: "Success",
          message: "You are logged",
          position: "topRight",
        });
        onClose();
        return;
      }

      const v = data as RegisterValues;
      const cred = await createUserWithEmailAndPassword(
        auth,
        v.email,
        v.password,
      );
      await updateProfile(cred.user, { displayName: v.name });

      iziToast.success({
        title: "Success",
        message: "The user is registered",
        position: "topRight",
      });
      onClose();
    } catch (error) {
      showFirebaseError(error);
    }
  };

  return (
    <div
      className={css.backdrop}
      role="dialog"
      aria-modal="true"
      onClick={onClose}
    >
      <div className={css.modal} onClick={(e) => e.stopPropagation()}>
        <button
          type="button"
          className={css.closeBtn}
          onClick={onClose}
          aria-label="Close"
        >
          <svg width={32} height={32}>
            <use href="/sprite.svg#x" />
          </svg>
        </button>

        <div className={css.authForm}>
          <h2>{mode === "login" ? "Log In" : "Registration"}</h2>

          <p>
            {mode === "login"
              ? "Welcome back! Please enter your credentials to access your account and continue your search for an teacher."
              : "Thank you for your interest in our platform! In order to register, we need some information. Please provide us with the following information"}
          </p>

          <form onSubmit={handleSubmit(onSubmit)} className={css.form}>
            {mode === "register" && (
              <>
                <input
                  type="text"
                  placeholder="Name"
                  {...register("name" as const)}
                />
                {"name" in errors && (
                  <span className={css.errorText}>
                    {errors.name?.message as string}
                  </span>
                )}
              </>
            )}

            <input
              type="email"
              placeholder="Email"
              {...register("email" as const)}
            />
            {"email" in errors && (
              <span className={css.errorText}>
                {errors.email?.message as string}
              </span>
            )}

            {/* <input
              type="password"
              placeholder="Password"
              {...register("password" as const)}
            />  */}
            <div className={css.passwordField}>
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                {...register("password" as const)}
              />

              <button
                type="button"
                className={css.eyeBtn}
                onClick={() => setShowPassword((v) => !v)}
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                <svg width={20} height={20} fill="white">
                  <use
                    href={
                      showPassword ? "/sprite.svg#eye" : "/sprite.svg#eye-off"
                    }
                  />
                </svg>
              </button>
            </div>
            {"password" in errors && (
              <span className={css.errorText}>
                {errors.password?.message as string}
              </span>
            )}

            <button type="submit" className={css.btn} disabled={isSubmitting}>
              {mode === "login" ? "Log in" : "Sign Up"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
