import { useState } from "react";
import { Card, Props as CardProps } from "./Card";
import { Button } from "./Button";
import { faTimes } from "@fortawesome/free-solid-svg-icons";

type Props = CardProps & {};

export function CardDismissable({ children, ...rest }: Props) {
  const [isDismissed, setDismissed] = useState(false);

  function onClickDismiss() {
    setDismissed(true);
  }

  if (isDismissed) {
    return null;
  }

  return (
    <Card {...rest}>
      <div className="flex justify-end items-center">
        <div className="flex-1">{children}</div>
        <div className="flex-0">
          <Button
            onClick={() => onClickDismiss()}
            iconLeft={faTimes}
            size="sm"
            mode="default"
            variant="passthrough"
          />
        </div>
      </div>
    </Card>
  );
}
