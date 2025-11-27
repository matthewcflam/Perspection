import { Button } from "@heroui/react";
import { glassButton } from "./styles";

export default function OpenDashboardButton({ onOpen }) {
  return (
    <Button onPress={onOpen} className={glassButton} size="lg">
      See Your Statistics!
    </Button>
  );
}
