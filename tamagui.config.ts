import { createAnimations } from "@tamagui/animations-moti";
import { defaultConfig } from "@tamagui/config/v4";
import { createTamagui } from "tamagui";

const animations = createAnimations({
  fast: {
    type: "spring",
    damping: 20,
    mass: 1.2,
    stiffness: 250,
  },
  medium: {
    type: "spring",
    damping: 10,
    mass: 0.9,
    stiffness: 100,
  },
  slow: {
    type: "spring",
    damping: 20,
    stiffness: 60,
  },
});

export const config = createTamagui({
  ...defaultConfig,
  animations,
});

export default config;

export type Conf = typeof config;

declare module "tamagui" {
  interface TamaguiCustomConfig extends Conf {}
}
