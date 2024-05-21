import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { registerSchema } from "../../Helpers/formValidation";
import useAuthCalls from "../../Custom-hooks/useAuthCalls";
import { useDispatch } from "react-redux";
import registerStyle from "./Register.module.scss";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { modules } from "../../Helpers/quillModules";
import { DevTool } from "@hookform/devtools";

const Register = () => {
  const { registerUser } = useAuthCalls();
  const dispatch = useDispatch();
  const {
    register,
    control,
    handleSubmit,
    formState: { errors, isSubmitting, isSubmitSuccessful },
    setValue,
    reset,
  } = useForm({ resolver: yupResolver(registerSchema) });

  const [biography, setBiography] = useState("");

  const onSubmit = (data) => {
    const info = { ...data, biography };
    console.log("submit data", info);
    dispatch(registerUser(info));
  };

  useEffect(() => {
    if (isSubmitSuccessful) {
      reset();
      setBiography("");
    }
  }, [isSubmitSuccessful, reset]);

  const handleBiographyChange = (value) => {
    setBiography(value);
    setValue("biography", value, { shouldValidate: true });
  };

  return (
    <div id={registerStyle["login-box"]}>
      <div className={registerStyle.left}>
        <h1>Sign up</h1>
        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          <input
            placeholder="USERNAME"
            type="text"
            id="username"
            name="username"
            {...register("username")}
          />
          <p className={registerStyle.error}>{errors.username?.message}</p>

          <input
            placeholder="FIRST NAME"
            type="text"
            id="firstName"
            name="firstName"
            {...register("firstName")}
          />
          <p className={registerStyle.error}>{errors.firstName?.message}</p>

          <input
            placeholder="LAST NAME"
            type="text"
            id="lastName"
            name="lastName"
            {...register("lastName")}
          />
          <p className={registerStyle.error}>{errors.lastName?.message}</p>

          <input
            placeholder="EMAIL"
            type="email"
            id="email"
            name="email"
            {...register("email")}
          />
          <p className={registerStyle.error}>{errors.email?.message}</p>

          <input
            placeholder="PASSWORD"
            type="password"
            id="password"
            name="password"
            {...register("password")}
          />
          <p className={registerStyle.error}>{errors.password?.message}</p>

          <input
            placeholder="IMAGE"
            type="text"
            id="image"
            name="image"
            {...register("image")}
          />
          <p className={registerStyle.error}>{errors.image?.message}</p>

          {/* <input type="hidden" {...register("biography")} value={biography} /> */}
          <button
            disabled={isSubmitting}
            type="submit"
            name="signup_submit"
            defaultValue="Sign me up"
          >
            Sign Up
          </button>
        </form>
      </div>
      <div className={registerStyle.right}>
        <ReactQuill
          className={registerStyle.quill}
          theme="snow"
          value={biography}
          onChange={handleBiographyChange}
          modules={modules}
        />
      </div>
      <DevTool control={control} />
    </div>
  );
};

export default Register;

