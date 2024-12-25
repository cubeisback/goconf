import { NavLink, useLocation } from "react-router";
import { ReactComponent as Logo } from '../../images/svg/logo.svg';
import { useEffect } from "react";
import { Button, DoubleLink } from "../../pages/ui";
import { css } from '@emotion/css';

export const Header = () => {
  const location = useLocation();
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

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
          <NavLink>
            <Button>Разместить событие</Button>
          </NavLink>
            <div>Войти</div>
        </div>
    </header>
    
  );
}