import { Button } from "@heroui/react";
import { Icon } from "@iconify/react";
import { glassButton } from "./styles";

export default function GoogleButton({ onPress }) {
  return (
    <Button onPress={onPress} className={glassButton} size="lg">
      <Icon icon="devicon:google" className="text-xl" />
      Sign in with Google
    </Button>
  );
}
