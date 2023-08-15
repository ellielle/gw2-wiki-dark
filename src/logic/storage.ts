import type { RemovableRef } from "@vueuse/core";
import { useStorageLocal } from "~/composables/useStorageLocal";

export type ColorModeType = "dark" | "light";
export const colorMode: RemovableRef<ColorModeType> = useStorageLocal("color-mode", "dark");
