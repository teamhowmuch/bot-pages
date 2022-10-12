import {
  FontAwesomeIcon,
  FontAwesomeIconProps,
} from "@fortawesome/react-fontawesome";
import { IconDefinition, IconName } from "@fortawesome/fontawesome-svg-core";

type IconProps = {
  size?: FontAwesomeIconProps["size"];
  icon: IconDefinition;
  spin?: boolean;
};

export function Icon({ icon, size, spin }: IconProps) {
  return <FontAwesomeIcon icon={icon} size={size} spin={spin} />;
}
