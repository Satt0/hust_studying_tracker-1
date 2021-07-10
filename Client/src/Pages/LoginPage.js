import React, { useState } from "react";
import styles from "Assets/Scss/Page/LoginPage.module.scss";
import { TextField, Button } from "@material-ui/core";
export default function LoginPage() {
  const [hasAccount, setHasAccount] = useState(true);
  return (
    <div className={styles.container}>
      <form
        onSubmit={() => {
          alert("ok");
        }}
        className={styles.form}
      >
        <TextField required label="username" id="username" type="text" />
        <TextField required id="password" type="text" label="password" />
        {!hasAccount && (
          <TextField
            required
            label="re-password"
            id="re-password"
            type="text"
          />
        )}
        <Button type="submit" color="primary" variant="outlined">
          {hasAccount ? "Login" : "Register"}
        </Button>
        <p>or</p>
        <Button
          onClick={() => {
            setHasAccount((s) => !s);
          }}
          color="secondary"
          variant="outlined"
        >
          {!hasAccount ? "Login" : "Register"}
        </Button>
      </form>
    </div>
  );
}
