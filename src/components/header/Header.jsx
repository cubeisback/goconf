import { NavLink, useLocation } from "react-router";
import { ReactComponent as Logo } from '../../images/svg/logo.svg';
import { ReactComponent as UserIcon } from '../../images/svg/user.svg';
import { ReactComponent as NotificationIcon } from '../../images/svg/notification.svg';
import { ReactComponent as NotificationImg } from '../../images/svg/notification_img.svg';
import { ReactComponent as SearchIcon } from '../../images/svg/search.svg';
import { ReactComponent as SettingsIcon } from '../../images/svg/settings.svg';
import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from 'framer-motion';
import { Button, DoubleLink } from "../../pages/ui";
import { css } from '@emotion/css';
import { Modal } from "../ui/Modal";
import { useTheme } from "@emotion/react";

export const Header = ({isLogin, windowWidth}) => {
  const location = useLocation();

  const theme = useTheme();

  const [notifications, setNotifications] = useState(false);
  const notificationsRef = useRef(null);
  const iconRef = useRef(null);

  const [searchOpened, setSearchOpened] = useState(false);
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (notificationsRef.current && !notificationsRef.current.contains(event.target) &&
          iconRef.current && !iconRef.current.contains(event.target)) {
        setNotifications(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const toggleNotifications = () => {
    setNotifications(prev => !prev);
  };

  //burger menu
  const [burger, setBurger] = useState(false);

  return (
    <>
    <header className={css`
      position: fixed;
      top: 0;
      left: 0;
      padding: 10px 64px;
      background: rgba(255, 255, 255, 0.90);
      backdrop-filter: blur(16px);
      display: flex;
      gap: 64px;
      justify-content: space-between;
      align-items: center;
      width: 100%;
      z-index: 10;
      max-width: 100vw;

      @media(max-width: 1439px) {
        padding: 10px 32px;
      }
      @media(max-width: 1023px) {
        padding: 10px 24px;
      }
      @media(max-width: 767px) {
        padding: 10px 16px;
      }
      @media(max-width: 575px) {
        gap: 32px;
      }

      & > * {
        flex: 1;
      }
    `}>
        <NavLink to="/" className={css`@media(max-width: 575px) { svg {height: 48px; width: 108px;} }`}><Logo /></NavLink>
        {windowWidth > 1439 &&
        <nav className={css`
          display: flex;
          gap: 32px;
        `}>
            <NavLink to="/events" className={DoubleLink}>
              <span>Мероприятия</span><span>Мероприятия</span>
            </NavLink>
            <NavLink to="/org" className={DoubleLink}>
              <span>Организаторам</span><span>Организаторам</span>
            </NavLink>
            <NavLink to="/about" className={DoubleLink}>
              <span>О&nbsp;проекте</span><span>О&nbsp;проекте</span>
            </NavLink>
            <NavLink to="/faq" className={DoubleLink}>
              <span>FAQ</span><span>FAQ</span>
            </NavLink>
        </nav>
        }
        <div className={css`
          display: flex;
          gap: 32px;
          align-items: center;
          justify-content: flex-end;

          @media(max-width: 575px) {
            gap: 24px;
          }
        `}>
          {windowWidth > 575 && 
          <div className={css`
            position: relative;
            height: 48px;
            width: 48px;
            display: flex;
            align-items: center;
            justify-content: center;
          `}
          onClick={()=>{setSearchOpened(prev => !prev)}}
          >
            <div className={css`
              position: absolute;
              right: 0;
              top: 0;
              flex: 0 1 ${searchOpened ? '720px' : '48px'};
              max-width: ${searchOpened ? '720px' : '48px'};
              min-width: ${searchOpened ? '720px' : '48px'};
              height: 48px;
              border: 1px solid #EDEDEE;
              border-radius: ${searchOpened ? '28px' : '100%'};
              cursor: pointer;
              transition: ${theme.transition};
              background-color: #fff;
              padding: ${searchOpened ? '16px 48px 16px 16px' : '0'};
              display: flex;
              align-items: center;
              justify-content: center;
            `}>
              {searchOpened && <input type="text" placeholder="Поиск по мероприятиям" /> }
            </div>
            
            <div className={css`position: relative; cursor: pointer;height: 20px;`} onClick={()=>setSearchOpened(prev => !prev)}>
              <SearchIcon />
            </div>
            
          </div>
          }
          {windowWidth > 768 && 
            <NavLink to="/lk/add">
              <Button>Разместить событие</Button>
            </NavLink>
          }
          {isLogin ?
          <>
          <div className={css`cursor:pointer;`} ref={iconRef} onClick={toggleNotifications}>
            <NotificationIcon />
          </div>
          <NavLink to="/lk"> {windowWidth > 575 ? 'Александр Ром...' : <UserIcon />}</NavLink>
          </>
          :
          <div onClick={()=>setIsModalOpen(true)} className={css`display: flex;gap:5px;align-items:center;line-height:1.28;cursor:pointer;`}>
            <UserIcon />
            {windowWidth > 575 && <p>Войти</p> }
          </div>
          }
          {windowWidth < 1440 && 
          <div className={css`
            position: relative;
            display: flex;
            flex-direction: column;
            gap: 4px;
            width: 48px;
            height: 48px;
            align-items: center;
            justify-content: center;
            cursor: pointer;

            span {
              position: absolute;
              background-color: ${theme.colors.purple};
              height: 2px;
              width: 24px;
              transition: ${theme.transition};

              &:nth-of-type(1) {
                opacity: ${burger ? '0' : '1'};
                top: 18px;
              }
              &:nth-of-type(2) {
                top: 24px;
                transform: rotate(${burger ? '45deg' : '0deg'});
              }
              &:nth-of-type(3) {
                transform: rotate(${burger ? '-45deg' : '0deg'});
                top: 24px;
              }
              &:nth-of-type(4) {
                opacity: ${burger ? '0' : '1'};
                top: 30px;
              }
            }
          `}
          onClick={()=>setBurger(prev => !prev)}
          >
            <span></span>
            <span></span>
            <span></span>
            <span></span>
          </div>
          }
        </div>
      
      <AnimatePresence>
        {notifications && 
          <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }} 
          exit={{ opacity: 0, x: 50 }}
          transition={{ duration: .3 }}
          className={css`
            position: fixed;
            right: 0;
            height: calc(100vh - 90px);
            top: 90px;
            background-color: #fff;
            padding: 16px;
            width: 100%;
            max-width: 380px;
            z-index: 9;
            border-radius: 24px;
            border: 1px solid #F5F7FA;
            box-shadow: 0px 196px 55px 0px rgba(0, 0, 0, 0.00), 0px 125px 50px 0px rgba(0, 0, 0, 0.01), 0px 71px 42px 0px rgba(0, 0, 0, 0.02), 0px 31px 31px 0px rgba(0, 0, 0, 0.03), 0px 8px 17px 0px rgba(0, 0, 0, 0.04);
            text-align: center;
          `}
          ref={notificationsRef}
          >
            <div className={css`margin-bottom: center;font-size:18px;font-weight:500;line-height:1.36;`}>Уведомления</div>
            <NavLink to="/lk/notifications" className={css`position:absolute;top:16px;right:16px;`} onClick={()=>setNotifications(false)}>
              <SettingsIcon />
            </NavLink>
            <NotificationImg className={css`margin-bottom:8px;`} />
            <div className={css`margin-bottom:8px;font-weight:500;`}>Пока нет уведомлений для отображения</div>
            <div className={css`color: #6C6C71;font-size:14px;line-height:1.16;`}>Скоро вы увидите здесь полезную информацию. Оставайтесь с нами!</div>
          </motion.div>
        }
      </AnimatePresence>

      <Modal isOpen={isModalOpen} onClose={()=>setIsModalOpen(false)} />

      
    </header>

    <AnimatePresence>
    {burger && 
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }} 
        exit={{ opacity: 0 }}
        transition={{ duration: .3 }}
        className={css`
          position: fixed;
          top: 0;
          left: 0;
          background: rgba(255, 255, 255, 0.90);
          backdrop-filter: blur(16px);
          width: 100vw;
          height: 100vh;
          z-index: 2;
          padding-top: 90px;
        `}
      >
        <div className={css`
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 32px;
          padding: 24px 16px;
        `}>
            <NavLink to="/events" className={DoubleLink} onClick={()=>setBurger(false)}>
              <span>Мероприятия</span><span>Мероприятия</span>
            </NavLink>
            <NavLink to="/org" className={DoubleLink} onClick={()=>setBurger(false)}>
              <span>Организаторам</span><span>Организаторам</span>
            </NavLink>
            <NavLink to="/about" className={DoubleLink} onClick={()=>setBurger(false)}>
              <span>О&nbsp;проекте</span><span>О&nbsp;проекте</span>
            </NavLink>
            <NavLink to="/faq" className={DoubleLink} onClick={()=>setBurger(false)}>
              <span>FAQ</span><span>FAQ</span>
            </NavLink>
        </div>
      </motion.div>
    }
    </AnimatePresence>
    
    </>
  );
}