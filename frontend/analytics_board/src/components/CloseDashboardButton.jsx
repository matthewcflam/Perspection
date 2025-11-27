import { CloseButton } from "@heroui/react";

export default function CloseDashboardButton({ onClose }) {
  return (
    <CloseButton
      onPress={onClose}
      aria-label="Close dashboard"
      className="
        sticky top-6 left-[calc(100%-3rem)]
        z-30 scale-[2]
        mix-blend-difference
      "
    />
  );
}
