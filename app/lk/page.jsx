"use client"

import { css } from "@emotion/css";
import { Container, lkContainer} from "@/styles/ui";
import { useEffect } from "react";
import LkMenu from "@/components/ui/LkMenu";
import { useRouter } from "next/navigation";
import UserMainScreen from "./main/page";
import { useAuthReady } from "@/hooks/useAuthReady";
import { useAuthStore } from "@/store/useAuthStore";

const User = () => {
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

	// Пока не гидратировано — можно показать спиннер или пусто
	if (!token) return null;
	//TODO доделать и на другие страницы, если потребуется

    return (
		<>
        <div className={lkContainer}>
            <Container>
                <div
                    className={css`
                    display: flex;
                    gap: 64px;
                `}>
                    <LkMenu />
					<UserMainScreen />
                </div>
				<div>TEST CALLBACK MODAL</div>
            </Container>
        </div>
		</>
    );
}

export default User;