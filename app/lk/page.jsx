"use client"

import { css } from "@emotion/css";
import { Container, container, lkContainer} from "@/styles/ui";
import { useEffect } from "react";
import UserMain from "./main/page";
import LkMenu from "@/components/ui/LkMenu";

const User = () => {

    useEffect(()=>{
        // setIsLogin(true);
		//TODO Добавить логирование в стейт
    });

    return (
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
    );
}

export default User;