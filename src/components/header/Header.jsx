import { NavLink, useLocation } from "react-router";
import { ReactComponent as Logo } from '../../images/svg/logo.svg';
import styled from '@emotion/styled';
import styles from '../header/header.module.css';
import { useEffect } from "react";
// import { css } from '@emotion/css';
// import { useEffect } from "react";

const Button = styled.div`
    border-radius: 28px;
    background: ${props => props.theme.colors.purple};
    border: 2px solid ${props => props.theme.colors.purple};
    padding: 14px 32px;
    cursor: pointer;
    color: #fff;
    width: max-content;
    transition: .3s ease-in-out;
  
    &:hover {
        background: #FFF;
        color: ${props => props.theme.colors.purple};
    }
`;


export const Header = () => {

  const location = useLocation();
  
    useEffect(() => {
      window.scrollTo(0, 0);
    }, [location]);

  return (
    <header>
        <NavLink to="/"><Logo /></NavLink>
        <nav>
            <NavLink to="/events">1111</NavLink>
            <NavLink to="/events">Мероприятия</NavLink>
            <NavLink to="/org">Организаторам</NavLink>
            <NavLink to="/about">О&nbsp;проекте</NavLink>
            <NavLink to="/faq">FAQ</NavLink>
        </nav>
        <div className={styles.header_right}>
            <Button>Разместить событие</Button>
            <div>Войти</div>
        </div>

        {/* <div
    className={css`
      padding: 32px;
      background-color: hotpink;
      font-size: 24px;
      border-radius: 4px;
      &:hover {
        color: #fff;
      }
    `}
  >
    Hover to change color.
  </div> */}
    </header>
    
  );
}