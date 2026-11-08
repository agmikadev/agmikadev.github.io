import { createContext, useContext } from "react";

export interface SaltoNavigation {
  openSalto: (technology?: string) => void;
}

export const SaltoNavigationContext = createContext<SaltoNavigation | null>(
  null,
);

export function useSaltoNavigation(): SaltoNavigation | null {
  return useContext(SaltoNavigationContext);
}
