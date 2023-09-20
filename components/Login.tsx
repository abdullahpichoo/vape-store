"use client";

import { signIn, signOut } from "next-auth/react";

const Login = () => {
  const login = async () => {
    const result = await signIn("credentials", {
      email: "asdasd",
      password: "asdasda",
      redirect: false,
    });
    console.log("Result", result);

    if (result?.error) {
      alert(result.error);
    } else {
      window.location.replace("/");
    }
  };

  return (
    <div className="btns flex justify-center">
      <button onClick={() => login()}>Sign In</button>
      <button onClick={() => signOut()}>Sign Out</button>
    </div>
  );
};

export default Login;
