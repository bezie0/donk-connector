import { Ref, RefObject, useEffect } from "react";

export const useClickOutside = (
  insideRefs: RefObject<HTMLElement>[],
  isVisible: boolean,
  onClose: () => void
) => {
  useEffect(() => {
    const handleWindowClick = (event: any) => {
      const someRefContainTarget = insideRefs
        .filter((ref) => ref.current)
        .some((ref) => ref.current?.contains(event.target));

      if (someRefContainTarget) {
        return;
      }

      if (!isVisible) {
        return;
      }

      if (onClose) {
        onClose();
      }
    };

    if (isVisible) {
      window.addEventListener("click", handleWindowClick);
    }

    return () => {
      if (isVisible) {
        window.removeEventListener("click", handleWindowClick);
      }
    };
  }, [isVisible, onClose]);
};
