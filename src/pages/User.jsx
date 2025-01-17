import { css, cx } from "@emotion/css";
import { container} from "./ui";
import { useEffect } from "react";
import { useTheme } from "@emotion/react";
import { ReactComponent as UserIcon } from '../images/svg/user.svg';
import { ReactComponent as EventsIcon } from '../images/svg/events.svg';
import { ReactComponent as OrgIcon } from '../images/svg/people.svg';
import { ReactComponent as CartIcon } from '../images/svg/cart.svg';
import { ReactComponent as ExitIcon } from '../images/svg/exit.svg';
import { ReactComponent as EditIcon } from '../images/svg/edit.svg';
import { NavLink, useLocation } from "react-router";
import { motion } from 'framer-motion';
import { UserMain } from "./UserMain";
import { UserEvents } from "./UserEvents";
import { UserOrg } from "./UserOrg";
import { UserAdd } from "./UserAdd";
import { UserNotifications } from "./UserNotifications";
import { UserOrders } from "./UserOrders";
import { UserStatus } from "./UserStatus";

export const User = ({page, setIsLogin, windowWidth}) => {
    const theme = useTheme();
    const location = useLocation();
    const isActive = (path) => location.pathname === path;

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
        }

        &:hover {
            background-color: #F5F7FA;
        }

        & > p {
            line-height: 1.28;

            @media(max-width: 767px) {
                display: none;
            }
        }
        
    `;

    const activeMenuItem = css`
        background-color: #F5F7FA;
    `;

    useEffect(()=>{
        setIsLogin(true);
    });

    return (
        <div className={css`
            padding: 120px 0;
            background-color: #F5F7FA;

            @media(max-width: 575px) {
                padding-bottom: 64px;
            }
        `}>
            <div className={container}>
                <div
                    className={css`
                    display: flex;
                    gap: 64px;
                `}>
                    {windowWidth > 1023 ?
                    <motion.div className={css`
                        flex: 0 1 296px;
                        max-width: 296px;
                        padding: 8px;
                        display: flex;
                        flex-direction: column;
                        gap: 8px;
                        border-radius: 28px;
                        background-color: #fff;
                        box-shadow: 0px 196px 55px 0px rgba(0, 0, 0, 0.00), 0px 125px 50px 0px rgba(0, 0, 0, 0.01), 0px 71px 42px 0px rgba(0, 0, 0, 0.02), 0px 31px 31px 0px rgba(0, 0, 0, 0.03), 0px 8px 17px 0px rgba(0, 0, 0, 0.04);
                        min-height: 448px;
                        height: max-content;
                        position: sticky;
                        top: 100px;
                    `}
                    initial={{ opacity: 0, x: 100 }}
                    animate={{ opacity: 1, x: 0 }} 
                    transition={{ duration: .3 }}>
                        <div className={css`
                            display: flex;
                            flex-direction: column;
                            gap: 8px;
                            border-bottom: 1px solid #D7DADD;
                            margin-bottom: 8px;
                            padding-bottom: 8px;
                        `}>
                            <NavLink to='/lk' className={cx(menuItem, isActive('/lk') && activeMenuItem)}>
                                <UserIcon />
                                <p>Мой профиль</p>
                            </NavLink>
                            <NavLink to='/lk/events' className={cx(menuItem, isActive('/lk/events') && activeMenuItem)}>
                                <EventsIcon />
                                <p>Мои мероприятия</p>
                            </NavLink>
                            <NavLink to='/lk/org' className={cx(menuItem, isActive('/lk/org') && activeMenuItem)}>
                                <OrgIcon />
                                <p>Организаторы</p>
                            </NavLink>
                            <NavLink to='/lk/orders' className={cx(menuItem, isActive('/lk/orders') && activeMenuItem)}>
                                <CartIcon />
                                <p>Заказы</p>
                            </NavLink>
                        </div>
                        <div className={cx(menuItem, css`
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
                            <NavLink to="/lk/status" className={css`
                                color: ${theme.colors.purple};
                                display: flex;
                                justify-content: space-between;
                                align-items: center;
                                width: 100%;
                            `}>Базовый <EditIcon /></NavLink>
                        </div>
                        <div className={cx(menuItem, css`
                            margin-top: auto;
                        `)}>
                            <ExitIcon />
                            <p>Выйти</p>
                        </div>

                    </motion.div>
                    :
                    <motion.div 
                    initial={{ opacity: 0, y: 100 }}
                    animate={{ opacity: 1, y: 0 }} 
                    transition={{ duration: .3 }}
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
                            padding: 8px 48px;
                        }
                    `}>
                        <NavLink to='/lk' className={cx(menuItem, isActive('/lk') && activeMenuItem)}>
                            <UserIcon />
                            <p>Мой профиль</p>
                        </NavLink>
                        <NavLink to='/lk/events' className={cx(menuItem, isActive('/lk/events') && activeMenuItem)}>
                            <EventsIcon />
                            <p>Мои мероприятия</p>
                        </NavLink>
                        <NavLink to='/lk/org' className={cx(menuItem, isActive('/lk/org') && activeMenuItem)}>
                            <OrgIcon />
                            <p>Организаторы</p>
                        </NavLink>
                        <NavLink to='/lk/orders' className={cx(menuItem, isActive('/lk/orders') && activeMenuItem)}>
                            <CartIcon />
                            <p>Заказы</p>
                        </NavLink>
                    </motion.div>
                    }
                    {page === 1 && <UserMain />}
                    {page === 2 && <UserEvents />}
                    {page === 3 && <UserOrg />}
                    {page === 4 && <UserAdd />}
                    {page === 5 && <UserNotifications />}
                    {page === 6 && <UserOrders />}
                    {page === 7 && <UserStatus />}
                </div>
            </div>
        </div>
    );
}