'use client'

import { css } from "@emotion/css";
import { Button, container } from "@/styles/ui";
import Img404 from "@/public/images/svg/404.svg";
import { MainEvents } from "@/components/MainEvents";


export default function NotFoundPage() {

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

                        @media(max-width: 799px) {
                            flex-direction: column;
                            text-align: center;            
                        }
                    `}>
                        <div className={css`
                            flex: 1;
                        `}>
                            <div className={css`
                                font-family: Impact;
                                font-size: 104px;
                                line-height: 1.1;
                                margin-bottom: 90px;

                                @media(max-width: 1023px) {
                                    font-size: 80px;
                                }
                                @media(max-width: 991px) {
                                    font-size: 60px;
                                    margin-bottom: 24px;
                                }
                                @media(max-width: 575px) {
                                    font-size: 40px;
                                }
                            `}>(｡•́︿•̀｡) 404</div>
                            <div className={css`
                                font-size: 24px;
                                font-weight: 500;
                                line-height: 1.34;
                                margin-bottom: 8px;

                                @media(max-width: 575px) {
                                    font-size: 18px;
                                }
                            `}>Страница не найдена</div>
                            <div className={css`
                                font-size: 20px;
                                line-height: 1.4;
                                margin-bottom: 24px;

                                @media(max-width: 575px) {
                                    font-size: 16px;
                                }
                            `}>К сожалению мы ничего не нашли по вашему запросу</div>
                            <Button className={css`
                                @media(max-width: 799px) {
                                    margin: 0 auto;
                                }
                            `}>На главную</Button>
                        </div>
                        <div className={css`
                            flex: 0 1 440px;
                            max-width: 440px;

                            @media(max-width: 460px) {
                                flex: 0 1 100%;
                                max-width: 100%;

                                svg {
                                    width: 100%;
                                    height: auto;
                                }
                            }
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