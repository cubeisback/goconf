"use client"

import { css } from "@emotion/css";
import { Container, lkContainer} from "@/styles/ui";
import { useEffect } from "react";
import UserMain from "./main/page";
import LkMenu from "@/components/ui/LkMenu";
import { useAuthStore } from "@/store/useAuthStore";
import { useRouter } from "next/navigation";

const User = () => {
	const router = useRouter();
  	const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

    useEffect(() => {
		if (!isAuthenticated) {
			router.replace('/');
		} //TODO Доделать для всех разделов приватных страниц и личного кабинета
	}, [isAuthenticated]);

    return (
		<>
      	{isAuthenticated && (
        <div className={lkContainer}>
            <Container>
                <div
                    className={css`
                    display: flex;
                    gap: 64px;
                `}>
                    <LkMenu />
					<UserMain />
                </div>
            </Container>
        </div>
		)}
		</>
    );
}

export default User;