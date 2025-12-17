"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuthReady } from "@/hooks/useAuthReady";
import { useAuthStore } from "@/store/useAuthStore";

export default function LkLayout({ children }) {
	const router = useRouter();
	const { token } = useAuthReady();
	const hasHydrated = useAuthStore((state) => state.hasHydrated); // отдельно для наглядности

	useEffect(() => {
		// Пока Zustand ещё не подгрузил состояние — ничего не делаем
		if (!hasHydrated) return;

		// После загрузки: если токена нет — редиректим
		if (!token) {
		router.replace('/');
		}
	}, [hasHydrated, token]);

  	if (!hasHydrated) return null; // можно спиннер
	// Пока не гидратировано — можно показать спиннер или пусто
	if (!token) return null;

  return <>
	{children}
  </>;
}