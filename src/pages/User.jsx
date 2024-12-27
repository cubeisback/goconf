import { css, cx } from "@emotion/css";
import { container} from "./ui";
import { useEffect } from "react";
import { useTheme } from "@emotion/react";
import { ReactComponent as UserIcon } from '../images/svg/user.svg';
import { ReactComponent as EventsIcon } from '../images/svg/events.svg';
import { ReactComponent as OrgIcon } from '../images/svg/people.svg';
import { ReactComponent as CartIcon } from '../images/svg/cart.svg';
import { ReactComponent as ExitIcon } from '../images/svg/exit.svg';
import { NavLink, useLocation } from "react-router";
import { motion } from 'framer-motion';
import { UserMain } from "./UserMain";
import { UserEvents } from "./UserEvents";
import { UserOrg } from "./UserOrg";
import { UserAdd } from "./UserAdd";
import { UserNotifications } from "./UserNotifications";

export const User = ({page, setIsLogin}) => {
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

        &:hover {
            background-color: #F5F7FA;
        }

        & > p {
            line-height: 1.28;
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
        `}>
            <div className={container}>
                <div
                    className={css`
                    display: flex;
                    gap: 64px;
                `}>
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
                            <div className={menuItem}>
                                <CartIcon />
                                <p>Заказы</p>
                            </div>
                        </div>
                        <div className={cx(menuItem, css`flex-direction: column;align-items:flex-start;`)}>
                            <div className={css`
                                color: #47474D;
                                font-size: 14px;
                                line-height:1.16;
                            `}>Статус профиля:</div>
                            <div className={css`
                                color: ${theme.colors.purple};
                            `}>Базовый</div>
                        </div>
                        <div className={cx(menuItem, css`
                            margin-top: auto;
                        `)}>
                            <ExitIcon />
                            <p>Выйти</p>
                        </div>

                    </motion.div>
                    {page === 1 && <UserMain />}
                    {page === 2 && <UserEvents />}
                    {page === 3 && <UserOrg />}
                    {page === 4 && <UserAdd />}
                    {page === 5 && <UserNotifications />}
                </div>
            </div>
        </div>
    );
}