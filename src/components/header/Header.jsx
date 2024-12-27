import { NavLink, useLocation } from "react-router";
import { ReactComponent as Logo } from '../../images/svg/logo.svg';
import { ReactComponent as UserIcon } from '../../images/svg/user.svg';
import { ReactComponent as NotificationIcon } from '../../images/svg/notification.svg';
import { ReactComponent as NotificationImg } from '../../images/svg/notification_img.svg';
import { ReactComponent as SettingsIcon } from '../../images/svg/settings.svg';
import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from 'framer-motion';
import { Button, DoubleLink } from "../../pages/ui";
import { css } from '@emotion/css';
import { Modal } from "../ui/Modal";

export const Header = ({isLogin}) => {
  const location = useLocation();

  const [notifications, setNotifications] = useState(false);
  const notificationsRef = useRef(null);
  const iconRef = useRef(null);
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

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

  return (
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

      & > * {
        flex: 1;
      }
    `}>
        <NavLink to="/"><Logo /></NavLink>
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
        <div className={css`
          display: flex;
          gap: 32px;
          align-items: center;
          justify-content: flex-end;
        `}>
          <NavLink to="/lk/add">
            <Button>Разместить событие</Button>
          </NavLink>
          {isLogin ?
          <>
          <div className={css`cursor:pointer;`} ref={iconRef} onClick={toggleNotifications}>
            <NotificationIcon />
          </div>
          <NavLink to="/lk">Александр Ром...</NavLink>
          </>
          :
          <div onClick={openModal} className={css`display: flex;gap:5px;align-items:center;line-height:1.28;cursor:pointer;`}>
            <UserIcon />
            <p>Войти</p>
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

      <Modal isOpen={isModalOpen} onClose={closeModal} />
    </header>
    
  );
}