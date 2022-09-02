import { useRef } from "react";
import classes from "./profile-form.module.css";

function ProfileForm(props) {
  const oldPassRef = useRef();
  const newPassRef = useRef();

  function submitHandler(event) {
    event.preventDefault();

    const enteredOldPassword = oldPassRef.current.value;
    const enteredNewPassword = newPassRef.current.value;

    props.onChangePassword({
      oldPassword: enteredOldPassword,
      newPassword: enteredNewPassword,
    });
  }

  return (
    <form onSubmit={submitHandler} className={classes.form}>
      <div className={classes.control}>
        <label htmlFor="new-password">New Password</label>
        <input type="password" ref={newPassRef} id="new-password" />
      </div>
      <div className={classes.control}>
        <label htmlFor="old-password">Old Password</label>
        <input type="password" ref={oldPassRef} id="old-password" />
      </div>
      <div className={classes.action}>
        <button>Change Password</button>
      </div>
    </form>
  );
}

export default ProfileForm;
