import React, { useContext } from "react";
import { signInWithGoogle } from "../../services/auth";
import "./style.css";
import { useEffect, useState } from "react";
import { UserContext } from "../../contexts/user";

export default function SignInBtn() {
  const [, setUser] = useContext(UserContext).user;

  const signInBtnClick = async () => {
    let userBySignIn = await signInWithGoogle();
    if (userBySignIn) setUser(userBySignIn);
    console.log(userBySignIn);
  };
  return (
    <div className="signInBtn" onClick={signInBtnClick}>
      <p>Sign In With Google</p>
    </div>
  );
}
