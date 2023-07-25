import { useStorageLocal } from "~/composables/useStorageLocal";

export const isDark = useStorageLocal("is-dark", false);
