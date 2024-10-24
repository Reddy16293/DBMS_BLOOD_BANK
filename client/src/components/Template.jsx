import React from "react";
import SignupForm from "./SignupForm"; // Ensure you have this for registration
import LoginForm from "./LoginForm";
import { FcGoogle } from "react-icons/fc";
import Spinner from "../pages/Spinner"; // Import Spinner

const Template = ({
  title,
  desc1,
  desc2,
  image,
  formtype,
  setIsLoggedIn,
  formdata,
  ChangeHandler,
  submitHandler,
  loading, // Accept loading prop
}) => {
  return (
    <div className="flex flex-col lg:flex-row justify-between items-center w-11/12 max-w-[1160px] py-12 mx-auto gap-x-10 gap-y-10 lg:gap-y-0">
      <div className="w-full lg:w-1/2 max-w-[450px]">
        <h1 className="text-3xl font-bold text-white mb-4">{title}!</h1>
        <p className="text-white mb-6">
          <span>{desc1}</span>
          <br />
          <span>{desc2}</span>
        </p>
        {loading ? (
          <Spinner /> // Show spinner if loading
        ) : formtype === "signup" ? (
          <SignupForm
            setIsLoggedIn={setIsLoggedIn}
            formdata={formdata}
            ChangeHandler={ChangeHandler}
            submitHandler={submitHandler}
          />
        ) : (
          <LoginForm
            setIsLoggedIn={setIsLoggedIn}
            formdata={formdata}
            ChangeHandler={ChangeHandler}
            submitHandler={submitHandler}
            loading={loading} // Pass loading to LoginForm
          />
        )}
        <div className="flex w-full items-center my-4 gap-x-2">
          <div className="w-full h-[1px] bg-teal-300"></div>
          <p className="text-white">OR</p>
          <div className="w-full h-[1px] bg-teal-300"></div>
        </div>
        <button className="bg-teal-300 flex justify-center items-center font-semibold rounded hover:bg-green-300 py-2 px-4 w-full border border-pink-400">
          <FcGoogle className="mr-2" />
          Sign In/Up with Google
        </button>
      </div>
      <div className="w-full lg:w-1/2 hidden lg:block">
        <img src={image} alt="sign/signup" className="max-w-full h-auto rounded-lg shadow-lg" />
      </div>
    </div>
  );
};

export default Template;
