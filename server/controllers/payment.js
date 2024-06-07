import stripe from "stripe";

const stripeClient = stripe(
  "sk_test_51P50btSFd3O36VLzmJUa4V2xFcjbF3G5Et70qXLnUieZTXUMsNNXghimvmbWxqN99NTL9vYFedQIimuAx86MOIwf00G8TB8tm3"
);

export const makePayment = async (req, res) => {
  try {
    const session = await stripeClient.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          price: "price_1P9lCkSFd3O36VLzJyraEsTY", // Replace with your actual price ID
          quantity: 1,
        },
      ],
      mode: "payment",
      success_url: "http://localhost:3000/success",
      cancel_url: "http://localhost:3000/cancel",
    });
    res.json({ id: session.id });
  } catch (error) {
    console.error("Error creating checkout session:", error);
    res.status(500).json({ error: "Error creating checkout session" });
  }
};
