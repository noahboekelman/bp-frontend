import { useRouter } from "next/navigation";
import { useCart } from "@/context/CartContext";
import { IntentAction } from "@/context/AuthContext";
import { products } from "@/data/products";

export function useIntentReplay() {
  const router = useRouter();
  const { addToCart } = useCart();

  const executeIntent = (intent: IntentAction | null) => {
    if (!intent) {
      router.push("/");
      return;
    }

    switch (intent.type) {
      case "add_to_cart": {
        // Find the product and add it to cart
        const product = products.find((p) => p.id === intent.productId);
        if (product) {
          addToCart(product);
        }
        // Navigate back to the product page
        router.push(`/pieces/${intent.productId}`);
        break;
      }
      case "favorite": {
        // Navigate back to the product page
        // In the future, favorite logic would be executed here
        router.push(`/pieces/${intent.productId}`);
        break;
      }
      case "visit_profile": {
        router.push("/profile");
        break;
      }
      case "upload_piece": {
        router.push("/upload");
        break;
      }
      case "message_seller": {
        router.push(`/messages/${intent.sellerId}`);
        break;
      }
      default: {
        router.push("/");
      }
    }
  };

  return { executeIntent };
}
