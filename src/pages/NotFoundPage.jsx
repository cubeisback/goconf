import { css } from "@emotion/css";
import { Button, container } from "./ui";
import { ReactComponent as Img404 } from '../images/svg/404.svg';
import { MainEvents } from "../components/MainEvents";


export const NotFoundPage = () => {

    return (
        <>
            <div className={css`
                padding: 140px 0 32px;
                background-color: #F5F7FA;
            `}>
                <div className={container}>
                    <div className={css`
                        display: flex;
                        gap: 24px;
                        align-items: center;
                    `}>
                        <div className={css`
                            flex: 1;
                        `}>
                            <div className={css`
                                font-family: Impact;
                                font-size: 104px;
                                line-height: 1.1;
                                margin-bottom: 90px;
                            `}>(｡•́︿•̀｡) 404</div>
                            <div className={css`font-size: 24px; font-weight: 500; line-height: 1.34; margin-bottom: 8px;`}>Страница не найдена</div>
                            <div className={css`font-size: 20px; line-height: 1.4; margin-bottom: 24px;`}>К сожалению мы ничего не нашли по вашему запросу</div>
                            <Button>На главную</Button>
                        </div>
                        <div className={css`
                            flex: 0 1 440px;
                            max-width: 440px;
                        `}>
                            <Img404 />
                        </div>
                    </div>
                    
                </div>
            </div>
            
            <MainEvents />
        </>
    )
}