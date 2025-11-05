"use client"

import { css } from "@emotion/css";
import { Container, lkContainer} from "@/styles/ui";
import LkMenu from "@/components/ui/LkMenu";
import UserMainScreen from "./main/page";

const User = () => {

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
				{/* <div>TEST CALLBACK MODAL</div> */}
            </Container>
        </div>
		</>
    );
}

export default User;