import { FC } from "react";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import Button from "@mui/material/Button";

export const LogInButton: FC = () => {
  const auth = getAuth();
  const provider = new GoogleAuthProvider();

  const onLoginClick = () => {
    signInWithPopup(auth, provider);
  };

  return (
    <>
      <Button onClick={onLoginClick} variant="contained">
        Log in
      </Button>
    </>
  );
};
