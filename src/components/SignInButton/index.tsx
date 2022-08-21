import styles from "./styles.module.scss";
import { FaGoogle } from "react-icons/fa";
import { FiX } from "react-icons/fi";
import { signIn, signOut, useSession } from "next-auth/react";

export function SignInButton() {
  const { data: session } = useSession();

  return session ? (
    <button type="button" className={styles.signInButton}>
      <FaGoogle color="#00FF00" />
      {session.user.name}
      <FiX color="#737380" className={styles.closeIcon} onClick={() => signOut()} />
    </button>
  ) : (
    <button type="button" className={styles.signInButton} onClick={() => signIn("google")}>
      <FaGoogle color="#eba417" />
      Sign In with Google
    </button>
  );
}
