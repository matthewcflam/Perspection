import { Button } from "@heroui/react";
import { Icon } from "@iconify/react";
import { glassButton } from "./styles";

export default function InstagramButton({ onPress }) {
  return (
    <Button onPress={onPress} className={glassButton} size="lg">
      <Icon icon="ph:instagram-logo-fill" className="text-xl" />
      Continue with Instagram
    </Button>
  );
}
