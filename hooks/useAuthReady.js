import { useAuthStore } from "@/store/useAuthStore";

export const useAuthReady = () => {
  const token = useAuthStore((state) => state.token);
  const hasHydrated = useAuthStore((state) => state.hasHydrated);

  const isAuthenticated = !!token;
  const ready = hasHydrated && isAuthenticated;

  return { ready, token };
};