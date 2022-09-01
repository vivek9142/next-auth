import { useState, useRef } from "react";
import { signIn } from "next-auth/client";

import classes from "./auth-form.module.css";
async function createUser(email, password) {
  const response = await fetch("/api/auth/signup", {
    method: "POST",
    body: JSON.stringify({ email, password }),
    headers: {
      "Content-Type": "application/json",
    },
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Something went wrong!");
  }

  return data;
}

function AuthForm() {
  const EmailRef = useRef();
  const PasswordRef = useRef();

  const [isLogin, setIsLogin] = useState(true);

  function switchAuthModeHandler() {
    setIsLogin((prevState) => !prevState);
  }

  async function submitHandler(event) {
    event.preventDefault();

    const emailValue = EmailRef.current.value;
    const passwordValue = PasswordRef.current.value;

    if (isLogin) {
      //log user in
      const result = await signIn("credentials", {
        redirect: false,
        email: emailValue,
        password: passwordValue,
      });
      console.log(result);

      if (!result.error) {
        //set some auth state
      }
    } else {
      try {
        const result = await createUser(emailValue, passwordValue);
        console.log(result);
      } catch (err) {
        console.log(err);
      }
    }
  }

  return (
    <section className={classes.auth}>
      <h1>{isLogin ? "Login" : "Sign Up"}</h1>
      <form onSubmit={submitHandler}>
        <div className={classes.control}>
          <label htmlFor="email">Your Email</label>
          <input type="email" ref={EmailRef} id="email" required />
        </div>
        <div className={classes.control}>
          <label htmlFor="password">Your Password</label>
          <input type="password" ref={PasswordRef} id="password" required />
        </div>
        <div className={classes.actions}>
          <button>{isLogin ? "Login" : "Create Account"}</button>
          <button
            type="button"
            className={classes.toggle}
            onClick={switchAuthModeHandler}
          >
            {isLogin ? "Create new account" : "Login with existing account"}
          </button>
        </div>
      </form>
    </section>
  );
}

export default AuthForm;
