import { motion } from 'framer-motion';
import { css, cx } from "@emotion/css";
import Link from "next/link";
import { useTheme } from "@emotion/react";
import { usePathname } from "next/navigation";
import UserIcon from "@/public/images/svg/user.svg";
import EventsIcon from "@/public/images/svg/events.svg";
import OrgIcon from "@/public/images/svg/people.svg";
import CartIcon from "@/public/images/svg/cart.svg";
import ExitIcon from "@/public/images/svg/exit.svg";
import EditIcon from "@/public/images/svg/edit.svg";
import StatusIcon from "@/public/images/svg/status.svg";
import Exclamation from "@/public/images/svg/exclamation_mark.svg";
import { useAuthStore } from "@/store/useAuthStore";
import { useEffect } from "react";
import { useWindowSize } from "@/hooks/useWindowSize";

//TODO переделать эту часть с меню в ЛК, чтобы он не был на каждой странице отдельно

export default function LkMenu () {
	const logout = useAuthStore((state) => state.logout);
	const { width } = useWindowSize();
	const pathname = usePathname();
	const theme = useTheme();

	useEffect(()=>{
		console.log('WIDTH', width)
	}, [width])

	const menuItem = css`
        padding: 12px;
        display: flex;
        gap: 16px;
        align-items: center;
        cursor: pointer;
        border-radius: 18px;
        transition: ${theme.transition};

        @media(max-width: 1023px) {
            flex-direction: column;
            gap: 8px;
            font-size: 14px;
            text-align: center;
            flex: 0 1 calc(25% - 6px);
            max-width: calc(25% - 6px);
        }
        @media(max-width: 767px) {
            flex: 0 1 48px;
            max-width: 48px;
            border-radius: 100%;
            justify-content: center;
            padding: 0;
        }

        &:hover {
            background-color: #F5F7FA;
        }
		@media(max-width: 767px) {
            background-color: transparent;
        }

        & > svg {
            @media(max-width: 767px) {
                padding: 12px;
                width: 48px;
                height: 48px;
                border-radius: 100%;
            }
        }

        & > p {
            line-height: 1.28;

            @media(max-width: 767px) {
                font-size: 9px;
            }
			@media(max-width: 575px) {
				display: none;
			}
        }
        
    `;

    const activeMenuItem = css`
        background-color: #F5F7FA;

		@media(max-width: 767px) {
			svg {
            	background-color: #F5F7FA;
			}
        }
    `;
	if (width === null) return null
	return (
		<>
		{width > 1023 ?
		<div className={css`
			flex: 0 1 296px;
                        max-width: 296px;
		height: max-content;
                        position: sticky;
                        top: 100px;
						`}>
                    <motion.div className={css`
                        padding: 8px;
                        display: flex;
                        flex-direction: column;
                        gap: 8px;
                        border-radius: 28px;
                        background-color: #fff;
                        box-shadow: 0px 196px 55px 0px rgba(0, 0, 0, 0.00), 0px 125px 50px 0px rgba(0, 0, 0, 0.01), 0px 71px 42px 0px rgba(0, 0, 0, 0.02), 0px 31px 31px 0px rgba(0, 0, 0, 0.03), 0px 8px 17px 0px rgba(0, 0, 0, 0.04);
                        min-height: 368px;
                    `}
                    // initial={{ opacity: 0, x: 100 }}
                    // animate={{ opacity: 1, x: 0 }} 
					// exit={{ opacity: 1, x: 100}}
                    // transition={{ duration: .3 }}
					>
                        <div className={css`
                            display: flex;
                            flex-direction: column;
                            gap: 8px;
                            border-bottom: 1px solid #D7DADD;
                            margin-bottom: 8px;
                            padding-bottom: 8px;
                        `}>
                            <Link  href="/lk" className={cx(menuItem, pathname === '/lk' && activeMenuItem)}>
                                <UserIcon />
                                <p>Профиль</p>
                            </Link>
                            <Link  href="/cabinet/events" className={cx(menuItem, pathname === '/cabinet/events' && activeMenuItem)}>
                                <EventsIcon />
                                <p>Мероприятия</p>
                            </Link>
                            <Link  href="/cabinet/org" className={cx(menuItem, pathname === '/cabinet/org' && activeMenuItem)}>
                                <OrgIcon />
                                <p>Организаторы</p>
                            </Link>
                            <Link  href="/cabinet/orders" className={cx(menuItem, pathname === '/cabinet/orders' && activeMenuItem)}>
                                <CartIcon />
                                <p>Заказы</p>
                            </Link>
                        </div>
                        {/* <div className={cx(menuItem, css`
                            flex-direction: column;align-items:flex-start;
                            cursor: default;

                            &:hover {
                                background-color: transparent;
                            }
                        `)}>
                            <div className={css`
                                color: #47474D;
                                font-size: 14px;
                                line-height:1.16;
                            `}>Статус профиля:</div>
                            <Link  href="/cabinet/status" className={css`
                                color: ${theme.colors.purple};
                                display: flex;
                                justify-content: space-between;
                                align-items: center;
                                width: 100%;
                            `}>Базовый <EditIcon /></Link>
                        </div> */}
                        <div className={cx(menuItem, css`
                            margin-top: auto;
                        `)} onClick={logout}>
                            <ExitIcon />
                            <p>Выйти</p>
                        </div>

                    </motion.div>

					<div className={css`
						margin-top: 16px;
						border-radius: 28px;
						background: #FFF;
						box-shadow: 0px 196px 55px 0px rgba(0, 0, 0, 0.00), 0px 125px 50px 0px rgba(0, 0, 0, 0.01), 0px 71px 42px 0px rgba(0, 0, 0, 0.02), 0px 31px 31px 0px rgba(0, 0, 0, 0.03), 0px 8px 17px 0px rgba(0, 0, 0, 0.04);
						display: flex;
						gap: 16px;
						padding: 16px;

						svg {
							flex: 0 1 24px;
							max-width: 24px;
						}

						p {
							flex: 1;
							font-size: 14px;
							line-height: 1.16;

							a {
								color: #8553F9;
							}
						}
						`}>
							<Exclamation />
							<p>Для индивидуальных условий по&nbsp;продвижению нескольких событий&nbsp;&mdash; пишите на&nbsp;<a href="mailto:info@goconf.ru" target="_blank">info@goconf.ru</a> или в&nbsp;чат.</p>
						</div>
				</div>
                    :
                    <motion.div 
                    // initial={{ opacity: 0, y: 100 }} //TODO чекнуть почему анимации после обновления не работают
                    // animate={{ opacity: 1, y: 0 }} 
                    // transition={{ duration: .3 }}
                    className={css`
                        position: fixed;
                        bottom: 24px;
                        width: calc(100vw - 64px);
                        left: 32px;
                        background-color: #fff;
                        border-radius: 28px;
                        box-shadow: 0px 196px 55px 0px rgba(0, 0, 0, 0.00), 0px 125px 50px 0px rgba(0, 0, 0, 0.01), 0px 71px 42px 0px rgba(0, 0, 0, 0.02), 0px 31px 31px 0px rgba(0, 0, 0, 0.03), 0px 8px 17px 0px rgba(0, 0, 0, 0.04);
                        z-index: 1;
                        padding: 8px;
                        display: flex;
                        justify-content: space-between;

                        @media(max-width: 767px) {
                            left: 0;
                            bottom: 0;
                            width: 100vw;
                            border-radius: 0;
                            padding: 8px 24px;
                        }
                    `}>
                        <Link  href="/cabinet" className={cx(menuItem, pathname === '/lk' && activeMenuItem)}>
                            <UserIcon />
                            <p>Профиль</p>
                        </Link>
                        <Link  href="/cabinet/events" className={cx(menuItem, pathname === '/cabinet/events' && activeMenuItem)}>
                            <EventsIcon />
                            <p>Мероприятия</p>
                        </Link>
                        <Link  href="/cabinet/org" className={cx(menuItem, pathname === '/cabinet/org' && activeMenuItem)}>
                            <OrgIcon />
                            <p>Организаторы</p>
                        </Link>
                        <Link  href="/cabinet/orders" className={cx(menuItem, pathname === '/cabinet/orders' && activeMenuItem)}>
                            <CartIcon />
                            <p>Заказы</p>
                        </Link>
                        {/* <Link  href="/cabinet/status" className={cx(menuItem, pathname === '/cabinet/status' && activeMenuItem)}>
                            <StatusIcon />
                            <p>Статус</p>
                        </Link> */}
                    </motion.div>
                    }
		</>
	)
}