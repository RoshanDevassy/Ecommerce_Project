import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { signup } from "../reduxAPIs/AuthSlice";
import "./signuppage.css";
import { toast } from "react-toastify";

/* Manual form data getting Method with validation */
/* export default function SignupPage() {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  console.info("Form Data :", formData);

  const [error, setError] = useState({});
  const [isSubmitting, SetIsSubmitting] = useState(false);

  const navigate = useNavigate();

  

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleFormSubmit = async (e) => {
    console.info("Handling Form Submit");
    e.preventDefault();

    SetIsSubmitting(true);

    const errors = {};
    console.info("errors :", errors);

    if (Boolean(formData.username)) {
      if (/[^a-zA-Z0-9]/.test(formData.username))
        errors.username = "No Special Character";
    } else {
      errors.username = "Enter username";
    }

    if (Boolean(formData.password)) {
      if (formData.password.length >= 8 && formData.password.length <= 20) {
        if (!/[a-z]/.test(formData.password))
          errors.password = "Minimum 1 Small Case";
        if (!/[A-Z]/.test(formData.password))
          errors.password = "Minimum 1 Upper Case";
        if (!/[0-9]/.test(formData.password))
          errors.password = "Minimum 1 Numeric Value";
        if (!/[!@#$%&*]/.test(formData.password))
          errors.password = "Minimum 1 Special Character";
      } else {
        errors.password = "Minimum 8 Maximum 20 Characters";
      }
    } else {
      errors.password = "Enter password";
    }

    setError(errors);

    if (Object.keys(errors).length === 0) {

      await dispatch(signup(formData)).unwrap();
      alert("submitted");
      e.target.reset();
      navigate("/login");
      SetIsSubmitting(false);
    } else {
      SetIsSubmitting(false);
    }
  };

  return (
    <>
      
      <form onSubmit={handleFormSubmit}>
        <h1>Signup</h1>
        <div>
          <label htmlFor="username">UserName :</label>
          <input
            type="text"
            maxLength={25}
            minLength={3}
            onChange={handleChange}
            name="username"
            disabled={isSubmitting}
          />
          {error.username && (
            <p style={{ fontSize: "12px", color: "red" }}>{error.username}!</p>
          )}
        </div>
        <div>
          <label htmlFor="password">Password :</label>
          <input
            type="password"
            maxLength={15}
            minLength={8}
            onChange={handleChange}
            name="password"
            disabled={isSubmitting}
          />
          {error.password && (
            <p style={{ fontSize: "12px", color: "red" }}>{error.password}!</p>
          )}
        </div>
        <button type="submit" disabled={isSubmitting}>
          {" "}
          {isSubmitting ? "submitting" : "signup"}
        </button>
      </form>
    </>
  );
} */

/* Automatic form data getting Method with validation   */
export default function SignupPage() {
  const [error, setError] = useState({});
  const [isSubmitting, SetIsSubmitting] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleFormSubmit = async (e) => {
    console.info("In Handle Form Submit");
    e.preventDefault();

    SetIsSubmitting(true);

    const formData = new FormData(e.target);
    const plainData = Object.fromEntries(formData.entries());
    console.info("Plain Data :", plainData);

    const errors = {};
    console.info("errors :", errors);

    if (Boolean(plainData.username)) {
      if (/[^a-zA-Z0-9]/.test(plainData.username))
        errors.username = "No Special Characters Allowed";
    } else {
      errors.username = "Enter UserName";
    }

    if (Boolean(plainData.password)) {
      if (plainData.password.length >= 8 && plainData.password.length <= 20) {
        if (!/[a-z]/.test(plainData.password))
          errors.password = "Minimum 1 smallCase";
        if (!/[A-Z]/.test(plainData.password))
          errors.password = "Minimum 1 upperCase";
        if (!/[0-9]/.test(plainData.password))
          errors.password = "Minimum 1 number";
        if (!/[@#$%&*]/.test(plainData.password))
          errors.password = "Enter 1 special character like @#$%&*";
      } else {
        errors.password = "Minimum 8 Maximum 20 characters";
      }
    } else {
      errors.password = "Enter Password";
    }

    setError(errors);

    if (Object.keys(errors).length === 0) {
      try {
        await dispatch(signup(plainData)).unwrap();
        e.target.reset();
        SetIsSubmitting(false);
        navigate("/login");
      } catch (error) {
        if (error.message === "User Already Found") {
          navigate("/login");
        }
        SetIsSubmitting(false);
        console.info(error);
      }
    } else {
      SetIsSubmitting(false);
    }
  };

  return (
    <>
      <form onSubmit={handleFormSubmit} className="signup-form-page">
        <div className="signup-layout">
          <h1>Signup</h1>
          <div className="signup-item">
            <label htmlFor="username">UserName :</label>
            <input type="text" maxLength={25} minLength={3} name="username" />
            {error.username && (
              <p style={{ fontSize: "12px", color: "red" }}>
                {error.username}!
              </p>
            )}
          </div>
          <div className="signup-item">
            <label htmlFor="password">Password :</label>
            <input
              type="password"
              maxLength={15}
              minLength={8}
              name="password"
            />
            {error.password && (
              <p style={{ fontSize: "12px", color: "red" }}>
                {error.password}!
              </p>
            )}
          </div>
          <div>
            <Link to="/login">
              <button>Go to Signin Page</button>
            </Link>
            <button type="submit" disabled={isSubmitting}>
              {" "}
              {isSubmitting ? "submitting" : "signup"}
            </button>
          </div>
        </div>
      </form>
    </>
  );
}

/* Validation using Zod + react-hook-form */
/* import {z} from "zod";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod"

const signupSchema = z.object({
    username : z.string().min(3,"Minimum 3 characters").max(25,"Maximum 25 characters"),
    password : z.string().min(8,"Minimum 8 characters").max(15,"Maximum 15 characters").regex(/[a-z]/,"Minimum 1 small character").regex(/[A-Z]/,"Minimum 1 Capital Letter").regex(/[0-9]/,"Minimum 1 Numeric Value").regex(/[^a-zA-Z0-9]/,"Minimum 1 special character")
  });

export default function SignupPage() {

  const {register,handleSubmit,formState:{errors,isSubmitting},} = useForm({
    resolver:zodResolver(signupSchema),
    mode:"onChange",
  });
  const dispatch = useDispatch();

  const onSubmit = async (data)=>{
    console.info("safe & valid : ",data);

    const res = await dispatch(signup(data)).unwrap();
    console.info("promise res : ",res)
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label htmlFor="username">UserName :</label>
        <input {...register("username")} autoComplete="on"  />
        {errors.username && <p>{errors.username.message}</p> }
      </div>
      <div>
        <label htmlFor="password">Password :</label>
        <input {...register("password")} type="password"  />
        {errors.password && <p>{errors.password.message}</p> }
      </div>
      <button disabled={isSubmitting} type="submit">{isSubmitting ? "Submitting" : "login"}</button>
    </form>
  )
}
 */
