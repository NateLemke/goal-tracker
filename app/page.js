"use client";
import Image from "next/image";
import { useState } from "react";
import { useAuth } from "./context/AuthContext";
import { useRouter } from "next/navigation";
import { FaCheckCircle } from "react-icons/fa";

export default function Home() {

  const router = useRouter();

  const[email, setEmail] = useState(null);
  const[password, setPassword] = useState(null);
  const[loggingIn, setLoggingIn] = useState(true);
  const[errorMessage, setErrorMessage] = useState(null);

  const {currentUser, signIn, signUp} = useAuth();

  async function submitHandler() {
    if(!email || !password) {
      setErrorMessage("You must enter email and Password")
    }
    else if(loggingIn) {
      try{
        await signIn(email, password);
        router.push("/mainPage");
      } catch (error) {
        console.log(error)
        setErrorMessage("Invalid Login")
      }
    }
    else{
      try{
        await signUp(email, password);
        router.push("/mainPage");
      } catch (error) {
        console.log(error)
        setErrorMessage("Failed to Signup")
      }
    } 
  }

  async function guestLogin() {
    try{
      await signIn("Guest@user.com", "Password");
      router.push("/mainPage");
    } catch (error) {
      console.log(error)
      setErrorMessage("Failed to Login")
    }
  }

  function toggleLogin() {
    setLoggingIn(cur => !cur);
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <div className="flex flex-row text-3xl absolute top-10">
        <h1 className="mb-2 uppercase top-7">Goal Tracker</h1><FaCheckCircle className="ml-2"/>
      </div>
      <div className="bg-gray-700 flex flex-1 w-full max-w-md flex-col p-5 justify-center items-center rounded-lg min-w-72">
        <h2 className="mb-2 text-2xl uppercase">{loggingIn? "Login": "Register"}</h2>
        <h3 className="text-red-500">{errorMessage}</h3>
        <input type="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)}
        className="outline-none m-1 rounded-md text-black w-full max-w-sm p-1"/>
        <input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)}
        className="outline-none m-1 rounded-md text-black w-full max-w-sm  p-1 mb-5"/>
        <button className="border-2 border-green-700 border-solid rounded-md w-full max-w-sm py-1 
        duration-300 hover:bg-green-600 m-1"
        onClick={submitHandler}>
          <h2 className="text-lg">{loggingIn? "Sign In": "Sign Up"}</h2>
        </button>
        {loggingIn && <button className="border-2 border-yellow-700 border-solid rounded-md w-full max-w-sm py-1 
        duration-300 hover:bg-yellow-600 m-1"
        onClick={toggleLogin}>
          <h2 className="text-lg">Register</h2>
        </button>}
        {!loggingIn && <button className="border-2 border-red-700 border-solid rounded-md w-full max-w-sm py-1 
        duration-300 hover:bg-red-600 m-1"
        onClick={toggleLogin}>
          <h2 className="text-lg">Back to Sign In</h2>
        </button>}
        {loggingIn && <button className="border-2 border-blue-700 border-solid rounded-md w-full max-w-sm py-1 
        duration-300 hover:bg-blue-600 m-1"
        onClick={guestLogin}>
          <h2 className="text-lg">Sign In As Guest</h2>
        </button>}
      </div>
    </main>
  );
}
