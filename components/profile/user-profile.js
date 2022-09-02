// import { useSession, getSession } from "next-auth/client";
// import { useState, useEffect } from "react";

import ProfileForm from "./profile-form";
import classes from "./user-profile.module.css";

function UserProfile() {
  // Redirect away if NOT auth
  // const [session, loading] = useSession();

  // const [isLoading, setIsLoading] = useState(true);
  // const [loadedSession, setLoadingSession] = useState();

  // useEffect(() => {
  //   getSession().then((session) => {
  //     if (!session) {
  //       window.location.href = "/auth";
  //     } else {
  //       setIsLoading(false);
  //     }
  //   });
  // }, []);

  //using useSession will load the component endlessely
  //so we're doing workaround with getSession
  // if (isLoading) {
  //   return <p className={classes.profile}>Loading...</p>;
  // }

  async function changePasswordHandler(passwordData) {
    const response = await fetch("/api/user/change-password", {
      method: "PATCH",
      body: JSON.stringify(passwordData),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await response.json();
    console.log(data);
  }

  return (
    <section className={classes.profile}>
      <h1>Your User Profile</h1>
      <ProfileForm onChangePassword={changePasswordHandler} />
    </section>
  );
}

export default UserProfile;
