import { signIn, useSession } from "next-auth/react";
import { api } from "../../services/api";
import styles from "./styles.module.scss";
import { getStripeJs } from "../../services/stripe-js";

interface SubscribeButtonProps {
  priceId: string;
}

export function SubscribeButton({ priceId }: SubscribeButtonProps) {
  const { data: session } = useSession();

  async function handleSubscribe() {
    if (!session) {
      signIn("google");
      return;
    }

    const response = await api.post("/subscribe", { user: session.user });

    const { sessionId } = response.data;

    const stripe = await getStripeJs();

    await stripe.redirectToCheckout({
      sessionId: sessionId,
    });
  }

  return (
    <button type="button" className={styles.subscribeNowButton} onClick={handleSubscribe}>
      Subscribe now
    </button>
  );
}
